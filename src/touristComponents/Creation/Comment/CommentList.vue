<template>
  <div v-loading="loading">
    <el-table
      :data="passedList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" class="popover" >
            <p>用户: {{ scope.row.user.nickName }}</p>
            <div class="img">
              <img
                class="avatar"
                :src="$store.state.front.url + scope.row.user.avatar"
                alt=""
              />
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                ><span v-if="scope.row.fatherName == null">
                  {{ scope.row.user.nickName }}
                </span>
                <p v-else>{{ scope.row.fatherName }}</p></el-tag
              >
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="250" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p>{{ scope.row.commentContent }}</p>
        </template>
      </el-table-column>
      <el-table-column label="来源" :show-overflow-tooltip="true" width="250"
        ><template slot-scope="scope">
          <dict-tag
            :options="dict.type.commend_source"
            :value="scope.row.commentSource"
          ></dict-tag>
        </template>
      </el-table-column>
      <el-table-column label="执行操作" align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button
        :disabled="multipleSelection.length == 0"
        @click="toggleSelection()"
        >取消选择</el-button
      >
      <el-button
        :disabled="multipleSelection.length == 0"
        @click="deleteSelecction()"
        >一键删除</el-button
      >
    </div>
    <div style="padding-bottom: 20px">
      <Pagination
          :total="pagination.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          :auto-scroll="false"
          @pagination="getAll"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { getUserAllComment } from "@/api/system/comment.js";
import { deleteComment } from "@/api/system/comment.js";
export default {
  dicts: ["commend_source"],
  data() {
    return {
      loading: true,
      active: "first",
      passedList: [],
      multipleSelection: [],
      result: [],
      pagination:{
        total:0,
      },
      queryParams:{
        pageNum:1,
        pageSize:10,
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      deleteComment([row.commentId]).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: "删除成功^8^",
            type: "success",
          });
          this.getAll();
          this.result = [];
        } else {
          this.$message.err("删除失败>...<");
          this.getAll();
          this.result = [];
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    deleteSelecction() {
      this.$alert("删除所选中！");
      console.log(this.multipleSelection);
      this.multipleSelection.forEach((item, index) => {
        let obj = item;
        this.result.push(obj.commentId);
        console.log(this.result);
      });
      deleteComment(this.result).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: "删除成功^8^",
            type: "success",
          });
          this.getAll();
          this.result = [];
        } else {
          this.$message.err("删除失败>...<");
          this.getAll();
          this.result = [];
        }
      });
    },
    getAll() {
      this.loading = true;
      getUserAllComment(this.type,this.queryParams).then((response) => {
        this.passedList = response.rows;
        console.log(response);
        this.pagination.total=response.total;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getAll();
  },
  props: ["type"],
};
</script>

<style lang="scss" scoped>
$backcolor: #ffffff;
$bluecolor: #00aeec;
#comment {
  background-color: $backcolor;
  padding: 20px 40px 20px 40px;
  h3 {
    color: $bluecolor;
  }
  el-popover {
    width: 50px;
    height: 50px;
    .img {
      width: 50px;
      height: 50px;
      img{

      }
      .avatar {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
}
</style>