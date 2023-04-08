<template>
  <div id="commentdiv">
    <div class="commentDiv">
      <h2 class="commenttitle">评论</h2>
      <div class="mycommentbox">
        <div>
          <el-input
            id="input"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.commentContent"
            class="input"
            :autosize="{ minRows: 3, maxRows: 4 }"
            resize="none"
            ref="input"
          >
          </el-input>
        </div>
        <button @click="submitcomment()">发表评论</button>
      </div>
      <div class="emoji" >
        <el-col>
          <el-popover
              placement="auto bottom"
              trigger="hover"
              :popper-options="{ boundariesElement: 'body', removeOnDestroy: true }"
          >
            <div >
              <VEmojiPicker  @select="selectEmoji" />
            </div>
            <el-button slot="reference" size="mini" type="text">添加表情</el-button>
          </el-popover>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import { submitComment } from "@/api/system/comment.js";
export default {
  data() {
    return {
      input:'',
      showDialog: false,
      imgList: [],
      ruleForm: {
        commentContent: "",
        id: this.$route.query.id,
        commentSource: this.type,
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
      this.ruleForm.commentContent = resultText;
    },
    submitcomment() {
      if (this.textarea === "") {
        this.$message.error("评论内容不能为空哈");
      } else {
        submitComment(this.ruleForm).then((res) => {
          console.log(this.ruleForm)
          console.log(res);
          if (res.code === 200) {
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
        commentSource: this.type,
        parentId: -1,
        objectId: "",
      };
    },
  },
  components: {
    VEmojiPicker,
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {}, true);
  },
  props: ["type"],
};
</script>
<style lang="scss" scoped>
$bluecolor: #00aeec;
#commentdiv {
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
        background-color: #7fd6f5;
        border: none;
        border-radius: 5px;
        color: #fff;
        &:hover {
          cursor: pointer;
          background-color: #00aeec;
        }
      }
    }
    .emoji-picker{
      height: 200px;
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
</style>