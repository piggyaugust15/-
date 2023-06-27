<template>
  <div id="fanslist">
    <!--       0是粉丝，1关注 -->
    <ul v-if="this.type===1"
    >
      <div v-if="this.sub.length>0">
        <li v-for="(item,index) in sub" :key="index"><div class="box">
          <div class="img">
            <img :src="$store.state.front.url+item.avatar" alt="">
            <div class="logging" v-if="item.ifLoginIng"></div>
          </div>
          <div class="content">
            <div class="name" @click="gotoProfile(item.userId)">{{item.nickName}}</div>
            <span class="intro">{{item.intro}}</span>
          </div>

          <div class="fav" slot="reference" v-if="ifSelf&&item.flag"             @click="handleUnFav(item)"
          >
            <i class="el-icon-more"></i>
            已关注</div>
          <div class="toFav" v-if="!item.flag" @click="handleSubscribe(item)">
            关注
          </div>
        </div></li>
      </div>
      <el-empty description="这里还没有关注的人哦" v-else></el-empty>
      <div style="padding-bottom: 20px">
        <Pagination
            :total="subPagination.total"
            :page.sync="subQueryParams.pageNum"
            :limit.sync="subQueryParams.pageSize"
            :auto-scroll="false"
            @pagination="getList"
        ></Pagination>
      </div>
    </ul>
    <ul v-else
    >
      <div v-if="this.fans.length>0">
        <li v-for="(item,index) in fans" :key="index"><div class="box">
          <div class="img">
            <img :src="$store.state.front.url+item.avatar" alt="">
          </div>
          <div class="content">
            <div class="name" @click="gotoProfile(item.userId)">{{item.nickName}}</div>
            <span class="intro">{{item.intro}}</span>
          </div>
          <!--        <el-popconfirm-->
          <!--            title="确定取消关注吗？"-->

          <!--        >-->
          <!--          <div class="fav" slot="reference"-->
          <!--          >-->
          <!--            <i class="el-icon-more"></i>-->
          <!--            已关注</div>-->
          <!--        </el-popconfirm>-->
        </div></li>
      </div>
      <el-empty description="这里还没有粉丝哦" v-else></el-empty>
      <div style="padding-bottom: 20px">
        <Pagination
            :total="fansPagination.total"
            :page.sync="fansQueryParams.pageNum"
            :limit.sync="fansQueryParams.pageSize"
            :auto-scroll="false"
            @pagination="getList"
        ></Pagination>
      </div>
    </ul>
  </div>
</template>

<script>
import {getFansList, getSubList, handleSubscribe} from '@/api/user/user.js'
export default {
  name: "index",
  data(){
    return {
      sub:[],
      fans:[],
      ifSelf:false,
      flag:this.$route.query.id,
      subPagination:{
        total:0,
      },
      subQueryParams:{
        pageNum:1,
        pageSize:10,
      },

      fansPagination:{
        total:0,
      },
      fansQueryParams:{
        pageNum:1,
        pageSize:10,
      },
    }
  },
  methods:{
    gotoProfile(id){
      this.$router.push({
        path:"/frontHome/user",
        query:{
          id:id
        }
      });
    },
    handleInfo(){
      if(this.flag===undefined){
        this.flag=-1;
      }
    },
    getList(){
      if(this.type){
        getSubList(this.flag,this.subQueryParams).then((res)=>{
          this.ifSelf=res.params.ifSelf;
          this.sub=res.rows;
          this.subPagination.total=res.total;
        })
      }else{
        getFansList(this.flag,this.fansQueryParams).then((res)=>{
          this.ifSelf=res.params.ifSelf;
          this.fans=res.rows;
          this.fansPagination.total=res.total;
        })
      }

    },
    handleUnFav(item){
      handleSubscribe(item.userId).then((res)=>{
        if(res.code===200){
          this.$message({
            type:'success',
            message:res.msg,
          })
          item.flag=!item.flag;
        }else{
          this.message.err(res.msg)
        }
      })
    },
    handleSubscribe(item){
      handleSubscribe(item.userId).then((res)=>{
        if(res.code===200){
          this.$message({
            type:'success',
            message:res.msg,
          })
          item.flag=!item.flag;
        }else{
          this.message.err(res.msg)
        }
      })
    }
  },
  mounted() {
    this.handleInfo();
    this.getList();

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
        .logging{
          position: absolute;
          left: 60px;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6efd1f;
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
      .fav,.toFav{
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
      .toFav{
        border: 1px solid #409eff;
        color: #409eff;
        cursor: pointer;
        background-color: #e6f0fd;
      }
    }

  }
}
</style>