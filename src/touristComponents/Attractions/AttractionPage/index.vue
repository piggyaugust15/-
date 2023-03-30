<template>
  <div id="Attractionspage">
    <!-- <Header></Header> -->
    <div class="main">
      <el-container>
        <el-header>
          <ComponentTitle>
            <template v-slot:Chinese>景点</template>
            <template v-slot:English>Attractions</template>
          </ComponentTitle>
        </el-header>
        <el-main>
          <div class="introduction">
            <div class="carousel">
              <el-carousel trigger="click" height="450px">
                <el-carousel-item v-for="item in imgList" :key="item.id">
                  <h3 class="small">
                    <img :src="$store.state.front.url + item" alt="" />
                  </h3>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="textPattern">
              <div class="mainBody">
                <h1>{{ sights.sightsName }}</h1>
                <span class="translation">{{ sights.sightsEng }}</span>
                <div class="rating">
                  <span>{{ sights.sightsScore }}</span
                  >/5分&nbsp;&nbsp;&nbsp;
                  <p @click="gotoComment()">{{ sights.commentNum }}条点评 ></p>
                  <table
                    style="border-collapse: separate; border-spacing: 0px 20px"
                  >
                    <tr>
                      <td class="leftTag">地址</td>
                      <td>{{ sights.sightsLocation }}</td>
                    </tr>
                    <tr>
                      <td class="leftTag">开放时间&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td>开园中; {{ sights.sightsOpen }}开放</td>
                    </tr>
                    <tr>
                      <td class="leftTag">官方电话&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td>{{ sights.sightsTelephone }}</td>
                    </tr>
                  </table>
                  <ul class="tags">
                    <li @click="gotonextpage('food', 1)">美食</li>
                    <li @click="gotonextpage('hotel')">酒店</li>
                  </ul>
                </div>
              </div>
              <el-button
                type="warning"
                :icon="fav.active"
                circle
                class="fav"
                @click="handlefav()"
              ></el-button>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                content="根据用户访问量和点评量综合计算后得出"
                class="hotPopover"
              >
                <div class="hot" slot="reference">
                  <span>{{ sights.scoreNum }}</span>
                  <div>
                    <i class="fa fa-star" aria-hidden="true">热度</i>
                  </div>
                </div>
              </el-popover>
            </div>
          </div>
          <div class="mainText">
            <!-- 左侧正文部分 -->
            <div class="left_box" id="Comment">
              <div class="mainBody">
                <div class="para">
                  <h1>介绍</h1>
                  <span>{{ sights.sightsIntro }}</span>
                </div>
                <div class="para">
                  <h1></h1>
                  <span></span>
                </div>
                <div class="para"></div>
                <div class="para"></div>
                <div class="para"></div>
                <div class="para"></div>
                <div class="para">
                  <h1>必看贴士</h1>
                  <ul>
                    <li v-for="(item, index) in sights.bulletin" :key="index">
                      {{ index + 1 }}. {{ item.bulletinContent }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="Comment">
<!--                 <CommentDiv :type="0"></CommentDiv>-->
                <el-tabs tab-position="top" style="height: 200px">
                  <el-tab-pane label="智能排序">
                    <CommentList :type="0"></CommentList>
                  </el-tab-pane>
                  <el-tab-pane label="时间排序">时间排序</el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <!-- 右侧边推荐栏目 -->
            <div class="right_box">
              <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                :stretch="true"
              >
                <el-tab-pane label="附近景点" name="first">
                  <RecommendList :type="NearbyAttractions"></RecommendList>
                </el-tab-pane>
                <el-tab-pane label="推荐景点" name="second">
                  <RecommendList :type="RecommendAttractions"></RecommendList>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Crumbs from "../../New/Crumbs";
// import Comment from "../../components/Comment";
import ComponentTitle from "../../components/ComponentsTitle";
import RecommendList from "../../components/RecommendList";
import Maintext from "../../New/Maintext";
import { getSights, getSightsInfo } from "@/api/sights/sights.js";
import CommentDiv from "@/touristComponents/components/CommentDiv";
import CommentList from "@/touristComponents/components/CommentList";
import {addview,hit} from '@/api/hot/hotSights'
export default {
  name: "Attractionspage",
  data() {
    return {
      sights: {},
      fav: {
        active: "el-icon-star-off",
        isactive: false,
      },
      comment: 5188,
      imgList: [],
      activeName: "first",
      NearbyAttractions: "NearbyAttractions",
      RecommendAttractions: "RecommendAttractions",
    };
  },
  components: {
    Maintext,
    Crumbs,
    ComponentTitle,
    RecommendList,
    // Comment,
    CommentDiv,
    CommentList,
  },
  watch:{
    $route(to, from,next) {
      this.getSightsInfo();
    }
  },
  methods: {
    handlefav() {
      if (this.fav.isactive) {
        this.fav.active = "el-icon-star-off";
        this.fav.isactive = !this.fav.isactive;
        this.$message("取消收藏");
      } else {
        this.fav.active = "el-icon-star-on";
        this.fav.isactive = !this.fav.isactive;
        this.$message("收藏成功");
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    gotoComment() {
      document.querySelector("#Comment").scrollIntoView({
        behavior: "smooth",
      });
    },
    gotonextpage(item, value) {
      switch (item) {
        case "food":
          this.$router.push({
            path: "/frontHome/attraction/food",
            query: { sightsId: value },
          });
          break;
        case "hotel":
          this.$router.push({ path: "/RecommendHotel" });
          break;
      }
    },
    getSightsInfo(){
      getSightsInfo(this.$route.query.id).then((response) => {
        addview(this.$route.query.id);
        hit(this.$route.query.id);
        this.sights = response.data;
        this.imgList = this.sights.sightsImage.split(",");
      });
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.getSightsInfo();
  },
};
</script>

<style lang="scss" scoped>
#Attractionspage {
  a {
    text-decoration: none;
    color: #349eff;
    font-size: 14px;
  }
  li {
    list-style: none;
  }
  width: 100%;
  margin-top: 60px;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  .main {
    width: 1340px;
    margin: 0 auto;
    .tags {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      li {
        width: 74px;
        height: 28px;
        display: inline-block;
        text-align: center;
        line-height: 28px;
        font: {
          size: 13px;
        }
        border: 1px solid #f1f2f3;
        border-radius: 6px;
        background-color: #f6f7f8;
        color: #61666d;
        transition: background-color 0.3s, color 0.3s;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          background-color: #e3e5e7;
        }
        &:hover {
          color: #18191c;
        }
        p {
          transition: background-color 0.3s, color 0.3s;
          color: #61666d;
        }
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .newstitle {
    height: 300px;
    width: 100%;
    .leftText {
      display: inline-block;
      padding-right: 15px;
      border-right: 3px solid rgb(0, 123, 255);
      vertical-align: middle;
      span {
        font-size: 45px;
        font-weight: 400;
      }
    }
    .right {
      padding-left: 10px;
      font-size: 25px;
      vertical-align: middle;
    }
  }
  .carousel {
    display: inline-block;
    width: 60%;
  }
  .textPattern {
    position: relative;
    float: right;
    width: 40%;
    h1 {
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .mainBody {
      padding-left: 20px;

      .rating {
        margin-top: 10px;
        p {
          display: inline-block;
          font-size: 13px;
          cursor: pointer;
          &:hover {
            color: #349eff;
          }
        }
        .leftTag {
          font-weight: 700;
        }
        span {
          font-size: 26px;
          font-weight: 700;
          color: #349eff;
          vertical-align: baseline;
        }
      }
      .translation {
        font-size: 14px;
      }
    }
    .fav {
      position: absolute;
      width: 50px;
      height: 50px;
      right: 5px;
      top: 100px;
    }
    .hotPopover {
      background-color: black;
    }
    .hot {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 55px;
      background-color: pink;
      border-radius: 5px;
      text-align: center;
      background: linear-gradient(90deg, #ff716e, #ff902a);
      color: #d3dce6;
      span {
        display: block;
        font-size: 20px;
        margin-top: 3px;
      }
    }
  }
  .mainText {
    margin-top: 20px;
    .left_box {
      display: inline-block;
      width: 70%;
      h1 {
        margin-bottom: 10px;
      }
      .mainBody {
        padding-right: 30px;
      }
    }
    .right_box {
      float: right;
      width: 30%;
      .el_tab {
        width: 100%;
      }
    }
  }
}
</style>
