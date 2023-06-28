<template>
  <div id="CommentList">
    <ul v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="index" class="Commentli">
        <div class="content">
          <div class="left_box">
            <div>
              <el-avatar
                :src="$store.state.front.url + item.user.avatar"
              ></el-avatar>
            </div>
          </div>
          <div class="right_box">
            <div class="mainBody">
              <span class="name">{{ item.user.nickName }}</span>
              <div class="text" v-html="item.commentContent">
              </div>
              <div class="bottom_div">
                <span class="time">{{ item.createTime }}</span>
                <span class="ip">IP属地: {{ item.commentIp }}</span>
                <div class="right">
                  <span class="reply" @click="reply(index)">回复</span>
                  <span class="secondComment" @click="opendialog(item)"
                    >查看对话</span
                  >
                  <span class="tipOff" @click="handleTipOff(item)"
                    ><i class="el-icon-warning" aria-hidden="true"></i
                    >&nbsp;&nbsp;举报</span
                  >
                  <span
                    class="like"
                    @click="handleLike(item)"
                    :class="[{ hasLiked: item.hasliked }]"
                    ><i class="el-icon-thumb" aria-hidden="true"></i
                    >&nbsp;&nbsp;{{ item.commentLike }}</span
                  >
                </div>
              </div>
            </div>
            <div class="replybox" v-if="index === isActive">
              <input
                type="textarea"
                v-model="item.content"
                :placeholder="'回复 ' + item.user.nickName"
                :id="index"
                @keyup.enter="submitReply(item)"
              />
              <button class="replybtn" @click="submitReply(item)">发布</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <el-empty description="暂时还没有评论哦~" class="empty"></el-empty>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getInfo"
      :auto-scroll="false"
    />
    <el-dialog
      title="评论回复"
      :visible.sync="dialogVisible"
      width="40%"
      class="dialog"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <div v-if="secondComment.length > 0" v-loading="dialogLoading" class="commentBox" id="second">
        <li
          v-for="(item, index) in secondComment"
          :key="index"
          class="Commentli"
        >
          <div class="content">
            <div class="left_box">
              <div>
                <el-avatar
                  :src="$store.state.front.url + item.user.avatar"
                ></el-avatar>
              </div>
            </div>
            <div class="right_box">
              <div class="mainBody">
                <span class="name"
                  >{{ item.user.nickName }}
                  <i class="el-icon-caret-right"> {{ item.fatherName }}</i>
                </span>
                <div class="text" v-html="item.commentContent">

                </div>
                <div class="bottom_div">
                  <span class="time">{{ item.createTime }}</span>
                  <span class="ip">IP属地: {{ item.commentIp }}</span>
                  <span class="tipOff" @click="handleTipOff(item)"
                    ><i class="el-icon-warning" aria-hidden="true"></i
                    >&nbsp;&nbsp;举报</span
                  >
                  <span
                    class="like"
                    @click="handleLike(item)"
                    :class="[{ hasLiked: item.hasliked }]"
                    ><i class="el-icon-thumb" aria-hidden="true"></i
                    >&nbsp;&nbsp;{{ item.commentLike }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
      <el-empty description="暂无回复哦^-^" v-else></el-empty>
      <pagination
          v-show="secondTotal > 0"
          :total="secondTotal"
          :page.sync="secondCommentParams.pageNum"
          :limit.sync="secondCommentParams.pageSize"
          :auto-scroll="false"
          @pagination="getSecondComment()"
      />
    </el-dialog>
  </div>
</template>

<script>
// import { VEmojiPicker } from "v-emoji-picker";

import { getParentComment } from "@/api/system/comment.js";
import { getSecondComment } from "@/api/system/comment.js";
import { submitComment } from "@/api/system/comment.js";
import {emoji} from "emoji";
export default {
  name: "CommentList",
  data() {
    return {
      dialogLoading: true,
      showDialog: false,
      isActive: -1,
      dialogVisible: false,
      total: 0,
      secondTotal:0,
      currentItem:{},
      queryParams:{
        pageNum: 1,
        pageSize: 10,
        commentSource: this.type,
        id: this.$route.query.id,
      },
      secondCommentParams:{
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      replyList: [],
      secondComment: [],
    };
  },
  methods: {
    SecondScroll(){
      document.getElementById("second").scrollIntoView({behavior:'smooth'});
    },
    handleTipOff(item) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: "确定举报吗？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: 举报 " + action,
        });
      });
    },
    handleLike(item) {
      if (!item.hasliked) {
        item.like++;
        item.hasliked = !item.hasliked;
        this.$message("点赞成功");
      } else {
        item.like--;
        item.hasliked = !item.hasliked;
        this.$message("取消点赞");
      }
    },
    getInfo() {
      getParentComment(this.queryParams).then((response) => {
        this.total = response.total;
        this.list=response.rows;
      });
    },
    getSecondComment(){
      getSecondComment({
        pageNum: this.secondCommentParams.pageNum,
        pageSize: this.secondCommentParams.pageSize,
        commentId:this.currentItem.commentId
      }).then((response) => {
        this.secondTotal=response.total
        this.secondComment = response.rows;
        this.dialogLoading = false;
        this.SecondScroll();
      });
    },
    opendialog(item) {
      this.dialogVisible = true;
      this.currentItem=item;
      this.getSecondComment(item);
    },
    reply(index) {
      this.isActive = index;
    },
    submitReply(item) {
      let commentVo = {
        parentId: item.commentId,
        objectId: item.user.userId,
        commentSource: item.commentSource,
        id: item.id,
        commentContent: item.content,
      };
      submitComment(commentVo).then((response) => {
        this.$modal.msgSuccess(response.msg);
        item.content = "";
      });
    },
    handleClose(done) {
      done();
      this.dialogLoading = true;
      let _this = this;
      setTimeout(() => {
        _this.secondComment = {};
      }, 500);
    },
  },
  mounted() {
    this.getInfo();
  },
  beforeDestroy() {
    window.removeEventListener("click", () => {}, true);
  },
  props: ["type"],
};
</script>

