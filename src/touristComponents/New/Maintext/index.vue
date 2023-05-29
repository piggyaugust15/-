<template>
  <div class="box">
    <div class="mainbox">
      <h1 class="title">{{ newsInformation.newsTitle }}</h1>
      <!-- 文章标题 -->
      <div class="newsbox">
        <span class="newstext" v-html='newsInformation.newsContent'>{{ newsInformation.newsContent}} </span>
      </div>
      <div class="linkList">
        <ul>
          <div class="relatedNews">相关新闻</div>
          <div v-if="similarNews.length>0">
            <li v-for="(item,index) in similarNews" :key="index" @click="gotoNews(item.newsId)" >
              {{ item.newsTitle }}
              <span>{{ item.createTime }}</span>
            </li>
          </div>
          <span v-else class="null">暂无新闻</span>
        </ul>
      </div>
      <!-- 推荐算法 -->
    </div>
  </div>
</template>

<script>
  import Picture from "../Picture";
  export default {
    name: "Maintext",
    data() {
      return {};
    },
    components: {
      Picture,
    },
    methods:{
      gotoNews(id){
        this.$router.push({path:'/frontHome/newspage',query:{id:id}})
      }
    },
    props: {
      newsInformation: {
        type: Object,
        required: true,
        default: () => {},
      },
      similarNews:{
        type: Array,
        required: true,
        default: () => [],
      }
    },
  };
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: #333333;
    transition: 0.3s all ease-in-out;
  }
  a:hover {
    color: rgb(0, 123, 255);
  }
  .box {
    display: flex;
    .title {
      font-size: 36px;
      letter-spacing: 1px;
      margin-bottom: 30px;
      margin-top: 15px;
    }
    .mainbox {
      flex: 7;
      .newsbox {
        flex: 7;
        .newstext {
          display: block;
          font-size: 17px;
          text-indent: 2em;
        }
      }
      .linkList {
        .relatedNews {
          font-size: 21px;
          border-bottom: solid 1px #dcdcdc;
          padding: 10px;

        }
        .null{
          display: block;
          margin-top: 10px;
          text-align: center;
          color: #a2a2a2;
        }
        ul {
        margin-top: 30px;
        padding-left: 0px;
        li {
          padding: 15px;
          font-size: 17px;
          list-style: none;
          border-bottom: solid 1px #dcdcdc;
          transition: all ease-in-out .2s;
          &:hover{
            color: #1890ff;
            cursor: pointer;
          }
          span {
            float: right;
            font-size: 12px;
            color: rgb(0, 123, 255);
          }
        }
      }}
    }
  }
  .timeline {
    flex: 3;
    top: 30%;
  }
</style>
