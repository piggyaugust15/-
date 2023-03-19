<template>
  <div class="container">
    <div class="header">
      <h3>景点</h3>
    </div>
    <!-- <el-skeleton style="width: 100%" :loading="loading" animated :count="3">
      <template slot="template">
        <div>
          <el-skeleton-item
            variant="image"
            style="width: 400px; height: 267px; display: block"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </div>
      </template>
      <template> </template>
    </el-skeleton> -->
    <div class="card">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img">
          <img
            :src="$store.state.front.url + item.typesetImage.split(',')[0]"
            alt=""
          />
        </div>
        <div class="subbox">
          <div class="subcontent">{{ item.subcontent }}</div>
          <h3 class="title">
            {{ item.typesetText }}
          </h3>
          <p class="intro">
            {{ item.typesetIntroduction }}
          </p>
        </div>
        <div class="tagbox">
          <li class="tag">Live updates</li>
          <li class="tag">Live updates</li>
        </div>
      </div>
    </div>
    <button>继续阅读</button>
  </div>
</template>

<script>
import { getHomeThreeSights } from "@/api/system/typeset.js";
export default {
  data() {
    return {
      loading: true,
      list: [],
      // lists: [
      //   {
      //     imgUrl:
      //       "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      //     name: "鹿",
      //   },
      //   {
      //     imgUrl:
      //       "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
      //     name: "马",
      //   },
      //   {
      //     imgUrl:
      //       "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      //     name: "山狮",
      //   },
      // ],
    };
  },
  methods: {},
  mounted() {
    getHomeThreeSights().then((response) => {
      // setTimeout(() => (this.loading = false), 2000);
      this.list = response.data;
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
$Font: "Noto Serif SC", serif;
li {
  list-style: none;
}
.container {
  max-width: 1340px;
  padding: 0px 40px 70px 40px;
  // background-color: red;
  margin: 0 auto;
  .header {
    position: relative;
    padding-top: 5px;
    h3 {
      font-family: "Noto Serif SC", serif !important;
      font-size: 40px;
      line-height: 1.2;
      font-weight: 700;
      color: #191919;
    }
  }
  .header::before {
    background: #409eff;
    position: absolute;
    content: "";
    display: block;
    width: 56px;
    height: 4px;
    top: 0;
    left: 0;
  }
  ::v-deep.el-skeleton {
    display: flex;
    justify-content: space-around;
  }
  .card {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    min-width: 100%;
    .item {
      box-sizing: border-box;
      width: 31.9%;
      // padding: 0 13px;
      height: 770px;
      margin-bottom: 24px;
      min-width: 380px;
      box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
      transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
      cursor: pointer;
      &:hover {
        box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
        transform: translate(0, -5px);
        transition-delay: 0s !important;
      }
      .img {
        width: 100%;
        // vertical-align: top;
        height: 410px;
        img {
          display: block;
          width: 100%;
          object-fit: cover;
          height: 100%;
        }
      }
      .subbox {
        height: 180px;
        padding: 0 16px;
        padding-bottom: 30px;
        border-bottom: 1px solid #e8e8e8;
        .subcontent {
          height: 28px;
          color: #757575;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          font-family: $Font;
          font-size: 24px;
          margin-bottom: 16px;
          margin-top: 5px;
          margin-bottom: 10px;
          font-weight: 700;
          height: 52.8px;
        }
        .intro {
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          color: #757575;
          font-size: 14px;
          font-family: "open_sans", sans-serif !important;
        }
      }
      .tagbox {
        margin-top: 20px;
        padding: 0 16px;
        .tag {
          display: inline-block;
          // display: flex;
          // width: auto;
          vertical-align: middle;
          height: 35px;
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 12px;
          border: 1px solid #999999;
          background: #fff;
          color: #4d4d4d;
          border-radius: 4px;
          margin-right: 8px;
          font-family: "open_sans", sans-serif;
        }
      }
    }
  }
  button {
    display: block;
    margin: 0 auto;
    width: 384px;
    height: 54px;
    border: 1px solid #409eff;
    // background-color: #409eff;
    border-radius: 5px;
    margin-top: 20px;
    color: #409eff;
    background-color: #ffffff;
    font-size: 16px;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>