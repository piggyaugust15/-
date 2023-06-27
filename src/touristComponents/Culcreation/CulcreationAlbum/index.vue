<template>
  <div id="culcreationalbum">
    <div class="topImg">
      <img :src="$store.state.front.url+info.albumImage"  alt="">
    </div>
    <div class="main">
      <h2>{{info.albumName}}</h2>
      <div class="intro">
        {{info.albumIntroduce}}
      </div>
      <div class="box" >
        <div class="item" v-for="(item,index) in List" :key="index" @click="$router.push({path:'/frontHome/culcreation',query:{id:item.culCreativityId}})">
          <img :src="$store.state.front.url+item.culCreativityImage.split(',')[0]" alt="">
          <span class="text">{{item.culCreativityTitle}}</span>
        </div>
      </div>
      <el-empty description="这里空空如也哦" v-if="this.List.length===0"></el-empty>
      <div class="pagination">
        <!--      在pagination外层嵌套个div，使div textalign center 即可居中pagination-->
        <Pagination
            :total="total"
            :page.sync="pagination.pageNum"
            :limit.sync="pagination.pageSize"
            :auto-scroll="false"
            @pagination="getCulAlbumList"
            layout="sizes,total,jumper,prev,pager,next"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getCulHome, getCulAlbumList, getCulAlbumInfo} from "@/api/cul/cul";

export default {
  name: "index",
  data(){
    return{
      info:{},
      total:0,
      List:[],
      pagination:{
        pageSize:10,
        pageNum:1,
      }
    }
  },
  methods:{
    getCulAlbumList(){
      getCulAlbumList(this.pagination,this.$route.query.id).then((res)=>{
        this.total=res.total;
        this.List=res.rows;
      })
    },
    getCulAlbumInfo(){
      getCulAlbumInfo(this.$route.query.id).then(res=>{
        this.info=res.data;
        console.log(res,'list')
      })
    }
  },
  mounted() {
    this.getCulAlbumList();
    this.getCulAlbumInfo();
  }
}
</script>

<style lang="scss" scoped>
#culcreationalbum{
  background-color: #edeae7;
  .topImg{
    width: 100vw;
    height: 400px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .main{
    width: 1340px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 20px;
    h2{
      margin-top: 50px;
      margin-bottom: 50px;
      font-size: 36px;
      color: #c1925b;
    }
    .intro{
      background-color: #f6f5f3;
      padding: 30px 40px;
      border-radius: 30px;
      text-align: left;
      line-height: 30px;
      font-size: 15px;
      color: #333;
    }
    .box {
      width: 100%; // 默认宽度
      margin: 40px auto; // 剧中
      columns: 5; // 默认列数
      column-gap: 30px; // 列间距
      ul{
        height: calc(100% - 70px);
      }
      .item {
        position: relative;
        width: 100%;
        break-inside: avoid;
        padding-bottom: 10px;
        margin-bottom: 30px;
        //padding: 10px;
        span {
          display: block;
          padding: 10px 5px 10px 5px;
          line-height: 25px;
          font: {
            size: 20px;
            weight: 700;
            family: "Noto Serif SC", serif;;
          };
        }
        img {
          width: 100%;
        }
        h2 {
          padding: 8px 0;
        }
        &:hover{
          cursor:pointer;
          box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 2px 3px rgba(0,0,0,.18);
          transform: scale(1.1);
          transition: all 500ms ease 0s;
        }
      }
    }
  }
}
::v-deep.pagination-container{
  background-color: transparent;
}
</style>