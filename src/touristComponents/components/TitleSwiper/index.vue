<template>
  <div id="TitleSwiper">
    <div class="block">

      <el-carousel class="carousel" :interval="10000" arrow="never">
        <el-carousel-item v-for="item in listInfo" :key="item.newId" class="is-animating">
          <div @click="gotoNews(item.newsId)">
            <div class="text" >
              <div class="time">
                <span class="day">{{item.createTime.split('|')[0]}}</span>
                <span class="month">{{item.createTime.split('|')[1]}}</span>
                <span class="year">{{item.createTime.split('|')[2]}}</span>
              </div>
              <div class="intro">
                <span>{{item.newsTitle}}</span>
              </div>
            </div>
            <img :src="$store.state.front.url+item.imageId" alt="">
          </div>
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
    methods:{
      gotoNews(id){
        this.$router.push({ path: "/frontHome/new/NewsPage/"+id});
      }
    },
    mounted() {
      getCarousel().then(response =>{
        this.listInfo=response.data
      });
    },
  };
</script>

<style lang="scss" scoped>
#TitleSwiper{
  width: 100%;
  height: 550px;
  margin-bottom: 70px;
  .block{
    .carousel{
      width: 100%;
      height: 550px;
      overflow: hidden;
      .el-carousel__item {
        width: 100%;
        height: 550px;
        margin: 0;
        padding: 0;
        &:hover{
          cursor: pointer;
        }
        .text{
          position: absolute;
          top: 120px;
          left: 20%;
          .day{
            font-size: 35px;
          }
          span{
            text-shadow: 0 1px 3px rgba(0,0,0,.9);
            color: #fff;
            font: {
              size: 25px;
            };
          }
        }
          img{
            display: block;
            width: 100%;
            height: 100%;
            //object-fit: cover;
          }
        h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 150px;
          margin: 0;
        }
      }
    }
  }

  ::v-deep .el-carousel__arrow{
    transform: translateY(-40%);
  }
  //.el-carousel__item{
  //  transition: opacity .2s ease-in-out !important;
  //}
}
</style>
