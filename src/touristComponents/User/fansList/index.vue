<template>
  <div id="fanslist">
    <!--       0是粉丝，1关注 -->
    <ul v-if="this.type===1"
    >
      <li><div class="box">
        <div class="img">
          <img :src="$store.state.user.avatar" alt="">
        </div>
        <div class="content">
          <div class="name">haoran</div>
          <span class="intro">intro</span>
        </div>
<!--        <el-popconfirm-->
<!--            title="确定取消关注吗？"-->

<!--        >-->
<!--          <div class="fav" slot="reference"-->
<!--          >-->
<!--            <i class="el-icon-more"></i>-->
<!--            已关注</div>-->
<!--        </el-popconfirm>-->
        <el-popconfirm
            title="确定取消这个粉丝吗？"
        >
          <div class="fav" slot="reference" >
            <i class="el-icon-more"></i>
            已关注</div>
        </el-popconfirm>
      </div></li>
    </ul>
    <ul v-else
    >
      <li><div class="box">
        <div class="img">
          <img :src="$store.state.user.avatar" alt="">
        </div>
        <div class="content">
          <div class="name">haoran</div>
          <span class="intro">intro</span>
        </div>
        <!--        <el-popconfirm-->
        <!--            title="确定取消关注吗？"-->

        <!--        >-->
        <!--          <div class="fav" slot="reference"-->
        <!--          >-->
        <!--            <i class="el-icon-more"></i>-->
        <!--            已关注</div>-->
        <!--        </el-popconfirm>-->
        <el-popconfirm
            title="确定取消关注吗？"
        >
          <div class="fav" slot="reference" >
            <i class="el-icon-more"></i>
            已关注</div>
        </el-popconfirm>
      </div></li>
    </ul>
  </div>
</template>

<script>
import {getFansList,getSubList} from '@/api/user/user.js'
export default {
  name: "index",
  data(){
    return {
      sub:[],
      fans:[]
    }
  },
  mounted() {
    getSubList().then((res)=>{
      console.log('11',res)
    })
  },
  props:['type']
}
</script>

<style lang="scss" scoped>
#fanslist{
  li{
    padding: 10px 0 10px 0;
    border-bottom: 1px solid  #e5e9ef;
    .box{
      position: relative;
      display: flex;
      align-items: center;
      .img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px  ;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content{
        .name{
          margin-bottom: 10px;
          cursor: pointer;
          &:hover{
            color: #00a1d6;
          }
        }
        .intro{
          color: #6d757a;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          text-overflow: ellipsis;
          padding-right: 10px;
        }
      }
      .fav{
        position: absolute;
        top: 25%;
        right: 10px;
        line-height: 16px;
        font-size: 12px;
        vertical-align: middle;
        color: #6d757a;
        padding: 5px 10px 5px 10px;
        background-color: #e5e9ef;
        border-radius: 5px;
        &:hover{
          cursor: pointer;
          color: #00a1d6
        }
      }
    }

  }
}
</style>