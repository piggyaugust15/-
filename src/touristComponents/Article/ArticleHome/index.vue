<template>
  <div id="ArticleHome">
    <ArticleSwiper @scroll="scroll()"></ArticleSwiper>
    <div class="main" id="main">
      <el-container>
        <el-header>
          <ComponentTitle>
            <template v-slot:Chinese>文章</template>
            <template v-slot:English>Article</template>
          </ComponentTitle>
        </el-header>
        <el-main>
          <ListTemplate @scroll="scroll()"></ListTemplate>
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
      type: "CulcreationHome",
    };
  },
  methods:{
    scroll(){
      document.getElementById("main").scrollIntoView({behavior:'smooth'});
    }
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
