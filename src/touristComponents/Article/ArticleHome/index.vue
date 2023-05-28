<template>
  <div id="ArticleHome">
    <ArticleSwiper></ArticleSwiper>
    <div class="main">
      <el-container>
        <el-header>
          <ComponentTitle>
            <template v-slot:Chinese>文章</template>
            <template v-slot:English>Article</template>
          </ComponentTitle>
        </el-header>
        <el-main>
          <ListTemplate></ListTemplate>
          <!--          <CategoryLink :listInfo="CategoryLinkInfo"></CategoryLink>-->
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/touristComponents/components/ComponentsTitle";
import TitleSwiper from "@/touristComponents/components/TitleSwiper";
import CategoryLink from "@/touristComponents/components/CategoryLink";
import ViewTemplate from "@/touristComponents/components/ViewTemplate";
import ArticleSwiper from "@/touristComponents/components/ArticleSwiper";
import ListTemplate from "@/touristComponents/Article/ArticleHome/ListTemplate";
export default {
  name: "Bulletins",
  data() {
    return {
      CategoryLinkInfo: [
        {
          id: "001",
          name: "景区通告",
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
          name: "管理通知",
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
          name: "优惠折扣",
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
      type: "CulcreationHome",
    };
  },
  components: {
    ArticleSwiper,
    ComponentTitle,
    TitleSwiper,
    CategoryLink,
    ViewTemplate,
    ListTemplate
  },
};
</script>
<style lang="scss" scoped>
#ArticleHome {
  .main {
    width: 1340px;
    margin: 0 auto;
  }
}
</style>
