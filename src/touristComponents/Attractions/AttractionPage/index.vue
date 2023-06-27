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
                  <span class="score">{{ sights.sightsScore }}</span
                  >/5分&nbsp;&nbsp;&nbsp;
                  <div style="margin-top: 10px;" class="myrating">
                    我的评分：<el-rate
                      v-model="value"
                      :colors="colors"
                      show-text
                      :texts="texts"
                  @change="scoreChange">
                  </el-rate>
<!--                    <span v-if="sights.score===-1"  class="myrating" @click="ratingVisible=true">暂未评分</span>-->
<!--                    <span v-else  class="myrating"  @click="ratingVisible=true">{{ sights.score }}</span>-->
                  </div>
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


                    <el-popover
                        placement="top-start"
                        width="1000"
                        trigger="hover"
                        class="hotPopover"
                        v-if="sights.weather !==null"
                    >
                      <div class="forecastsList">
                          <div class="item">
                            <span>现在</span>
                            <div class="icon">
                              <span><i class="el-icon-cloudy" v-if="sights.weather.now.text==='多云'"></i></span>
                              <span><i class="el-icon-sunny" v-if="sights.weather.now.text==='晴'"></i></span>
                              <span><i class="el-icon-partly-cloudy" v-if="sights.weather.now.text==='阴'"></i></span>
                              <span><i class="el-icon-light-rain" v-if="sights.weather.now.text==='阵雨'"></i></span>
                              <span><i class="el-icon-light-rain" v-if="sights.weather.now.text==='小雨'"></i></span>
                              <span><i class="el-icon-heavy-rain" v-if="sights.weather.now.text==='大雨'"></i></span>
                              <span><i class="el-icon-lightning" v-if="sights.weather.now.text==='雷阵雨'"></i></span>
                            </div>
                            <span>{{sights.weather.now.text}}</span>
                            <span>体感温度: {{sights.weather.now.feelsLike}} ℃</span>
                            <span>气温: {{sights.weather.now.temp}} ℃</span>
                          </div>
                          <div class="item" v-for="(item,index) in sights.weather.forecasts" :key="index">
                            <span>{{item.date}}</span>
                            <div class="icon">
                              <span><i class="el-icon-cloudy" v-if="item.textDay==='多云'"></i></span>
                              <span><i class="el-icon-sunny" v-if="item.textDay==='晴'"></i></span>
                              <span><i class="el-icon-partly-cloudy" v-if="item.textDay==='阴'"></i></span>
                              <span><i class="el-icon-light-rain" v-if="item.textDay==='阵雨'"></i></span>
                              <span><i class="el-icon-light-rain" v-if="item.textDay==='小雨'"></i></span>
                              <span><i class="el-icon-heavy-rain" v-if="item.textDay==='大雨'"></i></span>
                              <span><i class="el-icon-lightning" v-if="item.textDay==='雷阵雨'"></i></span>
                            </div>
                            <span>白天:{{item.textDay}}</span>
                            <span>夜间:{{item.textNight}}</span>
                            <span>{{item.low}} ℃ ~{{item.high}} ℃</span>
                          </div>
                      </div>
                      <div class="weather" slot="reference">
                        <div class="icon">
                          <span><i class="el-icon-cloudy" v-if="sights.weather.now.text==='多云'"></i></span>
                          <span><i class="el-icon-sunny" v-if="sights.weather.now.text==='晴'"></i></span>
                          <span><i class="el-icon-partly-cloudy" v-if="sights.weather.now.text==='阴'"></i></span>
                          <span><i class="el-icon-light-rain" v-if="sights.weather.now.text==='阵雨'"></i></span>
                          <span><i class="el-icon-light-rain" v-if="sights.weather.now.text==='小雨'"></i></span>
                          <span><i class="el-icon-heavy-rain" v-if="sights.weather.now.text==='大雨'"></i></span>
                          <span><i class="el-icon-lightning" v-if="sights.weather.now.text==='雷阵雨'"></i></span>
                        </div>
                        <span>{{sights.weather.now.text}}</span>
                      </div>
                    </el-popover>




                  <div class="speak"><Speak :voice=speakInfo :lang="speakTTS"></Speak></div>
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
                  <div class="info" v-html="sights.sightsDetail"></div>
                </div>
<!--                <video src="http://vjs.zencdn.net/v/oceans.mp4" autoplay></video>-->
                <video-player class="vjs-custom-skin"
                              ref="videoPlayer"
                              :options="playerOptions"
                              :playsinline="true"
                              @play="onPlayerPlay($event)"
                              @pause="onPlayerPause($event)"
                              @canplay="playerCanplay($event)"
                              @ready="playerReadied"
                              v-if="sights.sightsVideo!==null"
                >
                </video-player>
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
<!--                  <el-tab-pane label="时间排序">时间排序</el-tab-pane>-->
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
                <el-tab-pane label="相似景点" name="first">
                  <RecommendList :type="SimilarAttractions"></RecommendList>
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
      <el-dialog
          title="评分"
          :visible.sync="ratingVisible"
          width="500px"
          center>
        <div class="block" style="text-align: center">
