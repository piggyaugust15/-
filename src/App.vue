<template>
  <div id="app" class="app">
    <el-backtop  :visibility-height=400 :bottom="60">
      <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <i class="el-icon-caret-top"></i>
      </div>
    </el-backtop>
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view  :key="this.$route.fullPath"/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
};
</script>
<style>
body {
  overflow: overlay;
  padding-right: 0 !important;
  padding-left: 0 !important;
  cursor: url(https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/default.cur),
    default;
}
::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 20px;
}
::-webkit-scrollbar-track {
  background-color: #eee;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>