<style lang="scss" scoped>
$bcolor: #00aeec;
li {
  list-style: none;
}
#CommentList {
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  .Commentli {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .content {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      .left_box {
        display: inline-block;
        width: 10%;
        height: 100%;
        text-align: center;
        .name {
          display: block;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .right_box {
        float: right;
        width: 90%;
        height: 100%;
        position: relative;
        .rating {
          font-size: 12px;
          line-height: 20px;
          height: 20px;
          margin-top: 13px;
        }
        .rating_img {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        .rating_img::after {
          content: "";
          position: absolute;
          width: 55px;
          height: 20px;
          left: 20px;
          top: 3px;
          background-color: #fff2bf;
          z-index: -1;
        }
        .mainBody {
          padding-left: 15px;
          margin-bottom: 10px;
        }
        .text {
          margin-bottom: 10px;
          margin-top: 15px;
          font-size: 14px;
        }
        .bottom_div {
          margin-top: 10px;
          font-size: 12px;
          .right {
            float: right;
            display: flex;
            .reply {
              // float: right;
              color: #8590a6;
              cursor: pointer;
              display: none;
            }
            .secondComment {
              // float: right;
              color: #8590a6;
              cursor: pointer;
            }
            .like {
              // float: right;

              &:hover {
                color: $bcolor;
                cursor: pointer;
              }
            }
            .hasLiked {
              color: $bcolor;
            }

            .tipOff {
              // float: right;
              &:hover {
                color: $bcolor;
                cursor: pointer;
              }
            }
          }
          span {
            margin-right: 10px;
          }
        }
        .replybox {
          position: relative;
          height: 80px;
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          border-radius: 4px;
          border: 1px solid rgb(235, 235, 235);
          // flex: 1 1 auto;
          word-break: break-word;
          padding: 8px 12px;
          input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #ebebeb;
            padding-bottom: 5px;
            outline: none;
            user-select: text;
            white-space: nowrap;
            overflow-wrap: break-word;
            font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue,
              PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
              WenQuanYi Micro Hei, sans-serif;
            font-size: 15px;
          }
          .replybtn{
            position: absolute;
            right: 10px;
            bottom: 5px;
            width: 70px;
            height: 30px;
            background-color: #7fd6f5;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            &:hover{
              background-color: #00aeec;
            }
          }
          .emojibanner {
            position: absolute;
            // bottom: 0;
            z-index: 1;
          }
        }
      }
    }

    &:hover .content .right_box .bottom_div .reply {
      display: block;
    }
  }
  ::v-deep .pagination-container {
    padding: 0px;
  }
  .empty {
    display: block;
  }
  ::v-deep.el-empty__image {
    text-align: center;
    margin: 0 auto;
  }

}
.dialog{
  .Commentli {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .content {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      .left_box {
        display: inline-block;
        width: 10%;
        height: 100%;
        text-align: center;
        .name {
          display: block;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .right_box {
        float: right;
        width: 90%;
        height: 100%;
        position: relative;
        .rating {
          font-size: 12px;
          line-height: 20px;
          height: 20px;
          margin-top: 13px;
        }
        .rating_img {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        .rating_img::after {
          content: "";
          position: absolute;
          width: 55px;
          height: 20px;
          left: 20px;
          top: 3px;
          background-color: #fff2bf;
          z-index: -1;
        }
        .mainBody {
          padding-left: 15px;
          margin-bottom: 10px;
        }
        .text {
          margin-bottom: 10px;
          margin-top: 15px;
          font-size: 14px;
        }
        .bottom_div {
          margin-top: 10px;
          font-size: 12px;
          .right {
            float: right;
            display: flex;
            .reply {
              // float: right;
              color: #8590a6;
              cursor: pointer;
              display: none;
            }
            .secondComment {
              // float: right;
              color: #8590a6;
              cursor: pointer;
            }
            .like {
              // float: right;

              &:hover {
                color: $bcolor;
                cursor: pointer;
              }
            }
            .hasLiked {
              color: $bcolor;
            }

            .tipOff {
              // float: right;
              &:hover {
                color: $bcolor;
                cursor: pointer;
              }
            }
          }
          span {
            margin-right: 10px;
          }
        }
        .replybox {
          position: relative;
          height: 80px;
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          border-radius: 4px;
          border: 1px solid rgb(235, 235, 235);
          // flex: 1 1 auto;
          word-break: break-word;
          padding: 8px 12px;
          input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #ebebeb;
            padding-bottom: 5px;
            outline: none;
            user-select: text;
            white-space: nowrap;
            overflow-wrap: break-word;
            font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue,
            PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
            WenQuanYi Micro Hei, sans-serif;
            font-size: 15px;
          }
          .replybtn{
            position: absolute;
            right: 10px;
            bottom: 5px;
            width: 70px;
            height: 30px;
            background-color: #7fd6f5;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            &:hover{
              background-color: #00aeec;
            }
          }
          .emojibanner {
            position: absolute;
            // bottom: 0;
            z-index: 1;
          }
        }
      }
    }}
}
</style>
