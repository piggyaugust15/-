<template>
  <div id="attractionsswiper">
    <AttractionsSearch></AttractionsSearch>
    <div class="swiperbox">
      <swiper ref="mySwiper" class="swiper" :options="options">
        <swiper-slide class="item" v-for="(item,index) in listInfo" :key="index">
          <div>
            <div class="text" >
              <div class="time">
                <span class="day">{{item.sightsName}}</span>
                <span class="eng">{{item.sightsEng}}</span>
<!--                <span class="month">{{item.createTime.split('|')[1]}}</span>-->
<!--                <span class="year">{{item.createTime.split('|')[2]}}</span>-->
              </div>
              <div class="intro">
                <span>{{item.sightsLocation}}</span>
                <div class="location">
                  <div class="icon"><i class="el-icon-location-information"></i> </div>
                  <div>
                    <div>经度：{{item.sightsLongitude}} 纬度： {{item.sightsLatitude}}</div>
                  </div>
                </div>
              </div>
            </div>
            <img :src="$store.state.front.url+item.sightsImage.split(',')[0]" alt="">
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper,SwiperSlide } from 'vue-awesome-swiper'
import {getSwiper} from "@/api/attraction/attraction";
import AttractionsSearch from '@/touristComponents/Attractions/AttractionsSearch'
export default {
  data() {
    return {
      listInfo: [
      ],
      //配置项例子
      options: {
        loop: true,
        effect: 'fade',
        autoplay: {
          //swiper手动滑动之后自动轮播失效的解决方法,包括触碰，拖动，点击pagination,重新启动自动播放
          disableOnInteraction: false,
          // 自动播放时间：毫秒
          delay: 6000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // bulletClass: "my-bullet",
        },
      },
    };
  },
  methods:{
    gotoAttraction(id){
      alert()
      this.$router.push({ path: "/frontHome/attractions/attraction",query:{id:id}});
    }
  },
  mounted() {
    getSwiper().then(response =>{
      console.log(response,'attra')
      this.listInfo=response.data
    });
  },
  components:{
    Swiper, SwiperSlide,AttractionsSearch
  }
};
</script>

<style lang="scss" scoped>
#attractionsswiper{
  width: 100%;
  height: 600px;
  margin-bottom: 35px;
  position: relative;
  .swiperbox{
    width: 100%;
    height: 100%;
    margin: 0;
    .swiper{
      width: 100%;
      height: 100%;
      ::v-deep .swiper-container{
        width: 100%;
      }
      ::v-deep .swiper-slide{
        width: 100% !important;
        height: 100%;
      }
      .item{
        width: 100%;
        height: 550px;
        margin: 0;
        padding: 0;
        .text{
          position: absolute;
          top: 120px;
          left: 20%;
          .time{
            margin-bottom: 10px;
          }
          .day{
            font-size: 45px;
            font: {
              weight: 700;
              family: "Noto Serif SC", serif;;
            };
          }
          .eng{
            margin-left: 10px;
          }
          span{
            text-shadow: 0 1px 3px rgba(0,0,0,.9);
            color: #fff;
            font: {
              size: 25px;
            };
            font: {
              weight: 700;
              family: "Noto Serif SC", serif;;
            };
          }
          .intro{
            .location{
              display: flex;
              align-items: center;
              margin-top: 10px;
              font-size: 16px;
              text-shadow: 0 1px 3px rgba(0,0,0,.9);
              color: #fff;
              .icon{
                color: #fff;
                margin-right: 5px;
                i{
                  font-size: 25px;
                }
              }
            }
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

      ::v-deep.my-bullet-active{
        background: #ffffff;
        opacity: 1;
      }
      ::v-deep.swiper-pagination-bullet{
        width: 35px;
        height: 3px;
        border-radius: 0;
        background: #b3e9cf;
    }
  }
}
}
</style>