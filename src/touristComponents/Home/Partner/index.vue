<template>
  <div class="container">
    <div class="header">
      <h3>预期品牌合作伙伴</h3>
    </div>
    <div class="piclist">
      <li v-for="(item, index) in list" :key="index">
        <a :href="item.partnerRoute" target="_blank">
          <div class="pic">
            <img
              :src="$store.state.front.url + item.pertnerLogo.split(',')[0]"
              alt=""
            />
          </div>
          <div class="text">{{ item.partnerIntro }}</div></a
        >
      </li>
    </div>
<!--    <button>合作伙伴</button>-->
  </div>
</template>
  
  <script>
import { getPartnerByRandom } from "@/api/system/partner.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    getPartnerByRandom().then((response) => {
      this.list = response.data;
      console.log(response);
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
  .piclist {
    display: flex;
    justify-content: space-around;
    li {
      display: inline-block;
      .pic {
        width: 160px;
        height: 160px;
        //border: 1px solid #a1a1a1;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .text {
        max-width: 160px;
        margin-top: 15px;
        text-align: center;
        font-family: "Noto Serif SC", serif !important;
        font-weight: 700;
        font-size: 20px;
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
    background-color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>