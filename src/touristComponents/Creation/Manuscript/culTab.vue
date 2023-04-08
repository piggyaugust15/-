<template>
  <div class="atab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'审核中 '" name="first">
        <culmanuscriptList :type="2"></culmanuscriptList>
      </el-tab-pane>
      <el-tab-pane :label="'已通过 '" name="second">
        <culmanuscriptList :type="0"></culmanuscriptList>
      </el-tab-pane>
      <el-tab-pane :label="'未通过 '" name="third">
        <culmanuscriptList :type="1"></culmanuscriptList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import culmanuscriptList from "@/touristComponents/Creation/Gadget/culmanuscriptList";
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
  components: { culmanuscriptList },
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