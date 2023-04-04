<template>
  <div id="hotel">
    <div class="main">
      <el-header>
        <ComponentTitle>
          <template v-slot:Chinese>酒店</template>
          <template v-slot:English>Hotel</template>
        </ComponentTitle>
      </el-header>
      <el-main>
        <ul>
          <li
            v-for="(item, index) in FoodList"
            :key="index"
            @click="gotoFoodDetail()"
            class="mainli"
          >
            <div class="leftbox">
              <img :src="item.src" alt="" />
            </div>
            <div class="rightbox">
              <span class="title">{{ item.name }}</span>
              <span class="eng">{{ item.eng }}</span>
              <span class="location"
                ><i class="el-icon-location-outline"></i> 位于:
                {{ item.location }}</span
              >
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
      </el-main>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/touristComponents/components/ComponentsTitle";
export default {
  data() {
    return {
      FoodList: [
        {
          name: "东急涩谷卓越大酒店",
          eng: "Shibuya Excel Hotel Tokyu",
          location: "涩谷/原宿",
          src: "https://hotel.mafengwo.net/mfs/s10/M00/BE/F4/wKgBZ1mIcoSAS8sLAAESSdsoM_w77.jpeg?imageMogr2%2Fthumbnail%2F%21660x480r%2Fgravity%2FCenter%2Fcrop%2F%21660x480%2Fquality%2F90",
        },
      ],
    };
  },
  components: { ComponentTitle },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
#hotel {
  padding-top: 60px;
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
          .eng {
            font-size: 18px;
            padding-bottom: 5px;
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