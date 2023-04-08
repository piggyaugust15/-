<template>
<div class="block">
  <el-tabs v-model="activeName" >
    <el-tab-pane :label="'文章 '" name="first">
      <div v-if="this.article.length>0">
        <li v-for="(item, index) in article" :key="index" >
          <div class="infobox">
            <div class="top" @click="gotoarticle(item)">
              <div class="tag article">文章</div>
              <span class="title">{{ item.articleTitle }}</span>
            </div>
            <div class="box">
              <div class="leftbox">
                <img
                    :src="$store.state.front.url + item.articleCover"
                    alt=""
                />
              </div>
              <div class="rightbox">
                        <span v-html="item.articleContent" class="content">
                        </span>
              </div>
            </div>
            <div class="buttonList">
              <button class="thumbup">
                <i class="el-icon-caret-top icon"></i> 赞同
                {{ item.articleLike }}
              </button>
              <button class="thumbdown">
                <i class="el-icon-caret-bottom icon"></i>
              </button>
              <span class="comment inline"
              ><i class="el-icon-chat-line-round"></i> 评论</span
              >
              <span class="share inline"
              ><i class="el-icon-s-promotion"></i> 分享</span
              >
              <span class="fav inline"
              ><i class="el-icon-star-off"> 收藏</i></span
              >
            </div>
          </div>
        </li>
      </div>
      <el-empty description="这里暂时还没有收藏的文章哦"  v-else ></el-empty>
    </el-tab-pane>
    <el-tab-pane :label="'文创 '" name="second">
      <div v-if="this.cul.length>0">
        <li v-for="(item, index) in cul" :key="index" >
          <div class="infobox">
            <div class="top" @click="gotocreation(item)">
              <div class="tag creation">文创</div>
              <span class="title">{{ item.culCreativityTitle }}</span>
            </div>
            <div class="box">
              <div class="leftbox">
                <img
                    :src="$store.state.front.url + item.culCreativityImage.split(',')[0]"
                    alt=""
                />
              </div>
              <div class="rightbox">
                        <span v-html="item.culCreativityIntro" class="content">
                        </span>
              </div>
            </div>
            <div class="buttonList">
              <button class="thumbup">
                <i class="el-icon-caret-top icon"></i> 赞同
                {{ item.culCreativityLike }}
              </button>
              <button class="thumbdown">
                <i class="el-icon-caret-bottom icon"></i>
              </button>
              <div class="comment inline"
              ><i class="el-icon-chat-line-round"></i> 评论</div
              >
              <div class="share inline"
              ><i class="el-icon-s-promotion"></i> 分享</div
              >
              <div class="fav inline"
              ><i class="el-icon-star-off"> 收藏</i></div
              >
            </div>
          </div>
        </li>
      </div>
      <el-empty description="这里暂时还没有收藏的文创哦"  v-else ></el-empty>
    </el-tab-pane>
    <el-tab-pane :label="'景点 '" name="third">
      <div v-if="this.sights.length>0">
        <li v-for="(item, index) in sights" :key="index" >
          <div class="infobox">
            <div class="top" @click="gotosights(item)">
              <div class="tag sights">景点</div>
              <span class="title">{{ item.sightsName }}</span>
            </div>
            <div class="box">
              <div class="leftbox">
                <img
                    :src="$store.state.front.url + item.sightsImage.split(',')[0]"
                    alt=""
                />
              </div>
              <div class="rightbox">
                        <span v-html="item.sightsIntro" class="content">
                        </span>
              </div>
            </div>
            <div class="buttonList">
              <button class="thumbup">
                <i class="el-icon-caret-top icon"></i> 赞同
                {{ item.sightsLike }}
              </button>
              <button class="thumbdown">
                <i class="el-icon-caret-bottom icon"></i>
              </button>
              <span class="comment inline"
              ><i class="el-icon-chat-line-round"></i> 评论</span
              >
              <span class="share inline"
              ><i class="el-icon-s-promotion"></i> 分享</span
              >
              <span class="fav inline"
              ><i class="el-icon-star-off"> 收藏</i></span
              >
            </div>
          </div>
        </li>
      </div>
      <el-empty description="这里暂时还没有收藏的景点哦"  v-else ></el-empty>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import {getFavSights} from '@/api/sights/sights'
