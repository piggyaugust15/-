<template>
  <div id="articlepage">
    <div class="container">
      <div class="text">
        <div class="title">
          <h1>{{ info.articleTitle }}</h1>
        </div>
        <div class="type">
          <span
            >文章类型:
            <dict-tag
              :options="dict.type.article_type"
              :value="info.articleType"
              class="dicttag"
            ></dict-tag>
          </span>
          <span
            >文章分类:
            <dict-tag
              :options="dict.type.article_category"
              :value="info.articleCategory"
              class="dicttag"
            ></dict-tag>
          </span>
        </div>
        <a
          class="link"
          v-if="info.articleType !== '1' && info.originalUrl !== null"
          :href="info.originalUrl"
          >原创链接: <span class="blue">{{ info.originalUrl }}</span></a
        >
        <div class="time">
          <span class="create">创建于:{{ info.createTime }} </span>
          <span class="update"> 修改于:{{ info.updateTime }}</span>
        </div>
        <div class="content markdown-body" v-html="info.articleContent" ></div>
        <CommentDiv :type="2"></CommentDiv>
        <CommentList :type="2"></CommentList>
        <div class="speak"><Speak :voice=speakInfo :lang="speakTTS"></Speak></div>
      </div>
      <div class="profile">
        <div class="about">
          <h3>关于作者</h3>
        </div>
        <div class="avatar">
          <div class="img" @click="gotouser()">
            <img :src="url + user.avatar" alt="" />
          </div>
          <div class="detail">
            <div class="name">{{ user.nickName }}</div>
            <div class="intro">{{ user.intro }}</div>
          </div>
        </div>
        <div>
          <div class="userdetail">
            <div>
              <p>浏览量</p>
              <p class="number">{{ visitor.visitorView }}</p>
            </div>
            <div>
              <p>点赞数</p>
              <p class="number">{{ visitor.visitorLike }}</p>
            </div>
            <div>
              <p>文章数</p>
              <p class="number">{{ visitor.visitorArticle }}</p>
            </div>
          </div>
          <div class="userdetail">
            <div>
              <p>原创</p>
              <p class="number">{{ visitor.original }}</p>
            </div>
            <div>
              <p>订阅</p>
              <p class="number">{{ visitor.visitorSubscribe }}</p>
            </div>
            <div>
              <p>收藏</p>
              <p class="number">{{ visitor.visitorCollect }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="like" :class="{ isHide: isHide }">
        <div class="buttonList">
          <button  :class="['thumbup',info.ifLike?'active':'']" @click="handleLike()">
            <i class="el-icon-caret-top icon"></i>
            赞同
            {{ info.articleLike }}
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
          <span :class="['fav','inline',info.ifCollect?'active':'']" @click="handlefav(info.articleId)"
            ><i :class="fav.active">收藏</i></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticleDetail,
  addArticleLike,
  addArticleCollect,
  addArticleView,
  addArticleViewByAnonymous,
} from "@/api/article/article";
import { VEmojiPicker } from "v-emoji-picker";
import CommentDiv from "@/touristComponents/components/CommentDiv";
import CommentList from "@/touristComponents/components/CommentList";
import {marked} from 'marked'
import {fav} from "@/api/hot/hotSights";
import Speak from "@/components/Speak";
import {paraTranslate} from '@/api/system/translate'
export default {
  dicts: ["article_state", "article_type", "article_category"],
  data() {
    return {
      url: process.env.VUE_APP_BASE_API,
      fav:{
        active:"el-icon-star-off",
      },
      info: {},
      user: {},
      visitor: {},
      oldScrollTop: 0,
      isHide: false,
      loading: true,
      textarea: "",
      showDialog: false,
      speakTTS:'zh-CN',
      speakInfo:'',
    };
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;
      if (scrollStep > 0) {
        this.isHide = false;
      } else {
        this.isHide = true;
      }
    },
    selectEmoji(emoji) {
      // 选择emoji后调用的函数
      let input = document.getElementById("input");
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      let resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos);
      input.value = resultText;
      input.focus();
      input.selectionStart = startPos + emoji.data.length;
      input.selectionEnd = startPos + emoji.data.length;
      this.text = resultText;
    },
    submitcomment() {
      if (this.textarea == "") {
        this.$message.error("评论内容不能为空哈");
      }
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
    gotouser() {
      this.$router.push({
        path: "/frontHome/user",
        query: {
          id: this.user.userId,
        },
      });
    },
    addLike(articleId) {
      addArticleLike(articleId).then((response) => {
        this.$modal.msgSuccess(response.msg);
      });
    },
    handleLike(){
      if (this.info.ifLike) {
        this.info.articleLike--;
        this.info.ifLike=!this.info.ifLike;
        addArticleLike(this.$route.query.id).then((response) => {
          this.$modal.msgSuccess(response.msg);
        });
      } else {
        this.info.articleLike++;
        this.info.ifLike=!this.info.ifLike;
        addArticleLike(this.$route.query.id).then((response) => {
          this.$modal.msgSuccess(response.msg);
        });
      }
    },
    handlefav(articleId) {
      if (this.info.ifCollect) {
        this.fav.active = "el-icon-star-off";
        this.info.ifCollect = !this.info.ifCollect;
        addArticleCollect(this.$route.query.id).then((response) => {
          this.$modal.msgSuccess(response.msg);
        });
      } else {
        this.fav.active = "el-icon-star-on";
        this.info.ifCollect = !this.info.ifCollect;
        addArticleCollect(this.$route.query.id).then((response) => {
          this.$modal.msgSuccess(response.msg);
        });
      }
    },
    addCollect(articleId) {
      addArticleCollect(articleId).then((response) => {
        this.$modal.msgSuccess(response.msg);
      });
    },
    paraTranslate(){
      paraTranslate(2,this.$route.query.id,0).then((res)=>{
        this.info.articleContent=res.data.articleContentOUT;
        this.speakInfo=res.data.articleContentOUT;
        this.speakTTS=res.data.speakTTS;
        console.log(this.speakTTS)
        console.log('lang',res)
      })
    }
  },
  watch:{
    '$store.state.front.lang'(){
      this.paraTranslate();
    }
  },
  mounted() {
    //this.$route.query.id
    getArticleDetail(this.$route.query.id).then((response) => {
      console.log('detail',response);
      this.info = response.data;
      this.user = response.data.user;
      this.info.articleContent = marked(this.info.articleContent);
      this.visitor = response.data.visitor;
      if(this.info.ifCollect){
        this.fav.active = "el-icon-star-on";
      }
      // 如果没有登录 就不用增加浏览量
      if (this.$store.state.user.token === "") {
        addArticleView(this.info.articleId);
      } else {
        addArticleViewByAnonymous(this.info.articleId);
      }
    });
    window.addEventListener("scroll", this.handleScroll);
    this.paraTranslate();
    // if (
    //   this.$route.path == "/Attractionspage" ||
    //   this.$route.path == "/Attractionspage"
    // ) {
    // }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    VEmojiPicker,
    CommentDiv,
    CommentList,
    Speak
  },
};
</script>

