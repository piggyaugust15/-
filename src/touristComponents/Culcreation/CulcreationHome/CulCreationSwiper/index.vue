<template>
  <div id="culcreationswiper" v-loading="totalLoading">
    <el-carousel :interval="4000" type="card" height="400px" :intervals="6000">
      <el-carousel-item v-for="(item,index) in List" :key="index" class="item" >
        <div class="total" @click="gotoAlbum(item.albumId)">
          <img :src="$store.state.front.url+item.albumImage.split(',')[0]" alt="">
          <div class="intro">{{item.albumIntroduce}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {getCulHomeSwiper} from "@/api/cul/cul";

export default {
  name: "index",
  data(){
    return{
      List:[],
      totalLoading:true,
    }
  },
  methods:{
    gotoAlbum(item){
      this.$router.push({path:'/frontHome/culcreationAlbum',query:{id:item}})
    }
  },
  mounted() {
    getCulHomeSwiper().then(res=>{
      this.List=res.data;
      this.totalLoading=false;
    })
  }
}
</script>

<style lang="scss" scoped>
#culcreationswiper{
  width: 1340px;
  margin: 0 auto;
  margin-top: 80px;
  height: 500px;
  .item{
    .total{
      width: 100%;
      height: 100%;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .intro{
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        background-color: rgba(255,255,255,.9);
        border:rgba(255,255,255,.9) ;
        display: block;
        padding: 0 50px;
        font-weight: bold;
        font-size: 20px;
        line-height: 50px;
        color: #2a514d;
      }
    }
  }
}
.el-carousel__item{
  //overflow: hidden;
  border-radius: 15px;
  border:rgba(255,255,255,.9) ;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

</style>