<template>
  <div id="listtemplate">
    <div class="left">
      <ul v-loading="loading">
        <li v-for="(item,index) in totalList" :key="index" @click="$router.push({path:'/frontHome/articlepage',query:{id:item.articleId}})">
          <div>
            <span class="title">{{item.articleTitle}}</span>
            <div class="middle">
              <div class="img">
                <img :src='$store.state.front.url+item.articleCover' alt="">
              </div>
              <div class="text">
                <span class="info">{{item.articleContent}}</span>
                <div class="user" @click="this.$router.push()">
                  <img :src='$store.state.front.url+item.avatar' alt="">
                  <span class="name">{{item.nickName}}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <Pagination
          :total="pagination.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          :auto-scroll="false"
          @pagination="getPaginationArticle"
      ></Pagination>
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
import {getTopArticle,getHotArticle,getPaginationArticle} from "@/api/article/article"
export default {
  name: "index",
  data(){
    return{
      loading:true,
      topList:[],
      totalList:[],
      flag:1,
      pagination:{
        total:0,
      },
      queryParams:{
        pageNum:1,
        pageSize:10,
      }
    }
  },
  methods:{
    gotoArticle(id){
      this.$router.push({path:'/frontHome/articlepage',query:{id:id}})
    },
    getPaginationArticle(){
      this.loading=true;
      getPaginationArticle(this.queryParams).then((res)=>{
        console.log(res,"pagination")
        this.totalList=res.rows;
        this.pagination.total=res.total;
         if(this.flag!==1){
           this.$emit('scroll')
         }
         this.flag++;
         this.loading=false;
      })
    }
  },
  mounted() {
    getTopArticle().then((res)=>{
      this.topList=res.data;
    })
    this.getPaginationArticle();
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
              width: 140px;
              display: flex;
              align-items: center;
              position: absolute;
              left: 75%;
              bottom: 0;
              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 7px;
              }
              .name{
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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