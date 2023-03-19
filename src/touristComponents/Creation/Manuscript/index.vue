<template>
  <div id="manuscript">
    <el-tabs v-model="activeName1" @tab-click="handleClick">
      <el-tab-pane label="文章稿件" name="first">
        <article-tab></article-tab>
      </el-tab-pane>
      <el-tab-pane label="文创稿件" name="second">
        <cul-tab></cul-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManuscriptList from "../Gadget/manuscriptList/index";
import ArticleTab from "./articleTab.vue";
import CulTab from "./culTab.vue";
export default {
  components: { ManuscriptList, ArticleTab, CulTab },
  data() {
    return {
      // visible: true,
      activeName1: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
$backcolor: #ffffff;
#manuscript {
  background-color: $backcolor;
  padding: 20px 40px 20px 40px;
}
</style>
