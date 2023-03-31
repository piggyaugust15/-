<template>
  <div id="bottom">
    <div class="relatedLink">
      <ul>
        <span>链接</span>
        <li v-for="item in link" :key="item.footerId">
          <div v-if="item.flag === 'Y'">
            <!--            内部链接-->
            <router-link
              v-if="item.footerShow === 'inner'"
              :to="item.footerRoute"
            >
              {{ item.footerLabel }}
            </router-link>
            <!--            内部内容-->
            <div
              v-if="item.footerShow === 'content'"
              @click="getFooterContent(item.footerContent)"
            >
              {{ item.footerLabel }}
            </div>
            <!--          外部链接-->
            <a :href="item.footerSrc" v-if="item.footerShow === 'outer'">{{
              item.footerLabel
            }}</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="community">
      <ul>
        <span>社区</span>
        <li v-for="item in community" :key="item.footerId">
          {{ item.footerLabel }}
        </li>
      </ul>
    </div>
    <div class="logobox">
      <div>
        <img src="@/assets/images/Logo3.png" alt="">
      </div>
<!--      <router-link to="/Home">Silk Road Collection</router-link>-->
      <div class="rights">© 2022 Travel The Silk Road.CN All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
import { getDyFooter } from "@/api/system/footer";
export default {
  data() {
    return {
      link: null,
      community: null,
      dialogVisible: true,
    };
  },
  methods: {
    getFooterInformation() {
      getDyFooter().then((response) => {
        console.log(response);
        this.link = response.link;
        this.community = response.community;
      });
    },
    getFooterContent(msg) {
      console.log(msg);
    },
  },
  mounted() {
    this.getFooterInformation();
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #333333;
  transition: 0.3s all ease-in-out;
}
a:hover {
  color: rgb(0, 123, 255);
}
#bottom {
  height: 200px;
  width: 1340px;
  padding-bottom: 45px;
  margin: 0 auto;
  padding: 0px 40px 100px 40px;
  font-family: "Noto Serif SC", serif !important;
}
#bottom .relatedLink {
  margin-right: 100px;
}
#bottom .relatedLink,
#bottom .community {
  display: inline-block;
}
#bottom .relatedLink ul li,
#bottom .community ul li {
  padding-bottom: 15px;
  font-size: 14px;
  list-style: none;
  color: #333333;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
}
#bottom .relatedLink ul span,
#bottom .community ul span {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 15px;
}
#bottom .logobox {
  float: right;
  margin-top: 16px;
  img{
    width: 455px;
    height: 117.5px;
  }
  .rights{
    margin-top: 15px  ;
    text-align: center;
  }
}
#bottom .logobox a {
  text-align: right;
  font-size: 25px;
  display: block;
  margin-bottom: 15px;
}
</style>
