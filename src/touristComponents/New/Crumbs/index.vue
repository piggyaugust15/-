<template>
  <div class="block">
    <el-breadcrumb separator="/">
      <!--      这里到时候要注意一下哦-->
      <el-breadcrumb-item :to="{ path: '/frontHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/frontHome/new'}">快讯</el-breadcrumb-item>
      <el-breadcrumb-item>快讯详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: "Crumbs",
  };
</script>

<style scoped>
  .block {
    padding-left: 20px;
    margin-top: 30px;
  }
</style>
