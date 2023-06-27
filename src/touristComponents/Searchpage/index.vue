<template>
  <div id="searchpage">
    <div class="main">
      <div class="list" v-loading="loading">
        <ul v-if="list.length > 0">
          <li
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="infobox">
              <div class="top">
                <div class="tag article" v-if="item.multipleType == 'ARTICLE'">
                  漫记
                </div>
                <div
                  class="tag creation"
                  v-if="item.multipleType == 'CREATION'"
                >
                  文创
                </div>
                <div class="tag sights" v-if="item.multipleType == 'SIGHTS'">
                  景点
                </div>
                <span class="title" v-html="item.multipleName" @click="gotoarticle(item)"></span>
              </div>
              <div class="box">
                <div class="leftbox">
                  <img :src="url + item.multipleImage.split(',')[0]" alt="" />
<!--                  .split(',')[0]-->
                </div>
                <div class="rightbox">
                  <span v-html="item.multipleContent" class="content"> </span>
                  <!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index
                作为 path 进行路由跳转 -->
                </div>
              </div>
              <div class="buttonList">
                <button class="thumbup">
                  <i class="el-icon-caret-top icon"></i> 赞同
                  {{ item.multipleLike }}
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
        </ul>
        <el-empty
          description="一个搜索结果都没有，请换个搜一搜试试看呢(''▔□▔)"
          v-else
        ></el-empty>
      </div>
      <div class="right">
        <h3>热榜</h3>
        <div class="hotlist">
          <ul>
            <li>
              <div class="number">1</div>
              <div class="title">
                如何看待人大代表建议「按家庭人均收入改革现行个税法，利于养老与多孩家庭」？
              </div>
            </li>
            <li>
              <div class="number">2</div>
              <div class="title">
                全国政协委员杨成长认为「应打破用『985 、 211
                大学排序』作为硬手段的招聘方式」，如何看待此事？
              </div>
            </li>
            <li>
              <div class="number">3</div>
              <div class="title">
                董明珠称「退休前不会卖股票，鼓励员工『砸锅卖铁』
                都要买格力股票，买不了我兜底」，如何看待这一发言？
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="search"
      /> -->
    </div>
  </div>
</template>

<script>
import { searchAll } from "@/api/search/search.js";
export default {
  data() {
    return {
      loading: true,
      total: 0,
      // queryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   keywords: "",
      // },
      url: process.env.VUE_APP_BASE_API,
      list: [],
    };
  },
  methods: {
    // search() {
    //   //pagnition use
    //   searchAll(this.queryParams).then((response) => {
    //     this.list = response.rows;
    //     this.total = response.total;
    //     console.log(response);
    //   });
    // },
    search(value) {
      searchAll(value).then((response) => {
        this.list = response.data;
        // this.total = response.total;
        this.loading = false;
        console.log('list',response);
      });
    },
    gotoarticle(item) {
      this.$router.push({
        path: item.multipleRoute,
        query: { id: item.multipleItemId },
      });
    },
  },
  watch:{
    $route(to, from,next) {
      console.log(this.$route.query.keywords)
      if (this.$route.query.keywords) {
        this.search(this.$route.query.keywords);
      }
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to)
  //   console.info("==当前路由id==" + this.$route.query.keywords);
  //   if (this.$route.query.keywords) {
  //     console.info("加载页面数据");
  //   }
  //   next();
  // },
  mounted() {},
  created() {
    //this.queryParams.keywords = this.$route.query.keywords;
    this.search(this.$route.query.keywords);
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
#searchpage {
  width: 100%;
  padding-top: 60px;
  .main {
    position: relative;
    display: flex;
    width: 1340px;
    margin: 0 auto;
    padding: 15px;
    // background-color: red;
    .list {
      width: 1000px;
      ul {
        li {
          border-bottom: 1px solid #d6d6d6;
          padding: 5px;
          padding-bottom: 15px;
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
                text-align: left;
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
      }
    }
    .right {
      flex: 1;
      // background-color: #056de8;
      height: 100%;
      padding: 10px;
      // text-align: center;
      .hotlist {
        li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .number {
            padding: 5px;
            margin-right: 15px;
            font-size: 18px;
            font-weight: 700;
          }
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>