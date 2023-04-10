<template>
  <div id="draft">
    <h3 v-text="'草稿箱 '"></h3>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="'文章'" name="first">
        <manuscript-list :type="3"></manuscript-list>
      </el-tab-pane>
      <el-tab-pane :label="'文创 '" name="third">
        <culmanuscriptList :type="3"></culmanuscriptList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManuscriptList from "../Gadget/manuscriptList/index";
import culmanuscriptList from '../Gadget/culmanuscriptList/index'
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: { ManuscriptList,culmanuscriptList },
};
</script>

<style lang="scss" scoped>
$backcolor: #ffffff;
$bluecolor: #00aeec;
#draft {
  background-color: $backcolor;
  padding: 20px 40px 20px 40px;
  h3 {
    color: $bluecolor;
  }
    ::v-deep.el-tabs__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
      width: 125px;
      margin: 0 auto;
      text-align: center;
    }
    ::v-deep.el-tabs__nav-wrap::after {
      content: none;
    }
}
</style>
