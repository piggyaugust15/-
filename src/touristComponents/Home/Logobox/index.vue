<template>
  <div id="logobox">
    <div class="img">
      <img :src="$store.state.front.url + info.typesetImage" alt="" />
    </div>
    <div class="text">
      <h1>{{ info.typesetIntroduction }}</h1>
      <span>{{ info.typesetText }}</span>
      <button @click="$router.push({path:'/frontHome/map'})">
        关于"丝路畅行"指南
      </button>
    </div>
  </div>
</template>

<script>
import { getDyTypeset } from "@/api/system/typeset";
export default {
  data() {
    return {
      Images: [],
      info: {},
    };
  },
  mounted() {
    getDyTypeset(0, 2).then((response) => {
      this.info = response.data[0];
      this.Images = response.data[0].typesetImage.split(",");
    });
  },
};
</script>

<style lang="scss" scoped>
#logobox {
  position: relative;
  max-width: 1260px;
  padding: 0px 40px 70px 40px;
  height: 300px;
  margin: 0 auto;
  border: 5px solid #409eff;
  margin-bottom: 150px;
  .img {
    position: absolute;
    width: 300px;
    height: 400px;
    left: 5%;
    // background-color: #409eff;
    top: -20%;
    // border: 5px solid #409eff;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .text {
    position: absolute;
    left: 37%;
    top: 20%;
    h1 {
      font-size: 40px;
      font-weight: 700;
      font-family: "Noto Serif SC", serif !important;
      color: #191919;
      margin-bottom: 16px;
    }
    span {
      //   display: block;
      font-size: 20px;
      line-height: 1.5;
      color: #757575;
      //   padding: 24px 0;
      font-family: "open_sans", sans-serif !important;
    }
    button {
      display: block;
      width: 384px;
      height: 54px;
      border: none;
      background-color: #409eff;
      border-radius: 5px;
      margin-top: 20px;
      color: #fff;
      font-size: 16px;
      transition: all 0.2s ease;
      cursor: pointer;
      &:hover {
        background-color: #3481cd;
      }
    }
  }
}
</style>