import {getFavArticle} from '@/api/article/article'
import {getFavCul} from '@/api/sights/cul_creativity'
import {getAttractionFav} from '@/api/attraction/attraction'
export default {
  name: "index",
  data() {
    return {
      article: [],
      cul:[],
      sights:[],
      activeName: "first",
    };
  },
  methods:{
    gotoarticle(item){
      this.$router.push({
        path:"/frontHome/articlepage",
        query:{
          id:item.articleId
        }
      });
    },
    gotocreation(item) {
      this.$router.push({
        path:"/frontHome/culcreation/",
        query:{
          id:item.culCreativityId
        }
      });
    },
    gotosights(item){
      this.$router.push({
        path:"/frontHome/attractions/attraction",
        query:{
          id:item.sightsId
        }
      });
    },
    getFavSights(){
      getAttractionFav().then((res)=>{
        console.log('si',res)
        this.sights=res.rows;
      })
    },
    getFavArticle(){
      getFavArticle(this.$route.query.id).then((res)=>{
        this.article=res.rows;
      })
    },
    getFavCul(){
      getFavCul().then((res)=>{
        this.cul=res.rows;
      })
    }
  },
  mounted() {
    this.getFavSights();
    this.getFavArticle();
    this.getFavCul();
  }
}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
}
.block {
  ::v-deep.el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    position: relative;
    width: 300px;
    margin: 0 auto;
  }
  ::v-deep.el-tabs__nav-wrap::after {
    content: none;
  }
  ::v-deep.el-tabs__active-bar{
    background-color: transparent;
  }
  ::v-deep.el-tabs__item.is-active{
    //padding: 0 10px 0 10px;
    //padding: 0px  ;
    border-radius: 10px  ;
    text-align: center;
    background-color: #dfe4ed;
  }
  ::v-deep.el-tabs__item{
    //padding: 0 10px 0 10px ;
    //padding: 10px  ;
    text-align: center;
    transition: all ease-in-out .1s;
  }
  ::v-deep.el-tabs__nav{
    display: flex;
  }
  //::v-deep.el-tabs--top .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--bottom .el-tabs__item.is-bottom:last-child{
  //  padding: 0;
  //}
  ::v-deep.el-tabs--top .el-tabs__item.is-top:nth-child(2),{
    padding: 0 20px;
  }
  ::v-deep.el-tabs--top .el-tabs__item.is-top:last-child,{
    padding: 0 20px;
  }
}
li {
  border-bottom: 1px solid #d6d6d6;
  padding: 5px;
  padding-bottom: 15px;
  cursor: pointer;
  .infobox {
    cursor: pointer;
    .top {
      display: flex;
      align-items: center;
      padding: 10px 0px 10px 0px;
      .tag {
        display: inline-block;
        width: 34px;
        height: 20px;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        margin-right: 5px;
      }
      .article {
        background-color: #1e90ff;
      }
      .creation {
        background-color: #f08080;
      }
      .sights {
        background-color: #67c23a;
      }
      .title {
        display: inline-block;
        font-size: 25px;
        transition: all 0.1s ease-in-out;
        font-weight: 600;
      }
    }
    .box {
      display: flex;
      margin-bottom: 15px;
      height: 130px;
      overflow: hidden;
      .leftbox {
        width: 210px;
        height: 130px;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .rightbox {
        flex: 1;
        word-break: break-word;
        line-height: 1.6;
        white-space: normal;
        .content {
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow-y: hidden;
          line-height: 30px;
        }
      }
    }
    .buttonList {
      button {
        text-align: center;
        display: inline-block;
        height: 30px;
        border: none;
        cursor: pointer;
        border-radius: 3px;
        color: #056de8;
        background-color: #e6f0fd;
        &:hover {
          background-color: #dae9fc;
        }
      }
      .inline {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        color: #8590a6;
        &:hover {
          color: #606a7e;
        }
      }
      .thumbup {
        display: flex;
        display: inline-block;
        justify-content: center;
        align-items: center;
        width: 100px;
        margin-right: 5px;
        .icon {
          font-size: 17px;
        }
      }
      .thumbdown {
        width: 30px;
        margin-right: 15px;
      }
    }
  }
  .box:hover {
    + .top {
      .title {
        color: #175199;
      }
    }
  }
}
</style>