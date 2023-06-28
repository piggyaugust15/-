<template>
  <div id="culcreationmain">
    <div class="box" v-loading="totalLoading">
      <div class="item" v-for="(item,index) in List" :key="index" @click="$router.push({path:'/frontHome/culcreation',query:{id:item.culCreativityId}})">
          <img :src="$store.state.front.url+item.culCreativityImage.split(',')[0]" alt="">
          <span class="text">{{item.culCreativityTitle}}</span>
      </div>
    </div>
    <div class="pagination">
<!--      在pagination外层嵌套个div，使div textalign center 即可居中pagination-->
      <Pagination
          :total="total"
          :page.sync="pagination.pageNum"
          :limit.sync="pagination.pageSize"
          :auto-scroll="false"
          @pagination="getCulHome"
          layout="sizes,total,jumper,prev,pager,next"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import {getCulHome} from '@/api/cul/cul'
export default {
  name: "index",
  data(){
    return{
      totalLoading:true,
      count:0,
      total:0,
      List:[],
      pagination:{
        pageSize:10,
        pageNum:1,
      }
    }
  },
  methods:{
    load () {
      this.count += 2
    },
    getCulHome(){
      this.totalLoading=true;
      getCulHome(this.pagination).then((res)=>{
        this.total=res.total;
        this.List=res.rows;
        console.log(res,'CulHome')
        this.totalLoading=false;
      })
    }
  },
  mounted() {
    this.getCulHome();
  }
}
</script>

<style lang="scss" scoped>
#culcreationmain{
  width: 1340px;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 20px;
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
  .pagination{
    text-align: center;
  }
}
</style>