<template>
  <div class="container">
    <div class="header">
      <h3>探索丝路荟萃推荐文创名单</h3>
    </div>
    <div class="card">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img">
          <img
            :src="$store.state.front.url + item.typesetImage.split(',')[0]"
            alt=""
          />
        </div>
        <div class="subbox">
          <div class="subcontent"></div>
          <h3 class="title">
            {{ item.typesetText }}
          </h3>
          <p class="intro">
            {{ item.typesetIntroduction }}
          </p>
          <p class="tag">$ · {{ item.remark }}</p>
        </div>
        <!-- <div class="like" :class="[{ haslike: item.islike }]">
          <i class="el-icon-message-solid icon" @click="like(item)"></i>
        </div> -->
      </div>
    </div>
    <button><i class="el-icon-s-promotion"></i> 寻找更多文创作品</button>
  </div>
</template>
  
<script>
import { getHomeThreeCulCreation } from "@/api/system/typeset.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    like(item) {
      if (item.islike == 0) {
        item.islike = 1;
      } else {
        item.islike = 0;
      }
    },
  },
  mounted() {
    getHomeThreeCulCreation().then((response) => {
      this.list = response.data;
      console.log("222", response);
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
  padding: 0px 40px 100px 40px;
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
      height: 640px;
      margin-bottom: 24px;
      min-width: 380px;
      box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
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
        padding: 0 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e8e8;
        .subcontent {
          height: 10px;
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
          font-size: 20px;
          //   margin-bottom: 16px;
          margin-top: 5px;
          //   margin-bottom: 10px;
          font-weight: 700;
          // height: 25.8px;
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
        .tag {
          font-family: "open_sans", sans-serif !important;
          font-weight: 400;
          font-size: 12px;
          line-height: 1;
        }
      }
      .like {
        position: relative;
        color: #6e6e70;
        transition: all 0.2s ease;
        // &:hover {
        //   color: #4b4b4d;
        // }
        .icon {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          cursor: pointer;
          //   transition: all 0.2s ease;
        }
      }
      .haslike {
        color: #79bbff;
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
    font-size: 16px;
    transition: all 0.2s ease;
    background-color: #ffffff;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>