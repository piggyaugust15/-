<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="专栏名称" prop="albumName">
        <el-input
          v-model="queryParams.albumName"
          placeholder="请输入专栏名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专栏主题" prop="albumTitle">
        <el-input
          v-model="queryParams.albumTitle"
          placeholder="请输入专栏主题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专栏口号" prop="albumSlogan">
        <el-input
          v-model="queryParams.albumSlogan"
          placeholder="请输入专栏口号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否禁用" prop="ifBan">
        <el-select v-model="queryParams.ifBan" placeholder="请选择是否禁用" clearable size="small">
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
          v-hasPermi="['system:album:add']"
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
          v-hasPermi="['system:album:edit']"
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
          v-hasPermi="['system:album:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:album:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="albumList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="专栏id" align="center" prop="albumId" />
      <el-table-column label="专栏名称" align="center" prop="albumName" />

      <el-table-column label="专栏图片" align="center" prop="albumImage" >
        <template slot-scope="scope">
          <ImagePreview :src="scope.row.albumImage" :width="50" :height="50" />
        </template>
      </el-table-column>

      <el-table-column label="专栏主题" align="center" prop="albumTitle" />
      <el-table-column label="专栏口号" align="center" prop="albumSlogan" />
      <el-table-column label="专辑介绍" align="center" prop="albumIntroduce" :show-overflow-tooltip="true" />
      <el-table-column label="是否禁用" align="center" prop="ifBan">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.ifBan"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:album:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:album:remove']"
          >删除</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAddCul(scope.row)"
              v-hasPermi="['system:album:remove']"
          >添加文创</el-button>
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

    <!-- 添加或修改文创专栏对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body1>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="专栏名称" prop="albumName">
          <el-input v-model="form.albumName" placeholder="请输入专栏名称" />
        </el-form-item>
        <el-form-item label="专栏图片">
          <imageUpload v-model="form.albumImage"/>
        </el-form-item>
        <el-form-item label="专栏主题" prop="albumTitle">
          <el-input v-model="form.albumTitle" placeholder="请输入专栏主题" />
        </el-form-item>
        <el-form-item label="专栏口号" prop="albumSlogan">
          <el-input v-model="form.albumSlogan" placeholder="请输入专栏口号" />
        </el-form-item>
        <el-form-item label="专辑介绍" prop="albumIntroduce">
          <el-input v-model="form.albumIntroduce" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-radio-group v-model="form.ifBan">
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

    <!--  添加文创到专辑  -->
    <el-dialog
        title="专辑内文创"
        :visible.sync="openList"
        width="1000"
        append-to-body
    >
      <el-form
          :model="queryParamsCul"
          ref="queryCul"
          :inline="true"
          label-width="100px"
      >
        <el-form-item label="文创名称" prop="culCreativityTitle">
          <el-input
              v-model="queryParamsCul.culCreativityTitle"
              placeholder="请输入文创名称"
              clearable
              size="small"
              @keyup.enter.native="handleQueryCul"
          />
        </el-form-item>
        <el-form-item label="文创标签" prop="culCreativityTags">
          <el-input
              v-model="queryParamsCul.culCreativityTags"
              placeholder="请输入文创标签"
              clearable
              size="small"
              @keyup.enter.native="handleQueryCul"
          />
        </el-form-item>
        <el-form-item label="文创类别" prop="culCreativityType">
          <el-select v-model="queryParamsCul.culCreativityType"
                     placeholder="请输入文创类别"
                     clearable
                     size="small">
            <el-option
              v-for="dict in dict.type.cul_creativity_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>

        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQueryCul"
          >搜索</el-button
          >
          <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQueryCul"
          >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table v-loading="loadingCul" border stripe :data="culList">
        <el-table-column
            label="文创ID"
            align="center"
            width="55"
            prop="culCreativityId"
        />
        <el-table-column label="文创名称" align="center" prop="culCreativityTitle" />
        <el-table-column label="文创标签" align="center" prop="culCreativityTags" />
        <el-table-column
            label="文创类别"
            align="center"
            prop="culCreativityType"
            :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <dict-tag
                :options="dict.type.cul_creativity_type"
                :value="scope.row.culCreativityType"
            />
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">

            <el-button
                size="mini"
                type="text"
                circle
                @click="handleChoice(scope.row)"
                v-hasPermi="['system:album:add']"
            ><span v-if="scope.row.ifChoice===false">
              <i class="el-icon-close"></i>
              未加入</span>
            <span v-if="scope.row.ifChoice===true">
              <i class="el-icon-check"></i>
              已加入</span>
            </el-button>



          </template>
        </el-table-column>
      </el-table>
      <pagination
          v-show="totalCul > 0"
          :total="totalCul"
          :page.sync="queryParamsCul.pageNum"
          :limit.sync="queryParamsCul.pageSize"
          @pagination="getAlbumCulList(albumId,queryParamsCul)"
      />
    </el-dialog>
  </div>
