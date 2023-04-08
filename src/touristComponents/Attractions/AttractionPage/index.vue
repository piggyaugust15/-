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
                  <div class="ticket" @click="centerDialogVisible=true">购买门票</div>
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
                  <span>{{ sights.sightsHot }}</span>
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
                  <div class="info" v-html="sights.sightsIntro"></div>
                </div>
                <div class="para">
                  <h1>必看贴士</h1>
                    <div v-for="(item, index) in sights.bulletin" :key="index" v-html="item.bulletinContent" class="info">
<!--                      {{ index + 1 }}. {{ item.bulletinContent }}-->
                    </div>
                </div>
              </div>
              <div class="Comment">
                 <AttractionCommentDiv :type="0"></AttractionCommentDiv>
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
      <el-dialog
          title="门票"
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
        <el-table :data="sights.tickets">
          <el-table-column property="ticketPrice" label="价格" width="100"></el-table-column>
          <el-table-column property="ticketNum" label="数量" ></el-table-column>
          <el-table-column property="discount" label="折扣" ></el-table-column>
          <el-table-column property="ticketBegintime" label="开始时间" width="170"></el-table-column>
          <el-table-column property="ticketEndtime" label="结束时间"  width="170"></el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            title="购买界面"
            :visible.sync="BuyVisible"
            width="50%"
            center
            append-to-body
        >
          <div style="text-align: center">
            <img :src="$store.state.front.url+sights.sightsCode.split(',')[0]" alt="" style="width: 300px;
         height: 300px;">
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="BuyVisible = false">取 消 购 买</el-button>
        </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

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
import AttractionCommentDiv from "@/touristComponents/components/AttractionCommentDiv";
import {addview,hit,fav} from '@/api/hot/hotSights'
export default {
  name: "Attractionspage",
  data() {
    return {
      BuyVisible:false,
      centerDialogVisible:false,
      sights: {},
      fav: {
        active: "el-icon-star-off",
        isactive: 0,
      },
      comment: 5188,
      imgList: [],
      activeName: "second",
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
    CommentList,AttractionCommentDiv
  },
  watch:{
    $route(to, from,next) {
      this.getSightsInfo();
    }
  },
  methods: {
    handlefav() {
      if (this.sights.ifCollect) {
        this.fav.active = "el-icon-star-off";
        this.sights.ifCollect = !this.sights.ifCollect;
        //this.$message("取消收藏");
        fav(this.$route.query.id).then((res)=>{
          this.$message.success(res.msg);
        })
      } else {
        this.fav.active = "el-icon-star-on";
        this.sights.ifCollect = !this.sights.ifCollect;
        //this.$message("收藏成功");
        fav(this.$route.query.id).then((res)=>{
          this.$message.success(res.msg);
        })
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      this.BuyVisible=true;
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
          this.$router.push({ path: "/frontHome/attraction/hotel" });
          break;
      }
    },
    getSightsInfo(){
      getSightsInfo(this.$route.query.id).then((response) => {
        addview(this.$route.query.id);
        hit(this.$route.query.id);
        console.log('attra',response)
        this.sights = response.data;
        this.imgList = this.sights.sightsImage.split(",");
        if(this.sights.ifCollect){
          this.fav.active = "el-icon-star-on";
        }
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
 $font:"AvenirNext-DemiBold", "Helvetica Neue Medium", sans-serif;
  a {
    text-decoration: none;
    color: #349eff;
    font-size: 14px;
  }
  li {
    list-style: none;
  }
  width: 100%;
  margin-top: 80px;
  color: #333;
  .main {
    width: 1340px;
    margin: 0 auto;
    font-family: $font;
    .tags {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-family: $font;
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
          font-family: $font;
        }
      }
    }
    .ticket{
      width: 100px;
      text-align: center;
      padding: 10px;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      background-color:#349eff;
      transition: all ease .1s;
      &:hover{
        background-color: #0360b0;
      }
    }
    .mainText{
      .mainBody{
        .para{
          .info{
            line-height: 30px;
            text-indent: 2em;
            font-family: $font;
          }
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
    font-family: $font;
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
    font-family: $font;
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
      .Comment{
        padding-right: 10px;
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
  .code{

  }
}
</style>
