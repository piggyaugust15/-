<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文章投稿" name="first"
        ><articleFormVue></articleFormVue
      ></el-tab-pane>
      <el-tab-pane label="文创投稿" name="second"
        ><culFormVue></culFormVue
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import articleFormVue from "./articleForm.vue";
import culFormVue from "./culForm.vue";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {},
  components: { articleFormVue, culFormVue },
};
</script>