<template>
  <div id="side">
    <div>
      <span class="title">丝绸之路专栏</span>
      <div class="block">
        <el-carousel trigger="click" height="300px" :interval="5000">
          <el-carousel-item v-for="(item,index) in silk" :key="index">
            <div @click="goto(item.newsId)">
              <div class="img">
                <img :src="$store.state.front.url+item.imageId.split(',')[0]" alt="">
              </div>
              <div class="text">{{item.newsTitle}}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="hot">
      <span class="title">社会热点</span>
      <div @click="goto(hot[0].newsId)" class="hotblock">
        <div class="img">
          <img :src="$store.state.front.url+hot[0].imageId.split(',')[0]" alt="">
        </div>
        <div class="text">
          {{hot[0].newsTitle}}
        </div>
      </div>
    </div>
<!--    <div class="policy">-->
<!--      <span class="title">政策法规</span>-->
<!--      <div class="img">-->
<!--        <img :src="$store.state.front.url+policy[0].imageId.split(',')[0]" alt="">-->
<!--      </div>-->
<!--      <div class="text">-->
<!--        {{hot[0].newsTitle}}-->
<!--      </div>-->
<!--    </div>-->

    <div class="political">
      <span class="title">时政专栏</span>
      <ul>
        <li v-for="(item,index) in political" :key="index" @click="goto(item.newsId)">
          {{  parseTime(item.createTime,'{m}')}}月
          {{ parseTime(item.createTime,'{d}') }}日
          {{item.newsTitle}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getColumn} from '@/api/home/news'
export default {
  name: "side",
  data(){
    return{
      silk:[],
      political:[],
      hot:[{imageId:''}],
      policy:[{imageId:''}]
    }
  },
  methods:{
    goto(id){
      this.$router.push({path:'/frontHome/NewsPage/',query:{id:id}})
    }
  },
  mounted() {
    getColumn(4).then((res)=>{
      this.silk=res.data
    })
    getColumn(3).then((res)=>{
      this.political=res.data
    })
    getColumn(0).then((res)=>{
      this.hot=res.data
    })
    getColumn(1).then((res)=>{
      this.policy=res.data
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
#side{
  padding: 20px;
  padding-top: 30px;
  width: 350px;
  .title{
    display: block;
    margin-bottom: 15px;
    font: {
      size: 20px;
      family: "Noto Serif SC", serif;;
    };
  }
  .img{
    img{
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
  .text{
    padding: 5px 10px 5px 10px;
  }
  .hot,.policy{
    margin-bottom: 70px;
    .img{
      height: 150px;
      img{
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .text{
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      padding: 0px 10px 0px 10px;
    }
    .hotblock{
      &:hover{
        cursor:pointer
      }
    }
  }
  .political{
    li{
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      color: #666;
      margin-bottom: 15px;
      font-size: 14px;
      transition: all ease-in-out .2s ;
      &:hover{
        color: #00a1d6;
        cursor:pointer;
      }
    }
  }
}
.el-carousel__item{
  .img{
    height: 150px;
  }
  .text{
    height: 150px;
    background-color: #fff;
  }
  &:hover{
    cursor: pointer;
  }
}
::v-deep .el-carousel__indicators{
  position: absolute;
  top: 40%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>