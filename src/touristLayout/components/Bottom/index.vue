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
                class="item"
              v-if="item.footerShow === 'content'"
              @click="getFooterContent(item.footerContent,item.footerLabel)"
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
<!--          {{ item.footerLabel }}-->
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
                class="item"
                v-if="item.footerShow === 'content'"
                @click="getFooterContent(item.footerContent,item.footerLabel)"
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
    <div class="logobox">
      <div>
        <img src="@/assets/images/LogoGreen.png" alt="">
      </div>
<!--      <router-link to="/Home">Silk Road Collection</router-link>-->
      <div class="rights">Copyright © 2023 Travelling On the Silk Road All Rights Reserved</div>
    </div>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        class="dialog"
        :append-to-body="true"
        width="1000px"
        :before-close="handleClose">
      <span v-html="footerInfo"></span>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDyFooter } from "@/api/system/footer";
export default {
  data() {
    return {
      link: null,
      community: null,
      dialogVisible: false,
      footerInfo:'',
      title:'',
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
    getFooterContent(msg,title) {
      this.title='';
      this.footerInfo='';
      this.footerInfo=msg;
      this.title=title;
      this.dialogVisible=true;
    },
    handleClose(done) {
      done();
    }
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
  .relatedLink {
    margin-right: 100px;
    .item{
      transition: 0.3s all ease-in-out;
      &:hover {
        cursor: pointer;
        color: rgb(0, 123, 255);
      }
    }
  }
  .relatedLink, .community {
    display: inline-block;
    ul {
      span {
        display: block;
        font-size: 20px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 15px;
      }
      li {
      padding-bottom: 15px;
      font-size: 14px;
      list-style: none;
      color: #333333;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", SimSun, sans-serif;
    }
    }
    .item{
      transition: 0.3s all ease-in-out;
      &:hover {
        cursor: pointer;
        color: rgb(0, 123, 255);
      }
    }
  }
  .logobox {
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
    a {
      text-align: right;
      font-size: 25px;
      display: block;
      margin-bottom: 15px;
    }
  }
}
.dialog{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 80%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      // 下边设置字体，我的需求是黑底白字
      //line-height: 30px;
      padding: 0 15px;
    }
  }
}
</style>
