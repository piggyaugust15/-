<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="城市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入城市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地区" prop="district">
        <el-input
          v-model="queryParams.district"
          placeholder="请输入地区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主区" prop="exclude">
        <el-input
          v-model="queryParams.exclude"
          placeholder="请输入主区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:territor:add']"
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
          v-hasPermi="['system:territor:edit']"
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
          v-hasPermi="['system:territor:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:territor:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="territorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="区域id" align="center" prop="territorId" />
      <el-table-column label="区域编码" align="center" prop="areacode" />
      <el-table-column label="独立编码" align="center" prop="districtcode" />
      <el-table-column label="城市地理编码" align="center" prop="cityGeocode" />
      <el-table-column label="城市" align="center" prop="city" />
      <el-table-column label="独立地理编码" align="center" prop="districtGeocode" />
      <el-table-column label="地区" align="center" prop="district" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="原区域编码" align="center" prop="originAreacode" />
      <el-table-column label="主区" align="center" prop="exclude" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:territor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:territor:remove']"
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

    <!-- 添加或修改国内数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域编码" prop="areacode">
          <el-input v-model="form.areacode" placeholder="请输入区域编码" />
        </el-form-item>
        <el-form-item label="独立编码" prop="districtcode">
          <el-input v-model="form.districtcode" placeholder="请输入独立编码" />
        </el-form-item>
        <el-form-item label="城市地理编码" prop="cityGeocode">
          <el-input v-model="form.cityGeocode" placeholder="请输入城市地理编码" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="独立地理编码" prop="districtGeocode">
          <el-input v-model="form.districtGeocode" placeholder="请输入独立地理编码" />
        </el-form-item>
        <el-form-item label="地区" prop="district">
          <el-input v-model="form.district" placeholder="请输入地区" />
        </el-form-item>
        <el-form-item label="经度" prop="lon">
          <el-input v-model="form.lon" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="sta_fc" prop="staFc">
          <el-input v-model="form.staFc" placeholder="请输入sta_fc" />
        </el-form-item>
        <el-form-item label="sta_rt" prop="staRt">
          <el-input v-model="form.staRt" placeholder="请输入sta_rt" />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="fc_lon" prop="fcLon">
          <el-input v-model="form.fcLon" placeholder="请输入fc_lon" />
        </el-form-item>
        <el-form-item label="fc_lat" prop="fcLat">
          <el-input v-model="form.fcLat" placeholder="请输入fc_lat" />
        </el-form-item>
        <el-form-item label="rt_lon" prop="rtLon">
          <el-input v-model="form.rtLon" placeholder="请输入rt_lon" />
        </el-form-item>
        <el-form-item label="rt_lat" prop="rtLat">
          <el-input v-model="form.rtLat" placeholder="请输入rt_lat" />
        </el-form-item>
        <el-form-item label="原区域编码" prop="originAreacode">
          <el-input v-model="form.originAreacode" placeholder="请输入原区域编码" />
        </el-form-item>
        <el-form-item label="主区" prop="exclude">
          <el-input v-model="form.exclude" placeholder="请输入主区" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listTerritor, getTerritor, delTerritor, addTerritor, updateTerritor } from "@/api/territor/territor";

export default {
  name: "Territor",
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
      // 国内数据表格数据
      territorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        city: null,        district: null,        province: null,        exclude: null,      },
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
    /** 查询国内数据列表 */
    getList() {
      this.loading = true;
      listTerritor(this.queryParams).then(response => {
        this.territorList = response.rows;
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
        territorId: null,        areacode: null,        districtcode: null,        cityGeocode: null,        city: null,        districtGeocode: null,        district: null,        lon: null,        lat: null,        staFc: null,        staRt: null,        province: null,        fcLon: null,        fcLat: null,        rtLon: null,        rtLat: null,        originAreacode: null,        exclude: null,        remark: null      };
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
      this.ids = selection.map(item => item.territorId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加国内数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const territorId = row.territorId || this.ids
      getTerritor(territorId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改国内数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.territorId != null) {
            updateTerritor(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTerritor(this.form).then(response => {
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
      const territorIds = row.territorId || this.ids;
      this.$modal.confirm('是否确认删除国内数据编号为"' + territorIds + '"的数据项？').then(function() {
        return delTerritor(territorIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/territor/export', {
        ...this.queryParams
      }, `territor_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
