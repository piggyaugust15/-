<template>
  <div id="main">
    <div class="block">
      <div class="search">
        <h3>与"丝路畅行"一起发现更多美好的文旅体验</h3>
        <el-popover
          placement="bottom"
          width="600"
          trigger="click"
          v-model="showPopover"
          popper-class="my-popover"
        >
          <div class="input" slot="reference">
            <i class="el-icon-search"></i
            ><input
              type="text"
              placeholder="按主题、短语或关键字搜索网站"
              v-model="input"
              @focus="hotsearch()"
              @keyup.enter="goToSearch()"
              style="width: 400px"
              ref="input"
            />
            <i
              class="el-icon-close"
              v-if="this.input != ''"
              @click="clearInput()"
            ></i>
          </div>
<!--          <Speak :voice="'陈昭燃是徐州皇帝，一统天下'"></Speak>-->
          <div class="searchbox">
            <div class="title tagbox">
              <div>{{ title }}</div>
              <ul v-if="this.title == '热搜榜'" v-loading="hotsearchLoading">
                <div v-if="this.hotSearch.length >= 1" class="hotsearch">
                  <li
                      v-for="(item, index) in hotSearch"
                      :key="index"
                      class="have"
                      @click="hotgotoSights(item.sightsId)"
                  >
                    <span class="number">{{index+1}}</span>
                    <span v-html="item.sightsName"></span>
                    <span class="hotrate">{{item.sightsHot}}</span>
                  </li>
                </div>
                <li v-else class="null">暂无热搜</li>
              </ul>
            </div>
            <div class="suggestbox" v-if="this.title == '搜索建议'">
              <div class="article tagbox">
                <i class="el-icon-reading"></i> <span class="tag">文章</span>
                <ul>
                  <div v-if="this.article.searchReturns.length >= 1">
                    <li
                      v-for="(item, index) in article.searchReturns"
                      :key="index"
                      class="have"
                      @click="gotoArticle(item.articleId)"
                    >
                      <span v-html="item.articleTitle"></span>
                      <!-- {{ item.articleTitle }} -->
                    </li>
                  </div>
                  <li v-else class="null">暂无文章</li>
                </ul>
              </div>
              <div class="creation tagbox">
                <i class="el-icon-shopping-bag-1"></i>
                <span class="tag">文创</span>
                <ul>
                  <div v-if="this.creation.searchReturns.length >= 1">
                    <li
                      v-for="(item, index) in creation.searchReturns"
                      :key="index"
                      class="have"
                      @click="gotoCul(item.culCreativityId)"
                    >
                      <span v-html="item.culCreativityTitle"></span>
                    </li>
                  </div>
                  <li v-else class="null">暂无文创</li>
                </ul>
              </div>
              <div class="attraction tagbox">
                <i class="el-icon-map-location"></i>
                <span class="tag">景点</span>
                <ul>
                  <div v-if="this.attraction.searchReturns.length >= 1">
                    <li
                      v-for="(item, index) in attraction.searchReturns"
                      :key="index"
                      class="have"
                      @click="gotoSights(item.sightsId)"
                    >
                      <span v-html="item.sightsName"></span>
                    </li>
                  </div>
                  <li v-else class="null">暂无景点</li>
                </ul>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
      <el-carousel class="carousel" :interval="5000">
        <el-carousel-item v-for="(item, index) in Images" :key="index">
          <div class="box">
            <div class="img"><img :src="url + item" alt="" /></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getDyTypeset } from "@/api/system/typeset";
