<template>
  <div class="content">
    <h1>欢迎来到‘丝路畅行’特色文化旅游信息服务平台！</h1>
    <img src="@/assets/images/LogoGreen.png" alt="">
  </div>
</template>

<script>
  import { getAd,listAd ,getHistHotAd,getRecentAd} from "@/api/home/ad";
  import getkafka from "@/api/home/news"
  import Xiao from "./xxx";

  export default {
    name: "Index",
    data() {
      return {
        adList: [],
        total: 0,
        url: process.env.VUE_APP_BASE_API,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          adTitle: null,
          adType: null,
          adHits: null,
          adKey: null,
          adTeam: null,
          adSponsor: null,
          beginTime: null,
          overTime: null,
          topFlag: null,
          delFlag: null,
        }
      };
    },
    created() {
      this.getList()
    },

    methods:{
      getList() {
        getHistHotAd().then(response=>{
        })
        getRecentAd().then(response=>{
        })
        // listAd(this.queryParams).then(response => {
        //   console.log(response)
        //   this.adList = response.rows;
        //   this.total = response.total;
        // });
      },
    }

  };
</script>
<style lang="scss" scoped>
h1{
  text-align: center;
}
img{
  width: 80%;
  text-align: center;
  margin-left: 10%;
  margin-top: 5%;
}
</style>




