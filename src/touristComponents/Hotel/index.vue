<template>
  <div id="hotel">
    <div class="main">
      <el-header>
        <ComponentTitle>
          <template v-slot:Chinese>酒店</template>
          <template v-slot:English>Hotel</template>
        </ComponentTitle>
      </el-header>
      <el-main v-loading="loading">
        <ul v-if="HotelList.length>0">
          <li
            v-for="(item, index) in HotelList"
            :key="index"
            class="mainli"
          >
            <div class="leftbox">
              <img :src="$store.state.front.url+item.hotelPhoto.split(',')[0]" alt="" />
            </div>
            <div class="rightbox">
              <span class="title">{{ item.hotelName }}</span>
              <span class="location"
                ><i class="el-icon-location-outline"></i> 位于:
                {{ item.hotelAddress }}</span
              >
              <span class="intro">{{ item.hotelIntro }}</span>
            </div>
            <div class="otherbox">
              <ul class="otherul">
                <li>
                  <img
                    src="https://images.mafengwo.net/images/hotel/ota/booking_w100h20_2x_2.png"
                    alt=""
                  />
                  <i class="el-icon-arrow-right"></i>
                </li>
                <li>
                  <img
                    src="https://images.mafengwo.net/images/hotel/newlogo/mafengwo_2018@2x.png"
                    alt=""
                  />
                  <i class="el-icon-arrow-right"></i>
                </li>
                <li>
                  <img
                    src="https://images.mafengwo.net/images/hotel/ota/ctrip_w100h20_2x_2.png"
                    alt=""
                  />
                  <i class="el-icon-arrow-right"></i>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <el-empty
            description="暂时还没有酒店哦(''▔□▔)"
            v-else
        ></el-empty>
      </el-main>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/touristComponents/components/ComponentsTitle";
import {getHotelList} from '@/api/hotel/hotel.js'
export default {
  data() {
    return {
      loading:true,
      HotelList: [
        {
          hotelPhoto:''
        },
      ],
    };
  },
  components: { ComponentTitle },
  methods:{
    getHotelList(){
      getHotelList(this.$route.query.id).then((res)=>{
        this.HotelList=res.rows
        console.log(res)
        this.loading=false;
      })
    }
  },
  mounted(){
    this.getHotelList()
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
#hotel {
  padding-top: 80px;
  background: #f6f6f6;
  min-height: 100%;
  .main {
    width: 1340px;
    margin: 0 auto;
    ul {
      border: 1px solid #f0f0f0;
      .mainli {
        display: flex;
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
        transition: all 0.1s ease-in;
        background-color: #fff;
        &:hover {
          cursor: pointer;
          background: #f8f8f8;
        }
        .leftbox {
          width: 330px;
          height: 240px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .rightbox {
          flex: 1;
          padding-left: 20px;
          span {
            display: block;
            font-size: 12px;
            color: #999;
            padding-bottom: 10px;
          }
          .title {
            color: #333;
            font-size: 23px;
            // font-weight: 700;
          }
          .intro {
            display: block;
            max-width: 600px;
            font-size: 15px;
            padding-bottom: 5px;
            margin-top: 15px;
          }
          .location {
            font-size: 15px;
          }
        }
        .otherbox {
          margin-top: 60px;
          .otherul {
            border: none;
            li {
              display: flex;
              border: none;
              padding: 15px 10px 10px 10px;
              border-bottom: 1px solid #e4e4e4;
              transition: all 0.1s ease-in;
              align-items: center;
              &:hover {
                cursor: pointer;
                background: #dfdfdf;
              }
              &:hover i {
                color: #868686;
              }
              img {
                width: 100px;
                height: 20px;
                margin-right: 90px;
              }
              i {
                font-size: 20px;
                color: #c0c0c0;
                transition: all 0.1s ease-in;
              }
            }
          }
        }
      }
    }
    .logo {
      i {
        font-size: 20px;
      }
    }
  }
}
</style>