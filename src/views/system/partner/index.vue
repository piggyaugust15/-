<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="开始时间" prop="cooperationBegin">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.cooperationBegin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="cooperationEnd">
        <el-date-picker
          clearable
          size="small"
          v-model="queryParams.cooperationEnd"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
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
          v-hasPermi="['system:partner:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:partner:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:partner:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:partner:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <button @click="xxx()" />
    <el-table
      stripe
      border
      v-loading="loading"
      :data="partnerList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="合作伙伴id"
        width="60"
        align="center"
        prop="partnerId"
      />
      <el-table-column
        label="伙伴介绍"
        width="60"
        align="center"
        prop="partnerIntro"
      />

      <el-table-column label="logo" align="center" prop="pertnerLogo">
        <template slot-scope="scope">
          <ImagePreview :src="scope.row.pertnerLogo" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column
        label="合作核心事项"
        align="center"
        :show-overflow-tooltip="true"
        prop="cooperationCore"
      />
      <el-table-column
        label="合作开始时间"
        align="center"
        prop="cooperationBegin"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.cooperationBegin, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合作结束时间"
        align="center"
        prop="cooperationEnd"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cooperationEnd, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合作文档"
        align="center"
        :show-overflow-tooltip="true"
        prop="cooperationDocument"
      />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:partner:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:partner:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改合作伙伴对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1000px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="伙伴介绍" prop="partnerIntro">
          <el-input
            v-model="form.partnerIntro"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>

        <el-form-item label="合作核心事项" prop="cooperationCore">
          <el-input
            v-model="form.cooperationCore"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="伙伴路由" prop="partnerRoute">
          <el-input
            v-model="form.partnerRoute"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="合作开始时间" prop="cooperationBegin">
          <el-date-picker
            clearable
            size="small"
            v-model="form.cooperationBegin"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合作开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合作结束时间" prop="cooperationEnd">
          <el-date-picker
            clearable
            size="small"
            v-model="form.cooperationEnd"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合作结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合作文档" prop="cooperationDocument">
          <FileUpload v-model="form.cooperationDocument" />
        </el-form-item>
        <el-form-item label="伙伴logo">
          <imageUpload v-model="form.partnerLogo" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
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
import {
  listPartner,
  getPartner,
  delPartner,
  addPartner,
  updatePartner,
} from "@/api/system/partner";

export default {
  name: "Partner",
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
      // 合作伙伴表格数据
      partnerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cooperationCore: null,
        cooperationBegin: null,
        cooperationEnd: null,
        cooperationDocument: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        partnerIntro: [
          { required: true, message: "伙伴介绍不能为空", trigger: "blur" },
        ],
        pertnerLogo: [
          { required: true, message: "伙伴logo不能为空", trigger: "blur" },
        ],
        // cooperationBegin: [
        //   { required: false, message: "合作开始时间不能为空", trigger: "blur" },
        // ],
        // cooperationEnd: [
        //   { required: false, message: "合作结束时间不能为空", trigger: "blur" },
        // ],
        // cooperationDocument: [
        //   { required: false, message: "合作文档不能为空", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    xxx() {
      //下载功能
      this.$download.saveAs(
        process.env.VUE_APP_BASE_API +
          "/profile/upload/2023/03/09/61c82bf5-0c5e-4565-b50a-c9c1e7d73906.pdf",
        "xxx.pdf"
      );
    },
    /** 查询合作伙伴列表 */
    getList() {
      this.loading = true;
      listPartner(this.queryParams).then((response) => {
        this.partnerList = response.rows;
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
        partnerRoute: null,
        partnerId: null,
        partnerIntro: null,
        partnerLogo: null,
        cooperationCore: null,
        cooperationBegin: null,
        cooperationEnd: null,
        cooperationDocument: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
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
      this.ids = selection.map((item) => item.partnerId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合作伙伴";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const partnerId = row.partnerId || this.ids;
      getPartner(partnerId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合作伙伴";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.partnerId != null) {
            updatePartner(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPartner(this.form).then((response) => {
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
      const partnerIds = row.partnerId || this.ids;
      this.$modal
        .confirm('是否确认删除合作伙伴编号为"' + partnerIds + '"的数据项？')
        .then(function () {
          return delPartner(partnerIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/partner/export",
        {
          ...this.queryParams,
        },
        `partner_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
