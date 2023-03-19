<template>
  <div id="Comment">
    <div class="top_box">
      <!-- <div class="btn">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="dialogVisible = true"
          >写评价</el-button
        >
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <Form @close="close"></Form>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import CommentDiv from "@/touristComponents/components/CommentDiv";
import CommentList from "@/touristComponents/components/CommentList";
export default {
  name: "Comment",
  data() {
    return {};
  },
  methods: {},

  components: { CommentList, CommentDiv },
};
</script>

<style lang="scss" scoped>
$bluecolor: #00aeec;
#Comment {
  margin-top: 40px;
  padding-right: 30px;
}
#Comment .top_box {
  margin-bottom: 10px;
}
#Comment .top_box h1,
#Comment .top_box .btn {
  display: inline-block;
}

#Comment .top_box .btn {
  float: right;
}
</style>
