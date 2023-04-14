<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="景点id" prop="sightsId">
        <el-input
          v-model="queryParams.sightsId"
          placeholder="请输入景点id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-select v-model="queryParams.source" placeholder="请选择来源" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_activity_source"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动标题" prop="activityTitle">
        <el-input
          v-model="queryParams.activityTitle"
          placeholder="请输入活动标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布者" prop="activityPublisher">
        <el-input
          v-model="queryParams.activityPublisher"
          placeholder="请输入发布者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.beginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择活动开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="overTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.overTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择活动结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:activity:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:activity:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:activity:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:activity:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="活动id" align="center" prop="activityId" />
      <el-table-column label="来源" align="center" prop="source">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_activity_source" :value="scope.row.source"/>
        </template>
      </el-table-column>
      <el-table-column label="活动标题" align="center" prop="activityTitle" />
      <el-table-column label="活动介绍" align="center" prop="activityIntroduction" :show-overflow-tooltip="true"/>
      <el-table-column label="活动内容" align="center" prop="activityContent" :show-overflow-tooltip="true"/>
      <el-table-column label="附加文件" align="center" prop="activityMultiparts" />
      <el-table-column label="活动图片" align="center" prop="activityImage" />
      <el-table-column label="活动热度" align="center" prop="activityHot" />
      <el-table-column label="发布者" align="center" prop="activityPublisher" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:activity:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:activity:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改活动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="景点id" prop="sightsId">
          <el-input v-model="form.sightsId" placeholder="请输入景点id" />
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="form.source" placeholder="请选择来源">
            <el-option
              v-for="dict in dict.type.sys_activity_source"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动标题" prop="activityTitle">
          <el-input v-model="form.activityTitle" placeholder="请输入活动标题" />
        </el-form-item>
        <el-form-item label="活动介绍" prop="activityIntroduction">
          <el-input v-model="form.activityIntroduction" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="活动内容">
          <editor v-model="form.activityContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="附加文件">
          <fileUpload v-model="form.activityMultiparts"/>
        </el-form-item>
        <el-form-item label="活动图片">
          <imageUpload v-model="form.activityImage"/>
        </el-form-item>
        <el-form-item label="活动(热度)" prop="activityHot">
          <el-input v-model="form.activityHot" placeholder="请输入活动(热度)" />
        </el-form-item>
        <el-form-item label="活动奖励" prop="activityReward">
          <el-input v-model="form.activityReward" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发布者" prop="activityPublisher">
          <el-input v-model="form.activityPublisher" placeholder="请输入发布者" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="beginTime">
          <el-date-picker clearable size="small"
            v-model="form.beginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择活动开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="overTime">
          <el-date-picker clearable size="small"
            v-model="form.overTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择活动结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listActivity, getActivity, delActivity, addActivity, updateActivity } from "@/api/activity/activity";

export default {
  name: "Activity",
  dicts: ['sys_activity_source'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 活动表格数据
      activityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sightsId: null,        userId: null,        source: null,        activityTitle: null,        activityPublisher: null,        beginTime: null,        overTime: null,      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        activityTitle: [
          { required: true, message: "活动标题不能为空", trigger: "blur" }
        ],        activityIntroduction: [
          { required: true, message: "活动介绍不能为空", trigger: "blur" }
        ],        activityContent: [
          { required: true, message: "活动内容不能为空", trigger: "blur" }
        ],      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询活动列表 */
    getList() {
      this.loading = true;
      listActivity(this.queryParams).then(response => {
        this.activityList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        activityId: null,        sightsId: null,        userId: null,        source: null,        activityTitle: null,        activityIntroduction: null,        activityContent: null,        activityMultiparts: null,        activityImage: null,        activityHot: null,        activityReward: null,        activityPublisher: null,        beginTime: null,        overTime: null,        createTime: null,        createBy: null,        updateTime: null,        updateBy: null,        remark: null      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.activityId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加活动";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const activityId = row.activityId || this.ids
      getActivity(activityId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改活动";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.activityId != null) {
            updateActivity(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivity(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const activityIds = row.activityId || this.ids;
      this.$modal.confirm('是否确认删除活动编号为"' + activityIds + '"的数据项？').then(function() {
        return delActivity(activityIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/activity/export', {
        ...this.queryParams
      }, `activity_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