</template>

<script>
import {listAlbum, getAlbum, delAlbum, addAlbum, updateAlbum, getAlbumCulList,albumAddCul} from "@/api/album/album";

export default {
  name: "Album",
  dicts: ['sys_yes_no',"cul_creativity_type"],
  data() {
    return {
      culList:[],
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
      // 文创专栏表格数据
      albumList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //文创列表显示
      openList:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        albumName: null,
        albumTitle: null,
        albumSlogan: null,
        albumIntroduce: null,
        ifBan: null,
      },
      queryParamsCul: {
        pageNum: 1,
        pageSize: 10,
        culCreativityTitle: null,
        culCreativityIntro: null,
        culCreativityCategory: null,
        culCreativityType: null,
        culCreativityTags: null,
      },
      loadingCul:false,
      totalCul:0,

      albumId:null,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        albumName: [
          { required: true, message: "专栏名称不能为空", trigger: "blur" }
        ],      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询文创专栏列表 */
    getList() {
      this.loading = true;
      listAlbum(this.queryParams).then(response => {
        this.albumList = response.rows;
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
        albumId: null,        albumName: null,        albumImage: null,        albumTitle: null,        albumSlogan: null,        albumIntroduce: null,        ifBan: "0",        createTime: null,        createBy: null,        updateTime: null,        updateBy: null,        remark: null      };
      this.resetForm("form");
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleQueryCul(){
      this.queryParamsCul.pageNum=1;
      this.getAlbumCulList(this.albumId,this.queryParamsCul);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    resetQueryCul(){
      this.resetForm("queryCul")
      this.handleQueryCul();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.albumId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加文创专栏";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const albumId = row.albumId || this.ids
      getAlbum(albumId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改文创专栏";
      });
    },
    handleAddCul(row){
      this.openList=true;
      // console.log(row)
      this.albumId=row.albumId
      console.log(this.albumId,'albumId')
      this.getAlbumCulList(row.albumId,this.queryParamsCul)
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.albumId != null) {
            updateAlbum(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAlbum(this.form).then(response => {
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
      const albumIds = row.albumId || this.ids;
      this.$modal.confirm('是否确认删除文创专栏编号为"' + albumIds + '"的数据项？').then(function() {
        return delAlbum(albumIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/album/export', {
        ...this.queryParams
      }, `album_${new Date().getTime()}.xlsx`)
    },
    /** 分页获取文创列表*/
    getAlbumCulList(id,query){
      getAlbumCulList(id,query).then(res=>{
        console.log('内部分页')
        this.culList=res.rows;
        this.totalCul=res.total
      })
    },
    handleChoice(row){
      albumAddCul(this.albumId,row.culCreativityId).then(res=>{
        console.log(res);
        this.$modal.msgSuccess(res.msg);
        this.handleQueryCul();
      })
    }
  }
};
</script>