<!--          <span class="demonstration">我的评分</span>-->

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ratingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleScore">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Crumbs from "../../New/Crumbs";
import ComponentTitle from "../../components/ComponentsTitle";
import RecommendList from "../../components/RecommendList";
import Maintext from "../../New/Maintext";
import { getSights, getSightsInfo } from "@/api/sights/sights.js";
import CommentDiv from "@/touristComponents/components/CommentDiv";
import CommentList from "@/touristComponents/components/CommentList";
import AttractionCommentDiv from "@/touristComponents/components/AttractionCommentDiv";
import {addview,hit,fav,score,getSimilarSight} from '@/api/hot/hotSights'
import {paraTranslate} from '@/api/system/translate'
import Speak from "@/components/Speak";

export default {
  name: "Attractionspage",
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "" // url地址
        }],
        poster:'', // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      },
      speakTTS:'zh-CN',
      speakInfo:'',
      texts:['1分', '2分', '3分', '4分', '5分'],
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      BuyVisible:false,
      centerDialogVisible:false,
      ratingVisible:false,
      sights: {
        sightsCode:''
      },
      fav: {
        active: "el-icon-star-off",
        isactive: 0,
      },
      comment: 5188,
      imgList: [],
      activeName: "second",
      SimilarAttractions: "SimilarAttractions",
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
    AttractionCommentDiv,Speak
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  watch:{
    $route(to, from,next) {
      this.getSightsInfo();
    },
    '$store.state.front.lang'(){
      this.paraTranslate();
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

    scoreChange(){
      this.handleScore();
    },

    handleScore(){
      this.sights.score=this.value;
      score(this.$route.query.id,this.value).then((res)=>{
        this.$message.success(res.msg);
      })
    },

    handleScoreClose(){
      if(this.sights.score!==-1){
        this.value=this.sights.score
      }
      this.ratingVisible = false;
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
          this.$router.push({ path: "/frontHome/attraction/hotel" ,query:{id:this.$route.query.id}});
          break;
      }
    },

    getSightsInfo(){
      getSightsInfo(this.$route.query.id).then((response) => {
        addview(this.$route.query.id);
        hit(this.$route.query.id);
        console.log(response,'attra')
        this.sights = response.data;
        this.playerOptions['sources'][0].src=this.sights.sightsVideo;
        this.playerOptions['poster']= this.$store.state.front.url+this.sights.sightsCover;
        console.log(this.playerOptions.sources[0])
        if(this.sights.score!==-1){
          this.value=this.sights.score
        }
        this.imgList = this.sights.sightsImage.split(",");
        if(this.sights.ifCollect){
          this.fav.active = "el-icon-star-on";
        }
      });
    },

    paraTranslate(){
      paraTranslate(0,this.$route.query.id,0).then((res)=>{
        this.sights.sightsDetail=res.data.sightsDetailOUT;;
        this.speakInfo=res.data.sightsDetailOUT;
        this.speakTTS=res.data.speakTTS;
      })
    },

    onPlayerPlay(player) {
      this.$emit('play');
    },
    onPlayerPause(player) {
      player.pause();
    },
    playerReadied(player) {
    },
    playerCanplay(player){
    },
    currentVideoPause() {
      this.$refs.videoPlayer.player.pause();

    },
    currentVideoPlay() {
      this.$refs.videoPlayer.player.play();
    },
  },
  mounted() {
    this.getSightsInfo();
    this.paraTranslate();
    this.player.children_[0].style.borderTopRightRadius = '10px'
    this.player.children_[0].style.borderTopLeftRadius = '10px'
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
    .weather{
      position:absolute ;
      bottom: 0;
      right: 0;
      //width: 60px;
      text-align: center;
      color: #349eff;
      .icon{
        font-size: 40px;
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
      .speak{
        position: absolute;
        top: 0;
        right: 70px;
      }
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
        .myrating{
          display: flex;
          align-items: center;
        }
        .score{
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
    padding-bottom: 30px;
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
.forecastsList{
  display: flex;
  justify-content: flex-start;   /* 左对齐 */
  flex-wrap: wrap;
  .item{
    text-align: center;
    margin-right: 10px;   /* 每个元素右间距设置为20px */
    width: calc((100% - 50px) / 6);
    .icon{
      font-size: 40px;
    }
    span{
      display: block;
      margin-top: 5px;
    }
  }
  .item:nth-of-type(6n+0) {
    margin-right: 0;
  }
}
</style>