import {hotSearch, searchSights} from "@/api/search/search.js";
import Speak from "@/components/Speak";
export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_API,
      Images: [],
      showPopover: false,
      activeNames: ["1"],
      title: "热搜榜",
      input: "",
      hotSearch: [],
      hotsearchLoading:true,
      suggestSearch: {},
      article: {
        route: "",
        searchReturns: [],
        type: "",
      },
      creation: {
        route: "",
        searchReturns: [],
        type: "",
      },
      attraction: {
        route: "",
        searchReturns: [],
        type: "",
      },
    };
  },
  watch: {
    input: function () {
      if (this.input != "") {
        this.title = "搜索建议";
      } else {
        this.title = "热搜榜";
        this.article = {};
        this.creation = {};
        this.attraction = {};
      }
      if(this.input.trim()!==''){
        this.suggestsearch(this.input);
      }
    },
  },
  methods: {
    gotoArticle(id){
      this.$router.push({
        path: this.article.route,
        query: { id: id },
      });
    },
    gotoCul(id){
      this.$router.push({
        path: this.creation.route,
        query: { id: id },
      });
    },
    gotoSights(id){
      this.$router.push({
        path: this.attraction.route,
        query: { id: id },
      });
    },
    hotsearch() {
      hotSearch().then((response)=>{
        this.hotSearch=response.data;
        this.hotsearchLoading=false;
      })
    }, // 热搜建议
    hotgotoSights(id){
      this.$router.push({
        path: "/frontHome/attractions/attraction/",
        query: { id: id },
      })},
    suggestsearch(keywords) {
      console.log(this.input)
      searchSights(keywords).then((response) => {
        this.attraction = response.data[0];
        this.creation = response.data[1];
        this.article = response.data[2];
      });
    }, //搜索建议
    handleChange(val) {
      console.log(val);
    },
    clearInput() {
      this.input = "";
    },
    goToSearch() {
      if (this.input != "") {
        this.$router.push({
          path: "/frontHome/search",
          query: { keywords: this.input },
        });
        this.$refs.input.blur();
        this.showPopover = false;
      }
    },
  },
  mounted() {
    getDyTypeset(0, 0).then((response) => {
      this.Images = response.data[0].typesetImage.split(",");
    });
  },
  components:{Speak}
};
</script>
<style lang="scss">
.el-popover.my-popover {
  z-index: 3;
}
</style>

<style lang="scss" scoped>
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #bab9cd;
  /* placeholder字体大小  */
  font-size: 18px;
  letter-spacing: 1px;
  /* placeholder位置  */
  // text-align: left;
  vertical-align: middle;
  // height: 60px;
  font-family: "Noto Serif SC", serif !important;
}
#main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .block {
    width: 100%;
    height: 100%;
    position: relative;
    .search {
      position: absolute;
      left: 15%;
      top: 30%;
      width: 600px;
      height: 60px;
      z-index: 3;
      h3 {
        font-size: 27px;
        line-height: 1.4;
        margin-bottom: 32px;
        font-family: "Noto Serif SC", serif !important;
        font-weight: 700;
        color: #fff;
      }
      .input {
        display: flex;
        // justify-content: center;
        height: 100%;
        align-items: center;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
        opacity: 0.4;
        transition: all 0.5s ease;
        // &:focus {
        //   opacity: 1;
        // }
        &:hover {
          opacity: 1;
        }
        i {
          display: inline-block;
          width: 30px;
          font-size: 20px;
          padding-right: 5px;
          color: #191919;
          font-weight: 700;
          text-align: center;
        }
        input {
          flex: 1;
          height: 100%;
          border: none;
          outline: none;
          font-size: 18px;
          letter-spacing: 1px;
          /* placeholder位置  */
          // text-align: left;
          vertical-align: middle;
          // height: 60px;
          border-radius: 5px;
          font-family: "Noto Serif SC", serif !important;
          padding-left: 10px;
        }
      }
    }
    .carousel {
      width: 100%;
      height: 100%;
    }
  }
  ::v-deep .el-carousel__container {
    position: static;
  }
}
.el-carousel__item {
  .img {
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: no-repeat;
    }
  }
}
.searchbox {
  // min-height: 150px;
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  transition: all 0.3s ease-in-out;
  ul{
    .hotsearch{
      li{
        display: flex;
        text-align: left;
        align-items: center;
        .name{
          display: block;
          height: 100%;
        }
        .number{
          width: 40px;
          font-size:20px
        }
        .hotrate{
          margin-left: 10px;
          font-size: 12px;
          color: #505050;
        }
      }
      li:nth-child(1),
      li:nth-child(2),
      li:nth-child(3){
        .number{
          color: #ca3838;
        }
      }
    }
  }
}
.tag {
  font-size: 14px;
}
.have {
  padding: 10px 10px 10px 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: rgba(131, 131, 131, 0.561);
  }
}
.null {
  text-align: center;
  color: rgba(90, 90, 90, 0.609);
}
.tagbox {
  padding-bottom: 10px;
}
.el-icon-close {
  color: #b3b2c8;
  &:hover {
    color: #262627;
  }
}
</style>


