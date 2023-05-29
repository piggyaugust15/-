<template>
  <div id="attractionsSearch">
    <div class="total">
      <div class="search">
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
              placeholder="搜索景点..."
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
          <div class="searchbox">
            <div class="title tagbox">
              <div>{{ title }}</div>
              <ul v-if="this.title === '热搜榜'" v-loading="hotsearchLoading">
                <div v-if="this.hotSearch.length >= 1" class="hotsearch">
                  <li
                      v-for="(item, index) in hotSearch"
                      :key="index"
                      class="have"
                      @click="gotoSights(item.sightsId)"
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
              <div class="attraction tagbox">
                <i class="el-icon-map-location"></i>
                <span class="tag">景点</span>
                <ul>
                  <div v-if="this.attraction.length >= 1">
                    <li
                        v-for="(item, index) in attraction"
                        :key="index"
                        class="have"
                        @click="gotoSights(item.sightsId)"
                    >
                      <span v-html="item.sightsName"></span>
                      <span class="city" v-html="item.sightsCity"></span>
                    </li>
                  </div>
                  <li v-else class="null">暂无景点</li>
                </ul>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import {hotSearch} from "@/api/search/search.js";
import {getSuggestAttraction} from "@/api/attraction/attraction";
export default {
  name: "index",
  data() {
    return {
      showPopover: false,
      activeNames: ["1"],
      title: "热搜榜",
      input: "",
      hotSearch: [],
      hotsearchLoading:true,
      suggestSearch: {},
      attraction: [],
      listInfo: [{newsTitle:''}],
    };
  },
  watch: {
    input: function () {
      if (this.input != "") {
        this.title = "搜索建议";
      } else {
        this.title = "热搜榜";
        this.attraction = [];
      }
      if(this.input.trim()!==''){
        this.suggestsearch(this.input);
      }
    },
  },
  methods:{
    gotoSights(id){
      this.$router.push({
        path: '/frontHome/attractions/attraction',
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
      getSuggestAttraction(keywords).then((response) => {
        console.log(response,'attra')
        this.attraction= response.data;
      });
    }, //搜索建议
    handleChange(val) {
      console.log(val);
    },
    clearInput() {
      this.input = "";
    },
    goToSearch() {
      if (this.input !== "") {
        this.$router.push({
          path: "/frontHome/search",
          query: { keywords: this.input },
        });
        this.$refs.input.blur();
        this.showPopover = false;
      }
    },
    go(){
      this.$emit('scroll')
    }
  },
}
</script>

<style lang="scss" scoped>
#attractionsSearch{
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
  .total{
    width: 600px;
    height: 60px;
    z-index: 300;
    position: absolute;
    left: 50%;
    bottom: 25%;
    margin-left: -300px;
    border-radius: 5px;
    .slogan{
      display: block;
      font-size: 24px;
      margin-bottom: 5px;
      color: #fff;
    }
    .search {
      width: 600px;
      height: 60px;
      z-index: 3;
      .input {
        display: flex;
        // justify-content: center;
        height: 100%;
        align-items: center;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
        transition: all 0.5s ease;
        // &:focus {
        //   opacity: 1;
        // }
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
        list-style: none;
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
  li{
    position: relative;
  }
  .city{
    position: absolute;
    right: 5%;
    color: #a3a8ad;
  }
}
.el-icon-close {
  color: #b3b2c8;
  &:hover {
    color: #262627;
  }
}
</style>