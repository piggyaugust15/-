<template>
  <div>
    <svg-icon icon-class="eye" @click="goto()" />
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
