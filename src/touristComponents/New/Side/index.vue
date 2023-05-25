<template>
  <div id="side">
    <span class="title">专栏</span>
    <div class="block">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="img"></div>
          <div class="text"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue"
}
</script>

<style lang="scss" scoped>
#side{
  padding: 20px;
  padding-top: 30px;
  width: 350px;
}
.el-carousel__item{
  .img{
    height: 150px;
  }
  .text{
    height: 150px;
    background-color: #fff;
  }
}
::v-deep .el-carousel__indicators{
  position: absolute;
  top: 40%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>