<template>
  <div id="TitleSwiper">
    <div class="block">
      <el-carousel height="550px">
        <el-carousel-item v-for="item in listInfo" :key="item.newId">
          <img :src="$store.state.front.url+item.imageId" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {getCarousel} from "@/api/home/news";
  export default {
    name: "TitleSwiper",
    data() {
      return {
        listInfo: [
        ],
      };
    },
    mounted() {
      getCarousel().then(response =>{
        console.log(response)
        this.listInfo=response.data
      });
    },
  };
</script>

<style lang="scss" scoped>
#TitleSwiper{
  height: 580px;
  .el-carousel__item {
    img{
      width: 100%;
      height: 100%;
    }
    h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
