<template>
  <div class="atab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'审核中 '" name="first">
        <manuscript-list :type="2"></manuscript-list>
      </el-tab-pane>
      <el-tab-pane :label="'已通过 '" name="second">
        <manuscript-list :type="0"></manuscript-list>
      </el-tab-pane>
      <el-tab-pane :label="'未通过 '" name="third">
        <manuscript-list :type="1"></manuscript-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManuscriptList from "../Gadget/manuscriptList/index";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  mounted() {},
  components: { ManuscriptList },
};
</script>

<style lang="scss" scoped>
.atab {
  ::v-deep.el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -1px;
    position: relative;
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
  ::v-deep.el-tabs__nav-wrap::after {
    content: none;
  }
}
</style>