<template>
  <div class="cform">
    <el-form
      :model="culCreationForm"
      :rules="culCreationrules"
      ref="culCreationForm"
      label-width="100px"
      class="demo-ruleForm"
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
          { required: true, message: "请输入文创标题", trigger: "blur" },
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
  },
  mounted() {
    if (this.$route.query.type === "edit"&&this.$route.query.arg ==="cul") {
      getEditCulDetail(this.$route.query.id).then((response) => {
        this.culCreationForm = response.data;
        console.log(response);
      });
    }
  },
};
</script>

<style>
</style>