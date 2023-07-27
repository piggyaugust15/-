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
      <el-form-item label="文章标签" prop="articleTag">
        <el-tag
            :key="tag"
            v-for="tag in ruleForm.articleTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-popover
            placement="right"
            width="400"
            trigger="click">
          <div class="input">
            <el-input
                placeholder="请输入文字，Enter键入可添加自定义标签"
                v-model="input"
                @keyup.enter.native="handleInputConfirm"
                clearable
            >
            </el-input>
            <div class="tagBox" v-loading="tagsLoading">
              <span class="item" v-for="(item,index) in suggestTags"
                    @click="pushTags(item)"
                    :key="index"
              >{{item.tagsContent}}</span>
            </div>
            <button class="text random" @click="getRandomTags"><i :class="['el-icon-refresh',{go:'addRotate'}]" ></i> 换一换</button>
            <span class="text">
              还可以添加 {{ 5 - ruleForm.articleTags.length }} 个标签
            </span>
          </div>
          <el-button slot="reference" icon="el-icon-plus" size="mini" style="margin-left: 10px">添加文章标签</el-button>
        </el-popover>
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
  getRandomTags
} from "@/api/article/article.js";
export default {
  dicts: ["article_state", "article_category", "article_type"],
  data() {
    return {
      input:'',
      suggestTags:[],
      tagsLoading:true,
      ruleForm: {
        articleTitle: "",
        articleContent: "",
        articleCover: "",
        status: "",
        articleCategory: "",
        articleType: "",
        articleTags: [],
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
    pushTags(item){
      if(this.ruleForm.articleTags.includes(item.tagsContent)){
        this.$message({
          message:'已经有该标签啦~',
          type: "warning",
        })
      }else if(this.ruleForm.articleTags.length<5){
        this.ruleForm.articleTags.push(item.tagsContent);
      }else if(this.ruleForm.articleTags.length>=5){
        this.$message({
          message:'标签数量已达上限',
          type: "warning",
        })
      }
    },
    handleInputConfirm() {
      let input = this.input.trim();
      if (input && this.ruleForm.articleTags.length<5&&!this.ruleForm.articleTags.includes(input)) {
        this.ruleForm.articleTags.push(input);
        this.input = '';
      }else if(input===''){
        this.$message({
          message:'输入内容不能为空',
          type: "warning",
      })}else if(this.ruleForm.articleTags.length>=5){
        this.$message({
          message:'标签数量已达上限',
          type: "warning",
        })}else if(this.ruleForm.articleTags.includes(input)){
        this.$message({
          message:'已经有该标签啦~',
          type: "warning",
        })
      }
      // this.inputVisible = false;
    },
    handleClose(tag) {
      this.ruleForm.articleTags.splice(this.ruleForm.articleTags.indexOf(tag), 1);
    },
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
        articleTags: []
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getRandomTags(){
      this.tagsLoading=true;
      getRandomTags(2).then((res)=>{
        console.log('tags',res)
        this.suggestTags=res.data;
        this.tagsLoading=false;
      })
    }
  },
  mounted() {
    if (this.$route.query.type === "edit"&&this.$route.query.arg ==="article") {
      getEditArticleDetail(this.$route.query.id).then((response) => {
        this.ruleForm = response.data;
      });
    }
    this.getRandomTags();
  },
};
</script>

<style lang="scss" scoped>
@keyframes rotate{

  0%{ transform: (0deg) }

  100%{transform:(360deg)}

}
@keyframes light {
  from{ background-color: #fff6e5}
  to{background-color: #fff}
}
::v-deep.el-tag{
  background-color: #ffffff;
  color: #267dcc;
  border: 1px solid rgba(38,125,204,.2);
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.input{
  position: relative;
  padding: 10px;
  .tagBox{
    margin-top: 10px;
    //columns: 4; // 默认列数
    //column-gap: 10px; // 列间距
    .item{
      display: inline-block;
      padding: 0 8px;
      height: 30px;
      background-color: #ebf2f7;
      border-radius: 2px;
      font-weight: 400;
      color: #507999;
      line-height: 30px;
      cursor: pointer;
      margin-right: 16px;
      margin-bottom: 10px;
      border: none;
      font-size: 13px!important;
    }
  }
  .text{
    display: block;
    margin-top: 10px;
    text-align: right;
    font-size: 12px;
    color: #999;
  }
  .random{
    background-color: transparent;
    border: none;
    transition: all .3s ease-in;
    &:hover{
      color: #267dcc;
      cursor:pointer;
    }
    &:active{
      transform: scale(1.4);
    }
  }
}

</style>