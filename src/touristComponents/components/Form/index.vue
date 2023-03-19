<template>
  <div id="Form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="评价内容" prop="desc">
        <el-input type="textarea" v-model="ruleForm.commentContent"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-rate v-model="ruleForm.sightScore" :colors="colors"> </el-rate>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Rating from "../Rating";
import UploadPicture from "../UploadPicture";
import { submitComment } from "@/api/system/comment.js";
export default {
  name: "Form",
  data() {
    return {
      ruleForm: {
        sightScore: null,
        commentContent: "",
        id: this.$route.query.id,
        commentSource: "0",
        parentId: -1,
        objectId: "",
      },
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      rules: {
        commentContent: [
          { required: true, message: "请填写评价内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submitComment(this.ruleForm).then((response) => {
            this.$modal.msgSuccess(response.msg);
          });
          this.resetForm("ruleForm");
          this.$emit("close");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.ruleForm = {
        sightScore: null,
        commentContent: "",
        id: this.$route.query.id,
        commentSource: "0",
        parentId: -1,
        objectId: "",
      };
    },
  },
  mounted() {
    // console.log(this.$route.query.id);
  },
  components: { Rating, UploadPicture },
};
</script>

<style>
</style>
