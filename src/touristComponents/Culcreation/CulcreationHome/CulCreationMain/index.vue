<template>
<!--  v-infinite-scroll="getCulHome()"
      :infinite-scroll-immediate="false"-->
  <div
      id="culcreationmain"
      style="overflow:auto;"
      class="infinite-list"

  >
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" infinite-scroll-distance="10">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
<!--    <div class="box">-->
<!--      <div class="item" v-for="(item,index) in List" :key="index">-->
<!--        <img :src="$store.state.front.url+item.culCreativityImage.split(',')[0]" alt="">-->
<!--        <span>{{item.culCreativityTitle}}</span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {getCulHome} from '@/api/cul/cul'
export default {
  name: "index",
  data(){
    return{
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
      getCulHome(this.pagination.pageNum,this.pagination.pageSize).then((res)=>{
        this.total=res.total;
        this.List=this.List.concat(res.data);
        console.log(res,'CulHome')
        this.pagination.pageNum++;
      })
    }
  },
}
</script>

<style lang="scss" scoped>
#culcreationmain{
  width: 1340px;
  margin: 0 auto;
  height: 100%;
  .box {
    width: 100%; // 默认宽度
    margin: 40px auto; // 剧中
    columns: 5; // 默认列数
    column-gap: 30px; // 列间距
    height: 100%;
    overflow:auto;
    ul{
      height: 100px;
    }
    .item {
      width: 100%;
      break-inside: avoid;
      margin-bottom: 30px;
      span {
        padding: 10px 5px 10px 5px;
        line-height: 25px;
        font: {
          size: 20px;
          weight: 700;
          family: "Noto Serif SC", serif;;
        };
      }
    }

    .item img {
      width: 100%;
    }

    .item h2 {
      padding: 8px 0;
    }
  }
  .infinite-list{
    overflow-y: scroll;
  }
}
</style>