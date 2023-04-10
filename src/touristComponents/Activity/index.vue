<template>
<div id="activity">
  <div class="main">
    <div class="left">
      <div class="poster">
        <div class="img">
          <img :src="$store.state.front.url+data.activityImage.split(',')[0]" alt="">
        </div>
        <div class="content">
          <h1>{{data.activityTitle}}</h1>
          <span class="intro">{{data.activityIntroduction}}</span>
        </div>
      </div>
      <div class="detailContent">
        <h3>活动内容</h3>
        <div v-html="data.activityContent"></div>
      </div>
    </div>
    <div class="person">
      <div class="header">主办方及主持人</div>
      <div class="list">
        <ul>
          <li>
            <div class="user">
              <div class="img">
                <img src="https://pic1.zhimg.com/v2-6ee5e80794a4e408363158d60d872a2c.jpg?source=32738c0c" alt="">
              </div>
              <div class="content">
                <span class="name">知乎时尚</span>
                <span class="intro">intro</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getDetailActivity} from '@/api/activity/frontActivity'
export default {
  name: "index",
  data(){
    return{
      data:{}
    }
  },
  methods:{
    getDetailActivity(){
      getDetailActivity(this.$route.query.id).then((res)=>{
        this.data=res.data;
        console.log(res)
      })
    }
  },
  created() {
    this.getDetailActivity()
  }
}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
}
#activity{
  width: 100%;
  background-color: #f6f6f6;
  .main{
    padding-top: 80px;
    padding-bottom: 50px;
    width: 1100px;
    margin: 0 auto;
    display: flex;
    .left{
      width: 800px;
      .poster{
        display: flex;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        .img{
          width: 240px;
          height: 240px;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .content{
          flex: 1;
          padding: 10px 20px 10px 20px;
        }
      }
      .detailContent{
        margin-top: 10px;
        padding: 10px 20px 10px 20px;
        background-color: #fff;
        border-radius: 5px;
      }
    }
    .person{
      position: sticky;
      top: 20px;
      flex: 1;
      background-color: #fff;
      margin-left: 10px;
      padding: 20px;
      border-radius: 5px;
      height: 100%;
      .header{
        border-bottom: 1px solid #f6f6f6;
        padding-bottom: 20px;
        font-weight: 700;
      }
      .list{
        margin-top: 10px;
        li{
          .user{
            display: flex;
            .img{
              width: 45px;
              height: 45px;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .content{
              padding-left: 10px;
              .name{
                font-weight: 700;
                margin-bottom: 7px;
              }
              span{
                display: block;
              }
              .intro{
                color: #9999b3;
              }
            }
          }
        }
      }
    }
  }

}
</style>