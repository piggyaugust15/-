<template>
  <div id="Newspage">
    <el-container>
      <el-header>
        <ComponentTitle>
          <template v-slot:Chinese>快讯</template>
          <template v-slot:English>News</template>
        </ComponentTitle>
      </el-header>
      <Crumbs></Crumbs>
      <el-main>
        <Maintext
          class="maintext"
          :newsInformation="newsInformation"
          :similarNews="similarNews"
        ></Maintext>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Maintext from "../Maintext";
  import Crumbs from "../Crumbs";
  import ComponentTitle from "../../components/ComponentsTitle";
  import {getDetail,getSimilarNews} from"@/api/home/news"
  export default {
    name: "Newspage",
    data() {
      return {
        newsInformation:{},
        similarNews:[]
      };
    },
    components:{
      Maintext,
      Crumbs,
      ComponentTitle
    },
    mounted() {
      getDetail(this.$route.query.id).then((res)=>{
        this.newsInformation=res.data;
      })
      getSimilarNews(this.$route.query.id).then((res)=>{
        this.similarNews=res.data;
        console.log(res,'news')
      })
    }

  }
</script>

<style lang="scss" scoped>
#Newspage{
  width: 1340px;
  margin: 0 auto;
  padding-top: 80px;
}
</style>
