<template>
  <div class="block">
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
          <p class="info">
            {{ info.culCreativityIntro }}
          </p>
        </div>
        <div class="text">
          <h2 class="productiontitle">关于</h2>
          <p class="text">
            {{info.culCreativityContent}}
          </p>
        </div>
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
import { getCuldetail } from "@/api/sights/cul_creativity.js";
import { submitComment } from "@/api/system/comment.js";
import CommentDiv from "@/touristComponents/components/CommentDiv";
export default {
  data() {
    return {
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
  methods: {
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
          console.log(res);
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
  },
  components: {
    VEmojiPicker,
    CommentList,
    CommentDiv,
  },
  mounted() {
    getCuldetail(this.$route.query.id).then((res) => {
      console.log(res);
      this.info = res.data;
      this.imgList = this.info.culCreativityImage.split(",");
    });
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
.block {
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
      width: 800px;
      .top {
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
          line-height: 1;
          padding-top: 10px;
        }
        padding-bottom: 20px;
        border-bottom: 1px solid #979797;
        margin-bottom: 40px;
      }
      .text {
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