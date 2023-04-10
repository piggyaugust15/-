<template>
  <div id="aform">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="ruleForm.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="articleContent">
        <mavon-editor v-model="ruleForm.articleContent"></mavon-editor>
      </el-form-item>
      <el-form-item label="文章封面" prop="articleCover">
        <imageUpload v-model="ruleForm.articleCover" />
      </el-form-item>

      <el-form-item label="文章状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio
            v-for="dict in dict.type.article_state"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文章分类" prop="articleCategory">
        <el-radio-group v-model="ruleForm.articleCategory">
          <el-radio
            v-for="dict in dict.type.article_category"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章类型" prop="articleType">
        <el-radio-group v-model="ruleForm.articleType">
          <el-radio
            v-for="dict in dict.type.article_type"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  createArticle,
  getEditArticleDetail,
  editArticle,
} from "@/api/article/article.js";
export default {
  dicts: ["article_state", "article_category", "article_type"],
  data() {
    return {
      ruleForm: {
        articleTitle: "",
        articleContent: "",
        articleCover: "",
        status: "",
        articleCategory: "",
        articleType: "",
      },
      rules: {
        articleTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        articleType: [
          { required: true, message: "请选择文章类型", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择文章状态", trigger: "change" },
        ],
        articleCategory: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
        articleContent: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
          {
            min: 1,
            message: "请输入文章内容",
            trigger: "blur",
          },
          ,
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          if (this.$route.query.type == "edit") {
            editArticle(this.ruleForm).then((response) => {
              if (response.code == 200) {
                this.$message({
                  message: response.msg,
                  type: "success",
                });
                this.myresetForm();
                this.$router.push("/frontHome/Creation/index");
              } else {
                this.$message.err("提交失败，再试一试吧>...<");
              }
            });
          } else {
            createArticle(this.ruleForm).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.myresetForm();
                this.$router.push("/frontHome/Creation/index");
              } else {
                this.$message.err("提交失败，再试一试吧>...<");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    myresetForm() {
      this.ruleForm = {
        articleTitle: "",
        articleContent: "",
        articleCover: "",
        status: "",
        articleCategory: "",
        articleType: "",
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    if (this.$route.query.type === "edit"&&this.$route.query.arg ==="article") {
      getEditArticleDetail(this.$route.query.id).then((response) => {
        this.ruleForm = response.data;
        console.log(response);
      });
    }
  },
};
</script>

<style>
</style>