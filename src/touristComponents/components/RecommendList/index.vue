<template>
  <div id="RecommendList">
    <ul v-if="this.type == 'SimilarAttractions'">
      <li v-for="item in SimilarAttractionsList" :key="item.sightsId" @click="gotoSights(item.sightsId)">
        <div class="img_div">
          <img :src="$store.state.front.url+item.sightsImage.split(',')[0]" alt="" />
        </div>
        <div class="Info">
          <span class="name">{{ item.sightsName }}</span>
          <span>{{item.sightsEng}}</span>
          <span class="bottom">景点评分 {{ item.sightsScore }}</span>
        </div>
      </li>
    </ul>
    <ul v-else-if="this.type == 'RecommendAttractions'">
      <li v-for="item in RecommendAttractionsList" :key="item.id" @click="gotoSights(item.sightsId)">
        <div class="img_div">
          <img :src="$store.state.front.url+item.sightsImage.split(',')[0]" alt="" />
        </div>
        <div class="Info">
          <span class="name">{{ item.sightsName }}</span>
          <span>{{item.sightsEng}}</span>
          <span class="bottom">景点评分 {{ item.sightsScore }}</span>
        </div>
      </li>
    </ul>
    <div class="link">
      <el-link type="primary">
        <i class="fa fa-eye" aria-hidden="true"></i> 更多</el-link
      >
    </div>
  </div>
</template>

<script>
import {getSimilarSight,getOnlineRecommendation,getCommonRecommendation} from '@/api/hot/hotSights'
  export default {
    name: "RecommendList",
    data() {
      return {
        RecommendAttractionsList: [
          {
            sightsImage:''
          }
        ],
        SimilarAttractionsList: [
          {
            sightsImage:''
          }
        ],
      };
    },
    props: ["type"],
    methods:{
      gotoSights(id){
        this.$router.push({
          path:'/frontHome/attractions/attraction',query:{
          id:id
          }})
      },
      getSimilarSight(){
        getSimilarSight(this.$route.query.id).then((res)=>{
          this.SimilarAttractionsList=res.data;
        })
      },
      getOnlineRecommendation(){
        getOnlineRecommendation().then((res)=>{
          this.RecommendAttractionsList=res.data;
        })
      },
      getCommonRecommendation(){
        getCommonRecommendation().then((res)=>{
          this.RecommendAttractionsList=res.data;
        })
      },
      getRecommendation(){
        if(this.$store.state.user.token){
          this.getOnlineRecommendation();
        }else{
          this.getCommonRecommendation()
        }
      }
    },
    mounted(){
      this.getSimilarSight();
      this.getRecommendation()
      // this.getCommonRecommendation()
    }
  };
</script>

<style scoped>
  @import "~@/assets/styles/RecommendList.css";
</style>
