<template>
  <div id="manuscriptlist" v-loading="loading">
    <el-empty
      description="一个稿件都没有，请换个筛选条件(''▔□▔)"
      v-if="List.length == 0"
    ></el-empty>
    <ul v-else>
      <li v-for="(item, index) in List" :key="index">
        <div class="img">
          <img :src="$store.state.front.url + item.articleCover.split(',')[0]" alt="" />
        </div>
        <div class="rightbox">
          <span class="title">
            {{ item.articleTitle }}
          </span>
          <span class="time">{{ item.createTime }}</span>
          <div class="tags">
            <span class="view"
              ><i class="el-icon-s-data"></i>{{ item.articleView }}</span
            >
            <span class="comment" v-if="item.articleComment"
              ><i class="el-icon-chat-dot-round"></i
              >{{ item.articleComment }}</span
            >
            <span class="thumbsup"
              ><i class="el-icon-thumb"></i>{{ item.articleLike }}</span
            >
            <span class="favourite"
              ><i class="el-icon-star-off"></i>{{ item.articleCollect }}</span
            >
          </div>
          <div class="btn">
            <el-button
              icon="el-icon-edit"
              class="edit"
              @click="gotoEdit(item.articleId)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="handleConfirm([item.articleId])"
            >
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </div>
      </li>
    </ul>
    <Pagination
        :total="pagination.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        :auto-scroll="false"
        @pagination="getInfo"
    ></Pagination>
  </div>
</template>

<script>
import { deleteUserManuscript } from "@/api/article/article.js";
import deletePopover from "../deletePopover/index";
import { getUsersArticleByWays } from "@/api/article/article.js";
import { getDraft } from "@/api/article/article.js";
export default {
  data() {
    return {
      loading: true,
      List: [],
      pagination:{
        total:0,
      },
      queryParams:{
        pageNum:1,
        pageSize:10,
      }
    };
  },
  components: { deletePopover },
  methods: {
    handleConfirm([item]) {
      this.loading = true;
      deleteUserManuscript([item]).then((response) => {
        console.log(response);
        this.getInfo();
      });
    },
    getInfo() {
      this.loading=true;
      if (this.type === 3) {
        getDraft().then((response) => {
          console.log(response);
          this.List = response.rows;
          this.loading = false;
        });
      } else {
        getUsersArticleByWays(this.type,this.queryParams).then((response) => {
          console.log('article',response,)
          this.List = response.rows;
          this.pagination.total=response.total;
          // this.$emit("get", this.List.length);
          this.loading = false;
        });
      }
    },
    gotoEdit(id) {
      this.$router.push({
        path: "/frontHome/Creation/submission",
        query: {
          type: "edit",
          id: id,
          arg:'article',
        },
      });
    },
  },
  mounted() {
    this.getInfo();
  },
  props: ["type"],
};
</script>

<style lang="scss" scoped>
$font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial,
  "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
#manuscriptlist{
  padding-bottom: 10px;
  ul {
    li {
      display: flex;
      padding-bottom: 20px;
      padding-top: 20px;
      border-bottom: 1px solid #e7e7e7;
      cursor: pointer;
      transition: all 0.3s ease-in;
      &:hover {
        background-color: #fafafa;
      }
      .img {
        width: 154px;
        height: 96px;
        border-radius: 10px;
        padding-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightbox {
        position: relative;
        flex: 1;
        .title {
          display: block;
          font-size: 16px;
          color: #212121;
          padding-bottom: 15px;
          font-family: $font;
        }
        .time {
          display: block;
          font-size: 14px;
          color: #505050;
          font-family: $font;
          padding-bottom: 20px;
        }
        .tags {
          span {
            padding-right: 20px;
            font-family: $font;
            font-size: 12px;
            color: #99a2aa;
            i {
              padding-right: 5px;
            }
          }
        }
        .btn {
          position: absolute;
          right: 20px;
          top: 40px;
          .edit {
            margin-right: 10px;
          }
        }
      }
    }
  }
}

</style>
