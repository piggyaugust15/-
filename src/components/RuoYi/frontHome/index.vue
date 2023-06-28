<template>
  <div>
    <i class="el-icon-s-promotion" style="font-size: 21px" @click="goto()" />
  </div>
</template>

<script>
export default {
  name: "RuoYiFrontHome",
  data() {
    return {
      // url: 'http://192.1680:81/frontHome/home'
    };
  },
  methods: {
    goto() {
      this.$router.push({
        path: "/frontHome/home",
      });
    },
  },
};
</script>
