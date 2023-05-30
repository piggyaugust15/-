<template>
  <div id="News">
    <TitleSwiper></TitleSwiper>
    <div class="main">
      <el-container>
        <el-header>
          <ComponentTitle>
            <template v-slot:Chinese>快讯</template>
            <template v-slot:English>News</template>
          </ComponentTitle>
        </el-header>
        <el-main class="center">
          <ViewTemplate
            :type="type"
            class="template"
          ></ViewTemplate>
          <side></side>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import {getRecentlyNews} from "../../api/home/news";
  import ComponentTitle from "../components/ComponentsTitle";
  import TitleSwiper from "../components/TitleSwiper";
  import CategoryLink from "../components/CategoryLink";
  import ViewTemplate from "../components/ViewTemplate";
  import side from "@/touristComponents/New/Side";
  export default {
    data() {
      return {
        url: process.env.VUE_APP_BASE_API,
        ViewTemplateListInfo: [],
        CategoryLinkInfo: [
          {
            id: "001",
            name: "热门景点",
            itemInfoList: [
              {
                id: "001",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "002",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "003",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
            ],
          },
          {
            id: "002",
            name: "大众好评",
            itemInfoList: [
              {
                id: "001",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "002",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "003",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
            ],
          },
          {
            id: "003",
            name: "人文风情",
            itemInfoList: [
              {
                id: "001",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "002",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
              {
                id: "003",
                time: "2022.8.26",
                title: "​清华大学台湾研究院主办“大变局下的台湾问题”研讨会",
              },
            ],
          },
        ],
        type: "News", //请求的第二个参数 判断是哪个模块 News Attractions CulcreationHome
      };
    },
    components:{
      ComponentTitle,
      TitleSwiper,
      CategoryLink,
      ViewTemplate,
      side
    },
  }
</script>

<style lang="scss" scoped>
  #News {
    .main {
      width: 1340px;
      margin: 0 auto;
    }
    .center{
      display: flex;
      .template{
        flex: 1;
      }

    }
  }
</style>
