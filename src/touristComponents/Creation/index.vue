<template>
  <div id="index">
    <div class="top">
      <el-container>
        <el-aside width="500px">
          <div id="carousel">
            <el-carousel indicator-position="outside" class="carousel">
              <el-carousel-item v-for="item in carouselList" :key="item.id" @click.native="gotoActivity(item.activityId)">
                <img :src="$store.state.front.url+item.activityImage.split(',')[0]" alt="" />
                <h3 class="title">{{ item.activityTitle }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-aside>
        <el-main class="el-main">
          <div class="activity">
            <div class="title">
              <h3>热门活动</h3>
              <div class="more">更多<i class="el-icon-arrow-right"></i></div>
            </div>
            <ul>
              <li v-for="(item, index) in activityList" :key="index">
                <div class="circle"></div>
                <span class="name" @click="gotoActivity(item.activityId)">{{ item.activityTitle }}</span>
                <img src="@/assets/images/hot.png" alt="" />
                <div class="takepart"><img src="@/assets/images/fire.png" alt="">{{item.activityHot}}</div>
              </li>
            </ul>
          </div>
          <div class="challenge" >
            <img :src="$store.state.front.url+rightBottom.typesetImage.split(',')[0]" alt="" />
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="middle">
      <div class="refresh" @click="handleRefresh()">
        <span>每日中午12点更新昨日数据<i class="el-icon-arrow-right"></i></span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="稿件数据" name="first">
          <div class="manuscriptData">
            <ul>
              <li v-for="item in manuscriptTagList" :key="item.index">
                <div class="data">
                  <span class="name"
                    ><i :class="item.icon"></i>{{ item.name }}</span
                  >
                  <span class="number">{{ item.number }}</span>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专栏数据" name="second">
          <div class="columnData">
            <ul>
              <li v-for="item in columnTagList" :key="item.index">
                <div class="data">
                  <span class="name">{{ item.name }}</span>
                  <span class="number">{{ item.number }}</span>
                  <span class="yesterday"
                    >昨日
                    <i v-if="item.yesterday != 0">{{ item.yesterday }}</i>
                    <i v-else>--</i></span
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
<!--    <div class="bottom">-->
<!--      <div class="title">-->
<!--        <h3>评论</h3>-->
<!--        <div class="more">-->
<!--          <router-link to="/frontHome/Creation/comment"-->
<!--            >更多<i class="el-icon-arrow-right"></i-->
<!--          ></router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="commentDiv">-->
<!--        <ul>-->
<!--          <li v-for="(item, index) in commentList" :key="index">-->
<!--            <div class="leftbox"><img :src="item.avatar" alt="" /></div>-->
<!--            <div class="rightbox">-->
<!--              <span class="name">{{ item.name }} · </span>-->
<!--              <span class="time">{{ item.time }}</span>-->
<!--              <span class="content">{{ item.content }}</span>-->
<!--              <span-->
<!--                class="thumbsUp"-->
<!--                @click="handleThumbsUp(item)"-->
<!--                :class="[{ hasThumbup: item.ifThumb }]"-->
<!--                ><i class="el-icon-thumb" aria-hidden="true"></i-->
<!--                >{{ item.thumbsUp }}</span-->
<!--              >-->
<!--              <span class="reply"-->
<!--                ><i class="el-icon-chat-dot-round" aria-hidden="true"></i-->
<!--                >回复</span-->
<!--              >-->
<!--              <div class="line"></div>-->
<!--              <span class="source">来源 : {{ item.source }}</span>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {getActivityList, getActivityPic, getMoreActivity} from '@/api/activity/frontActivity'

export default {
  data() {
    return {
      activeName: "first",
      carouselList: [],
      activityList: [],
      manuscriptTagList: [
        // { name: "浏览量", icon: "fa fa-eye ", number: 354 },
        { name: "评论", icon: "fa fa-comment", number: 122 },
        { name: "收藏", icon: "fa fa-star", number: 16 },
        { name: "点赞", icon: "fa fa-thumbs-up", number: 22 },
        // { name: "1", icon: "", number: 0 },
        // { name: "1", icon: "", number: 0 },
      ],
      commentList: [
        {
          name: "Chas神",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          content: "城堡",
          time: "2022-04-03 22:27",
          thumbsUp: 1,
          source: "浪花一朵朵~",
          ifThumb: false,
        },
        {
          name: "Chas神",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          content: "帅哥",
          time: "2022-04-03 22:27",
          thumbsUp: 1,
          source: "浪花一朵朵~",
          ifThumb: false,
        },
        {
          name: "Chas神",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          content: "啊啊啊啊 啊",
          time: "2022-04-03 22:27",
          thumbsUp: 1,
          source: "浪花一朵朵~",
          ifThumb: false,
        },
      ],
      columnTagList: [
        { name: "浏览量", icon: "fa fa-eye ", number: 1, yesterday: 0 },
        { name: "评论数", icon: "fa fa-comment", number: 122, yesterday: 0 },
        { name: "收藏数", icon: "fa fa-star", number: 16, yesterday: 0 },
        { name: "点赞数", icon: "fa fa-thumbs-up", number: 1, yesterday: 0 },
        { name: "1", icon: "", number: 0, yesterday: 0 },
        { name: "1", icon: "", number: 0, yesterday: 0 },
      ],
      rightBottom:{
        typesetImage:''
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleThumbsUp(item) {
      if (!item.ifThumb) {
        item.thumbsUp++;
        item.ifThumb = !item.ifThumb;
        //axios请求已经点赞
      } else {
        item.thumbsUp--;
        item.ifThumb = !item.ifThumb;
        //axios请求取消点赞
      }
    },
    handleRefresh() {
      alert("请求刷新数据");
      location.reload();
    },
    gotoActivity(id){
      console.log('hh')
      let routeUrl = this.$router.resolve({
        path: "/frontHome/activity",
        query: {id:id}
      });
      window.open(routeUrl .href, '_blank');
    },
    getActivityList(){
      getActivityList().then((res)=>{
        console.log('caro',res)
        this.carouselList=res.data;
        console.log(this.carouselList)
      })
    },
    getActivityPic(){
      getActivityPic().then((res)=>{
        this.rightBottom=res.data;
      })
    },
    getMoreActivity(){
      getMoreActivity().then((res)=>{
        this.activityList=res.data;
        console.log('more',res)
      })
    }
  },
  created() {
    this.getActivityList();
    this.getActivityPic();
    this.getMoreActivity();
  }
};
</script>
<style lang="scss" scoped>
$bluecolor: #00aeec;
$bColor: #fff;
a {
  text-decoration: none;
}
li {
  list-style: none;
}

#index {
  width: 100%;
}
.top {
  width: 100%;
  #carousel {
    width: 500px;
    .carousel {
      width: 500px;
      border-radius: 5px;
      cursor:pointer;
    }
    ::v-deep .el-carousel__container {
      border-radius: 10px;
      overflow: hidden;
    }
    .el-carousel__item {
      border-radius: 5px;
      .title {
        display: block;
        // width: 100%;
        text-align: center;
        position: absolute;
        bottom: 10px;
        left: 25px;
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .el-carousel__item h3 {
      color: #fff;
      font-size: 18px;
      margin: 0;
    }
  }
  .el-main {
    padding: 0px;
    padding-left: 30px;
    .activity {
      padding: 20px;
      background-color: #fff;
      margin-bottom: 20px;
      .title {
        position: relative;
        margin-bottom: 10px;
        .more {
          position: absolute;
          top: 2px;
          right: 0px;
          font-size: 14px;
          color: #999;
          letter-spacing: 0;
          text-align: right;
          line-height: 18px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      ul {
        li {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 15px;
          img {
            width: 25px;
            margin-left: 10px;
          }
          .circle {
            width: 6px;
            height: 6px;
            // line-height: 6px;
            background: #e7e7e7;
            border-radius: 50%;
            display: inline-block;
            margin-right: 10px;
          }
          .name {
            max-width: 300px;
            font-size: 14px;
            color: #212121;
            letter-spacing: 0;
            line-height: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover{
              color: #00a1d6;
            }
          }
          .takepart {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 0px;
            font-size: 12px;
            color: #757575;
            letter-spacing: 0;
            text-align: right;
            line-height: 16px;
            white-space: nowrap;
            margin-left: 5px;
          }
        }
      }
    }
    .challenge {
      height: 150px;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
  }
}
.middle {
  position: relative;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  ::v-deep .is-active,
  ::v-deep .el-tabs__active-bar,
  ::v-deep .el-tabs__item:hover {
    color: $bluecolor;
  }
  ::v-deep .el-tabs__item {
    font-size: 16px;
  }
  .refresh {
    position: absolute;
    font-size: 14px;
    top: 30px;
    right: 20px;
    color: #999;
    z-index: 2;
    &:hover {
      cursor: pointer;
    }
  }
  .manuscriptData {
    ul {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      justify-content: space-around;
      // justify-content: space-evenly;
      li {
        display: block;
        height: 80px;
        flex: 0 0 32%;
        background-color: #f5fcfe;
        border-radius: 10px;
        margin-bottom: 15px;
        .data {
          padding: 10px;
          .name {
            display: block;
            margin-bottom: 5px;
            font-family: PingFang SC, sans-serif;
            font-size: 14px;
            opacity: 0.8;
            color: #61666d;
            height: 19px;
            line-height: 19px;
            .fa {
              font-size: 18px;
              display: inline-block;
              vertical-align: top;
              margin-right: 8px;
            }
          }
          .number {
            font-weight: 800;
            font-size: 22px;
            color: $bluecolor;
          }
        }
      }
    }
  }
  .columnData {
    ul {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      justify-content: space-around;
      li {
        display: block;
        flex: 0 0 32%;
        background-color: #f5fcfe;
        border-radius: 10px;
        margin-bottom: 15px;
        .data {
          padding: 10px;
          .name {
            display: block;
            margin-bottom: 5px;
            font-family: PingFang SC, sans-serif;
            font-size: 14px;
            opacity: 0.8;
            color: #61666d;
            height: 19px;
            line-height: 19px;
          }
          .number {
            font-weight: 800;
            font-size: 22px;
            color: $bluecolor;
            padding-bottom: 10px;
          }
          .yesterday {
            display: block;
            font: {
              size: 14px;
              family: PingFang SC, sans-serif;
            }
            // opacity: 0.8;
            color: #61666d;
            i {
              color: $bluecolor;
            }
          }
        }
      }
    }
  }
}
.bottom {
  padding: 20px;
  background-color: $bColor;
  h3 {
    color: $bluecolor;
  }
  .title {
    position: relative;
    .more {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 14px;
      a {
        color: #999;
      }
    }
  }
  .commentDiv {
    padding-top: 20px;
    ul {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      justify-content: space-around;
      li {
        // background-color: $bluecolor;
        display: flex;
        flex: 0 0 32%;
        border-radius: 10px;
        margin-bottom: 15px;
        // align-items: center;
        justify-content: space-between;
        .leftbox {
          width: 50px;
          text-align: center;
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
        .rightbox {
          flex: 1;
          // background-color: blue;
          .name {
            color: #505050;
            font: {
              size: 13px;
              family: PingFangSC-Medium, sans-serif;
            }
          }
          .time {
            color: #505050;
            font: {
              size: 13px;
              family: PingFangSC-Medium, sans-serif;
            }
          }
          .thumbsUp {
            display: inline-block;
            margin-right: 30px;
            color: #505050;

            &:hover {
              cursor: pointer;
            }
            font: {
              size: 12px;
            }
            i {
              font-size: 15px;
              padding-right: 10px;
            }
          }
          .hasThumbup {
            color: $bluecolor;
          }
          .reply {
            color: #505050;
            font: {
              size: 12px;
            }
            i {
              font-size: 15px;
              padding-right: 10px;
            }
          }
          .content {
            display: block;
            padding-top: 10px;
            padding-bottom: 15px;
            color: #212121;
          }
          .line {
            border: 1px solid #f4f4f4;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          .source {
            font-size: 12px;
            color: #757575;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}

::v-deep.el-tabs__item.is-active {
  color: $bluecolor;
}
</style>
