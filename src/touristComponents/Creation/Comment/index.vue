<template>
  <div id="comment">
    <h3>评论管理</h3>
    <el-tabs v-model="active">
      <el-tab-pane label="已通过" name="first">
        <CommentList :type="0"></CommentList>
        <!-- <el-table
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
              <el-popover trigger="hover" placement="top" class="popover">
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
          <el-table-column
            label="内容"
            width="250"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.commentContent }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="来源"
            :show-overflow-tooltip="true"
            width="250"
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
        </el-table> -->
      </el-tab-pane>
      <el-tab-pane label="待审核" name="second"
        ><CommentList :type="1"></CommentList
      ></el-tab-pane>
      <el-tab-pane label="已驳回" name="third"
        ><CommentList :type="2"></CommentList
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommentList from "./CommentList.vue";
import { getUserAllComment } from "@/api/system/comment.js";
import { deleteComment } from "@/api/system/comment.js";
export default {
  dicts: ["commend_source"],
  data() {
    return {
      active: "first",
      passedList: [],
      multipleSelection: [],
      result: [],
    };
  },
  methods: {
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   deleteComment([row.commentId]).then((response) => {
    //     if (response.code == 200) {
    //       this.$message({
    //         message: "删除成功^8^",
    //         type: "success",
    //       });
    //       this.getAll();
    //       this.result = [];
    //     } else {
    //       this.$message.err("删除失败>...<");
    //       this.getAll();
    //       this.result = [];
    //     }
    //   });
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // deleteSelecction() {
    //   this.$alert("删除所选中！");
    //   console.log(this.multipleSelection);
    //   this.multipleSelection.forEach((item, index) => {
    //     let obj = item;
    //     this.result.push(obj.commentId);
    //     console.log(this.result);
    //   });
    //   deleteComment(this.result).then((response) => {
    //     if (response.code == 200) {
    //       this.$message({
    //         message: "删除成功^8^",
    //         type: "success",
    //       });
    //       this.getAll();
    //       this.result = [];
    //     } else {
    //       this.$message.err("删除失败>...<");
    //       this.getAll();
    //       this.result = [];
    //     }
    //   });
    // },
    // getAll() {
    //   getUserAllComment(0).then((response) => {
    //     this.passedList = response.rows;
    //     console.log(response);
    //   });
    // },
  },
  mounted() {
    // this.getAll();
  },
  components: { CommentList },
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
    ::v-deep .img {
      width: 50px;
      height: 50px;
      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
