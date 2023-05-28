<template>
  <div id="listtemplate">
    <div class="left">
      <ul>
        <li>
          <div>
            <span class="title">从巴黎到罗马，那是6月的一路南下</span>
            <div class="middle">
              <div class="img">
                <img src="https://p1-q.mafengwo.net/s11/M00/C1/E6/wKgBEFsLup6AF7TPAAyOwN_f0Qw42.jpeg?imageMogr2%2Fthumbnail%2F%21220x150r%2Fgravity%2FCenter%2Fcrop%2F%21220x150%2Fquality%2F100" alt="">
              </div>
              <div class="text">
                <span class="info">那是六月，美好的事情即将发生 still there…still there…still there…gone. 一个如同爱在午夜降临前的日落黄昏时，那是佛罗伦萨。 建筑歌剧、诗人画家、文艺复兴古罗马；
                  傍晚牵手的老桥，深情对望摆拍的穹顶上，那是佛罗伦萨。 听半个艺术生的你讲，...那是六月，美好的事情即将发生 still there…still there…still there…gone. 一个如同爱在午夜降临前的日落黄昏时，那是佛罗伦萨。 建筑歌剧、诗人画家、文艺复兴古罗马；
                  傍晚牵手的老桥，深情对望摆拍的穹顶上，那是佛罗伦萨。 听半个艺术生的你讲，...那是六月，美好的事情即将发生 still there…still there…still there…gone. 一个如同爱在午夜降临前的日落黄昏时，那是佛罗伦萨。 建筑歌剧、诗人画家、文艺复兴古罗马；
                  傍晚牵手的老桥，深情对望摆拍的穹顶上，那是佛罗伦萨。 听半个艺术生的你讲，...那是六月，美好的事情即将发生 still there…still there…still there…gone. 一个如同爱在午夜降临前的日落黄昏时，那是佛罗伦萨。 建筑歌剧、诗人画家、文艺复兴古罗马；
                  傍晚牵手的老桥，深情对望摆拍的穹顶上，那是佛罗伦萨。 听半个艺术生的你讲，...</span>
                <div class="user">
                  <img src="https://p1-q.mafengwo.net/s18/M00/82/CF/CoUBYGB-tfKAKxiMAACPGbbUd2881.jpeg?imageMogr2%2Fthumbnail%2F%2148x48r%2Fgravity%2FCenter%2Fcrop%2F%2148x48%2Fquality%2F90" alt="">
                  <span class="name">章鱼小丸子</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <span class="top">排行榜</span>
      <ul>
        <li v-for="(item,index) in topList" :key="index" @click="gotoArticle(item.articleId)">
          <div class="number">{{index+1}}</div>
          <div class="text">{{item.articleTitle}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getTopArticle,getHotArticle} from "@/api/article/article"
export default {
  name: "index",
  data(){
    return{
      topList:[],
    }
  },
  methods:{
    gotoArticle(id){
      this.$router.push({path:'/frontHome/articlepage',query:{id:id}})
    }
  },
  mounted() {
    getTopArticle().then((res)=>{
      this.topList=res.data;
    })
  }
}
</script>

<style lang="scss" scoped>
#listtemplate{
  display: flex;
  li{
    list-style: none;
  }
  .left{
    width: 900px;
    ul{
      li{
        padding: 15px 15px 25px 15px;
        border-top: 1px solid #e5e5e5;
        &:hover{
          background-color: #f8f8f8;
          border-top: 1px solid #fff;
          cursor: pointer;
        }
        &:hover .title{
          color: #007bff;
        }
        .title{
          display: block;
          transition: all .1s ease-in-out;
          font: {
            size: 20px;
          };
          margin-bottom: 10px;
          color: #333333;
        }
        .middle{
          display: flex;
          .img{
            width: 220px;
            height: 150px;
            img{
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
            }
          }
          .text{
            display: block;
            flex: 1;
            padding: 10px 20px;
            position: relative;
            .info{
              line-height: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              color: #666666;
            }
            .user{
              display: flex;
              align-items: center;
              position: absolute;
              right: 30px;
              bottom: 0;
              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 7px;
              }
              .name{
                font: {
                  size: 11px;
                };
                color: #007bff;
              }
            }
          }
        }
      }
    }
  }
  .right{
    width: 350px;
    margin-left: 70px;
    .top{
      display: block;
      padding: 10px;
      margin-bottom: 10px;
      font: {
        size: 25px;
        family: "Noto Serif SC", serif;;
      };
    }
    ul{
      li{
        padding: 10px;
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
        &:hover .text{
          color: #007bff;
        }
        .number{
          margin-right: 10px;
          font: {
            weight: 700;
          };
        }
        .text{
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          color: #666666;
          transition: all ease-in-out .1s;
        }
      }
    }
  }
}
</style>