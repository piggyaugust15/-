<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="页面" prop="voicePage">
        <el-select v-model="queryParams.voicePage" placeholder="请选择页面" clearable size="small">
          <el-option
            v-for="dict in dict.type.typeset_page_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="页面定位" prop="voicePosition">
        <el-select v-model="queryParams.voicePosition" placeholder="请选择页面定位" clearable size="small">
          <el-option
            v-for="dict in dict.type.typeset_position_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容介绍" prop="voiceIntroduction">
        <el-input
          v-model="queryParams.voiceIntroduction"
          placeholder="请输入内容介绍"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="音高" prop="voiceVolume">
        <el-input
          v-model="queryParams.voiceVolume"
          placeholder="请输入音高"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="语言" prop="voiceLanguange">
        <el-input
          v-model="queryParams.voiceLanguange"
          placeholder="请输入语言"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="费率" prop="voiceRate">
        <el-input
          v-model="queryParams.voiceRate"
          placeholder="请输入费率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="音高" prop="voicePitch">
        <el-input
          v-model="queryParams.voicePitch"
          placeholder="请输入音高"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否开启" prop="flag">
        <el-select v-model="queryParams.flag" placeholder="请选择是否开启" clearable size="small">
          <el-option
            v-for="dict in dict.type.sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['system:voice:add']"
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
          v-hasPermi="['system:voice:edit']"
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
          v-hasPermi="['system:voice:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:voice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="voiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="播报id" align="center" prop="voiceId" />
      <el-table-column label="页面" align="center" prop="voicePage">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.typeset_page_type" :value="scope.row.voicePage"/>
        </template>
      </el-table-column>
      <el-table-column label="页面定位" align="center" prop="voicePosition">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.typeset_position_type" :value="scope.row.voicePosition"/>
        </template>
      </el-table-column>
      <el-table-column label="内容介绍" align="center" prop="voiceIntroduction" />
      <el-table-column label="播报内容" align="center" prop="voiceContent" />
      <el-table-column label="音高" align="center" prop="voiceVolume" />
      <el-table-column label="语言" align="center" prop="voiceLanguange" />
      <el-table-column label="费率" align="center" prop="voiceRate" />
      <el-table-column label="音高" align="center" prop="voicePitch" />
      <el-table-column label="是否开启" align="center" prop="flag">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.flag"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:voice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:voice:remove']"
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

    <!-- 添加或修改动态播报对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="页面" prop="voicePage">
          <el-select v-model="form.voicePage" placeholder="请选择页面">
            <el-option
              v-for="dict in dict.type.typeset_page_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面定位" prop="voicePosition">
          <el-select v-model="form.voicePosition" placeholder="请选择页面定位">
            <el-option
              v-for="dict in dict.type.typeset_position_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容介绍" prop="voiceIntroduction">
          <el-input v-model="form.voiceIntroduction" placeholder="请输入内容介绍" />
        </el-form-item>
        <el-form-item label="播报内容" prop="voiceContent">
          <el-input v-model="form.voiceContent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="音高" prop="voiceVolume">
          <el-input v-model="form.voiceVolume" placeholder="请输入音高" />
        </el-form-item>
        <el-form-item label="语言" prop="voiceLanguange">
          <el-input v-model="form.voiceLanguange" placeholder="请输入语言" />
        </el-form-item>
        <el-form-item label="费率" prop="voiceRate">
          <el-input v-model="form.voiceRate" placeholder="请输入费率" />
        </el-form-item>
        <el-form-item label="音高" prop="voicePitch">
          <el-input v-model="form.voicePitch" placeholder="请输入音高" />
        </el-form-item>
        <el-form-item label="是否开启">
          <el-radio-group v-model="form.flag">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listVoice, getVoice, delVoice, addVoice, updateVoice } from "@/api/system/voice";

export default {
  name: "Voice",
  dicts: ['sys_yes_no', 'typeset_page_type', 'typeset_position_type'],
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
      // 动态播报表格数据
      voiceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        voicePage: null,        voicePosition: null,        voiceIntroduction: null,        voiceContent: null,        voiceVolume: null,        voiceLanguange: null,        voiceRate: null,        voicePitch: null,        flag: null,      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询动态播报列表 */
    getList() {
      this.loading = true;
      listVoice(this.queryParams).then(response => {
        this.voiceList = response.rows;
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
        voiceId: null,        voicePage: null,        voicePosition: null,        voiceIntroduction: null,        voiceContent: null,        voiceVolume: null,        voiceLanguange: null,        voiceRate: null,        voicePitch: null,        flag: "0",        updateBy: null,        updateTime: null,        createBy: null,        createTime: null,        remark: null      };
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
      this.ids = selection.map(item => item.voiceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加动态播报";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const voiceId = row.voiceId || this.ids
      getVoice(voiceId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改动态播报";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.voiceId != null) {
            updateVoice(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVoice(this.form).then(response => {
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
      const voiceIds = row.voiceId || this.ids;
      this.$modal.confirm('是否确认删除动态播报编号为"' + voiceIds + '"的数据项？').then(function() {
        return delVoice(voiceIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/voice/export', {
        ...this.queryParams
      }, `voice_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
