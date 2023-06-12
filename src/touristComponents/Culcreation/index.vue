<template>
  <div id="block">
    <div class="header">
      <ul>
        <li v-for="(item, index) in imgList" :key="index" class="imgli">
          <img :src="$store.state.front.url + item" alt="" />
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="left">
        <div class="top">
          <p class="name">{{ info.culCreativityTitle }}</p>
          <span class="type">文创标签:
          <div class="tagItem" v-for="(item,index) in info.culCreativityTags">{{item}}</div>
          </span>
          <p class="info">
            {{ info.culCreativityIntro }}
          </p>
          <div v-if="this.info">
            <div class="fav" v-if="this.info.culCreativityCollection">
              <img  src="@/assets/images/fav-on.svg" alt="" @click="handleFav">
              <span v-if="this.info.culCreativityCollection">已收藏</span>
            </div>
            <div class="fav" v-else>
              <img src="@/assets/images/fav-off.svg" alt="" @click="handleFav">
              <span>加入收藏</span>
            </div>
          </div>
        </div>
        <div class="text">
          <h2 class="productiontitle">关于</h2>
          <p class="text" v-html="info.culCreativityContent">
<!--            {{}}-->
          </p>
        </div>
        <div class="speak"><Speak :voice=speakInfo :lang="speakTTS"></Speak></div>
        <CommentDiv :type="1"></CommentDiv>
        <CommentList :type="1"></CommentList>
      </div>
      <div class="right">
        <p>即刻参与购买</p>
        <button>购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import CommentList from "@/touristComponents/components/CommentList";
import { getCuldetail,culViewByUser,culFav } from "@/api/sights/cul_creativity.js";
import { submitComment } from "@/api/system/comment.js";
import CommentDiv from "@/touristComponents/components/CommentDiv";
import Speak from "@/components/Speak";
import {paraTranslate} from "@/api/system/translate";
export default {
  data() {
    return {
      fav:'@/assets/images/fav-off.svg',
      speakTTS:'zh-CN',
      speakInfo:'',
      info: {},
      loading: true,
      showDialog: false,
      imgList: [],
      ruleForm: {
        commentContent: "",
        id: this.$route.query.id,
        commentSource: "1",
        parentId: -1,
        objectId: "",
      },
    };
  },
  watch:{
    '$store.state.front.lang'(){
      this.paraTranslate();
    }
  },
  methods: {
    handleFav(){
      culFav(this.$route.query.id).then((res)=>{
        this.info.culCreativityCollection=!this.info.culCreativityCollection
        this.$message.success(res.msg);
      })
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
      } else {
        submitComment(this.ruleForm).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "评论成功，待管理员审核~",
              type: "success",
            });
            this.resetRuleform();
          } else {
            this.$message.err("评论失败，再试试吧>...<");
          }
        });
      }
    },
    resetRuleform() {
      this.ruleForm = {
        commentContent: "",
        id: this.$route.query.id,
        commentSource: "1",
        parentId: -1,
        objectId: "",
      };
    },
    paraTranslate(){
      paraTranslate(1,this.$route.query.id,1).then((res)=>{
        this.info.culCreativityContent=res.data.culCreativityContentOUT;
        this.speakInfo=res.data.culCreativityContentOUT;
        this.speakTTS=res.data.speakTTS;
      })
    }
  },
  components: {
    VEmojiPicker,
    CommentList,
    CommentDiv,
    Speak
  },
  mounted() {
    culViewByUser(this.$route.query.id);
    getCuldetail(this.$route.query.id).then((res) => {
      console.log('culcrea  ',res);
      this.info = res.data;
      this.imgList = this.info.culCreativityImage.split(",");
    });
    // this.paraTranslate();
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {}, true);
  },
};
</script>

<style lang="scss" scoped>
$bluecolor: #00aeec;
li {
  list-style: none;
}
p {
  font-family: "AvenirNext-DemiBold", "Helvetica Neue Medium", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: normal;
  color: #191919;
}
#block {
  width: 100%;
  padding-top: 60px;
  padding-bottom: 20px;
  .header {
    width: 100%;
    ul {
      width: 100vw;
      display: flex;
      align-items: center;
      .imgli {
        width: 500px;
        height: 500px;
        flex: auto;
        border: 1px solid #fff;
        &:hover {
          cursor: pointer;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .main {
    padding-top: 30px;
    width: 1340px;
    margin: 0 auto;
    position: relative;
    display: flex;
    .left {
      position: relative;
      width: 800px;
      .top {
        .type{
          text-align: left;
          color: rgb(111, 111, 111);
          font-size: 13px;
          padding: 5px 0px;
        }
        .tagItem{
          display: inline-block;
          padding: 1px 5px;
          background-color: #ebf2f7;
          margin-right: 5px;
          border-radius: 3px;
          text-align: center;
          height: 20px;
          color: rgb(111, 111, 111);
          font-size: 13px;
          //padding: 5px 0px;
          text-align: left;
        }
        .name {
          font-family: "Noto Serif SC", serif !important;
          font-weight: 700;
          font-size: 36px;
          margin-bottom: 13px;
          line-height: 1;
        }
        .info {
          font-style: normal;
          font-stretch: normal;
          line-height: 30px;
          text-indent: 2em;
          padding-top: 10px;
          font-size: 17px;
        }
        .fav{
          display: flex;
          align-items: center;

          img{
            width: 30px;
            height: 26px;
            margin-right: 10px;
            cursor: pointer;
            transition: all ease-in-out .3s;
          }
        }
        padding-bottom: 20px;
        border-bottom: 1px solid #979797;
        margin-bottom: 40px;
      }
      .text {
        .text{
          text-indent: 2em;
          line-height: 30px;
          font-size: 17px;
          //img{
          //  width: 100%;
          //}
        }
        .productiontitle {
          font-family: "Noto Serif SC", serif !important;
          font-weight: 700;
          font-size: 28px;
          line-height: 1;
          padding-bottom: 30px;
        }
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
            &:hover {
              cursor: pointer;
            }
          }
        }
        .emoji {
          z-index: 1;
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
        top:25px;
        right: 10px;
      }
    }
    .right {
      width: 300px;
      height: 150px;
      position: sticky;
      top: 150px;
      margin-left: 50px;
      box-shadow: 0 9px 17px 0 rgb(0 0 0 / 10%);
      // background-color: #d8d8d8;
      padding: 15px;
      margin-bottom: 32px;
      text-align: left;
      p {
        font-family: "Noto Serif SC", serif !important;
        font-weight: 700;
      }
      button {
        font-family: "open_sans", sans-serif !important;
        font-weight: 400;
        padding: 16px 24px;
        border-radius: 4px;
        line-height: 1.3;
        font-size: 16px;
        font-family: "AvenirNext-DemiBold", "Helvetica Neue Medium", sans-serif;
        border: 1px solid transparent;
        text-decoration: none;
        display: block;
        width: 100%;
        transition: all ease-in 0.3s;
        background-color: #00aeec;
        margin-top: 30px;
        color: #fff;
        &:hover {
          cursor: pointer;
          background-color: #0092c7;
        }
      }
    }
  }
}
</style>