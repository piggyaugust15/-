<template>
  <div class="cform">
    <el-form
      :model="culCreationForm"
      :rules="culCreationrules"
      ref="culCreationForm"
      label-width="100px"
      class="demo-ruleForm"
      v-loading='loading'
    >
      <el-form-item label="文创标题" prop="culCreativityTitle">
        <el-input v-model="culCreationForm.culCreativityTitle"></el-input>
      </el-form-item>
      <el-form-item label="文创内容" prop="culCreativityContent">
        <mavon-editor
          v-model="culCreationForm.culCreativityContent"
        ></mavon-editor>
      </el-form-item>
      <el-form-item label="文创简介" prop="culCreativityIntro">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="输入文创简介"
          v-model="culCreationForm.culCreativityIntro"
        />
      </el-form-item>
      <el-form-item label="文创图片" prop="culCreativityImage">
        <imageUpload v-model="culCreationForm.culCreativityImage" />
      </el-form-item>

      <el-form-item label="文创标签" prop="articleTag">
        <el-tag
            :key="tag"
            v-for="tag in culCreationForm.culCreativityTags"
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
              还可以添加 {{ 5 - culCreationForm.culCreativityTags.length }} 个标签
            </span>
          </div>
          <el-button slot="reference" icon="el-icon-plus" size="mini" style="margin-left: 10px">添加文章标签</el-button>
        </el-popover>
      </el-form-item>

      <el-form-item label="文创状态" prop="status">
        <el-radio-group v-model="culCreationForm.status">
          <el-radio
            v-for="dict in dict.type.cul_creativity_state"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文创分类" prop="culCreativityCategory">
        <el-radio-group v-model="culCreationForm.culCreativityCategory">
          <el-radio
            v-for="dict in dict.type.cul_creativity_category"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文创类型" prop="culCreativityType">
        <el-radio-group v-model="culCreationForm.culCreativityType">
          <el-radio
            v-for="dict in dict.type.cul_creativity_type"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('culCreationForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('culCreationForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createCul } from "@/api/sights/cul_creativity.js";
import {getEditCulDetail} from "@/api/cul/cul";
import {getRandomTags} from "@/api/article/article";
export default {
  dicts: [
    "cul_creativity_type",
    "cul_creativity_state",
    "cul_creativity_category",
  ],
  data() {
    const checkImage = (rule, value, callback) => {
      if (value.split(",").length < 3) {
        callback(new Error("至少上传三张图片"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      input:'',
      tagsLoading:false,
      suggestTags:[],
      culCreationForm: {
        culCreativityTitle: "",
        culCreativityContent: "",
        status: "",
        culCreativityCategory: "",
        culCreativityType: "",
        culCreativityTags: [],
        culCreativityImage: "",
        culCreativityIntro: "",
      },
      culCreationrules: {
        culCreativityTitle: [
          { required: true, message: "请输入文创标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        culCreativityType: [
          { required: true, message: "请选择文创类型", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择文创状态", trigger: "change" },
        ],
        culCreativityCategory: [
          { required: true, message: "请选择文创分类", trigger: "change" },
        ],
        culCreativityImage: [
          { required: true, message: "请上传文创图片", trigger: "change" },
          { validator: checkImage, triger: "blur" },
        ],
        culCreativityIntro: [
          { required: true, message: "请输入文创简介", trigger: "blur" },
          {
            min: 1,
            message: "请输入文创内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClose(tag) {
      this.culCreationForm.culCreativityTags.splice(this.culCreationForm.culCreativityTags.indexOf(tag), 1);
    },
    pushTags(item){
      if(this.culCreationForm.culCreativityTags.includes(item.tagsContent)){
        this.$message({
          message:'已经有该标签啦~',
          type: "warning",
        })
      }else if(this.culCreationForm.culCreativityTags.length<5){
        this.culCreationForm.culCreativityTags.push(item.tagsContent);
      }else if(this.culCreationForm.culCreativityTags.length>=5){
        this.$message({
          message:'标签数量已达上限',
          type: "warning",
        })
      }
    },
    handleInputConfirm() {
      let input = this.input.trim();
      if (input && this.culCreationForm.culCreativityTags.length < 5&&!this.culCreationForm.culCreativityTags.includes(input)) {
        this.culCreationForm.culCreativityTags.push(input);
        this.input = '';
      } else if (input === '') {
        this.$message({
          message: '输入内容不能为空',
          type: "warning",
        })
      } else if (this.culCreationForm.culCreativityTags.length >= 5) {
        this.$message({
          message: '标签数量已达上限',
          type: "warning",
        })
      }else if(this.culCreationForm.culCreativityTags.includes(input)){
        this.$message({
          message:'已经有该标签啦~',
          type: "warning",
        })
      }
    },
      // this.inputVisible = f
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.culCreationForm);
          createCul(this.culCreationForm).then((res) => {
            console.log(res);
            if (res.code === 200) {
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    myresetForm() {
      this.culCreationForm = {
        culCreativityTitle: "",
        culCreativityContent: "",
        culCreativityCover: "",
        status: "",
        culCreativityCategory: "",
        culCreativityType: "",
        culCreativityTags: [],
        culCreativityImage: "",
        culCreativityIntro: "",
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getRandomTags(){
      this.tagsLoading=true;
      getRandomTags(1).then((res)=>{
        console.log('tags',res)
        this.suggestTags=res.data;
        this.tagsLoading=false;
      })
    }
  },
  mounted() {
    if (this.$route.query.type === "edit"&&this.$route.query.arg ==="cul") {
      this.loading=true;
      getEditCulDetail(this.$route.query.id).then((response) => {
        this.culCreationForm = response.data;
        console.log(response);
        this.loading=false;
      });
    }
    this.getRandomTags(1);
  },
};
</script>

<style lang="scss" scoped>
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