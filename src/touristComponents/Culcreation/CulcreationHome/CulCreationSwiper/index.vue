<template>
  <div id="culcreationswiper">
    <el-carousel :interval="4000" type="card" height="400px" :intervals="6000">
      <el-carousel-item v-for="item in 6" :key="item" class="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
#culcreationswiper{
  width: 1340px;
  margin: 0 auto;
  margin-top: 80px;
  height: 500px;
}
.el-carousel__item{
  border-radius: 15px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>