<style lang="scss" scoped>
$bluecolor: #00aeec;
li {
  list-style: none;
}
#articlepage {
  padding-top: 60px;
  .container {
    position: relative;
    width: 1340px;
    margin: 0 auto;
    // background-color: red;
    display: flex;
    padding: 10px;
    .text {
      position: relative;
      padding: 10px;
      width: 1000px;
      // background-color: yellow;
      .type {
        text-align: left;
        color: rgb(111, 111, 111);
        font-size: 13px;
        padding: 5px 0px;

        .dicttag {
          display: inline-block;
          margin-right: 10px;
          color: #175199;
        }
      }
      .time {
        text-align: left;
        color: rgb(111, 111, 111);
        font-size: 13px;
        display: block;
        padding: 5px 0px;
        .create {
          margin-right: 10px;
        }
      }
      .link {
        text-align: left;
        color: rgb(111, 111, 111);
        font-size: 13px;
        display: block;
        padding: 5px 0px;
        .blue {
          color: #0066ff;
        }
      }
      .content {
        margin-top: 30px;
        padding-bottom: 45px;
      }
      .commentDiv {
        padding-top: 20px;
        .commenttitle {
          font-family: "Noto Serif SC", serif !important;
          font-weight: 700;
          font-size: 28px;
          line-height: 1;
          padding-bottom: 30px;
        }
        .mycommentbox {
          display: flex;
          .input {
            width: 650px;
          }
          button {
            flex: 1;
            margin-left: 10px;
            color: #fff;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .emoji {
          position: relative;
          .emojibanner {
            position: absolute;
            top: 25px;
            left: 0;
          }
        }
        ul {
          margin-top: 40px;
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
                width: 45px;
                height: 45px;
                border-radius: 50%;
              }
            }
            .rightbox {
              padding-top: 5px;
              padding-left: 15px;
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
      .speak{
        position: absolute;
        right: 40px;
        top: 10px;
      }
    }
    .profile {
      // width: 220px;
      // background-color: green;
      padding: 10px;
      margin-left: 10px;
      .avatar {
        width: 100%;
        display: flex;
        align-items: center;
        .img {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .detail {
          width: 220px;
          height: 60px;
          margin-left: 10px;

          .name {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .intro {
            font-size: 14px;
            -webkit-line-clamp: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .userdetail {
        width: 100%;
        display: flex;
        justify-content: space-around;
        text-align: center;
        color: #8590a6;
        .number {
          color: black;
          font: {
            weight: 700;
          }
        }
      }
    }
    .like {
      position: fixed;
      height: 45px;
      width: 1000px;
      bottom: 0;
      padding: 10px;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
      .buttonList {
        display: flex;
        align-items: center;
        color: #8590a6;
        button {
          text-align: center;
          display: inline-block;
          height: 30px;
          border: none;
          cursor: pointer;
          border-radius: 3px;
          color: #056de8;
          margin-right: 10px;
          &:hover {
            background-color: #dae9fc;
          }
        }
        span {
          margin-right: 10px;
        }
        .inline{
          cursor: pointer;
          transition: all ease .3s;
          padding: 3px 5px 3px 5px;
          border-radius: 8px;
          &:hover {
            color: #606a7e;
          }
        }
        .active{
          background-color: #00aeec;
          color: #fff;
        }
      }
    }
    .isHide {
      bottom: -60px;
      background-color: rgba(255, 255, 255, 0.294);
    }
    .content {
      text-indent: 2em;
    }
  }
}
</style>