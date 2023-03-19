<template>
  <div id="Home">
    <div class="fullscreenswiper">
      <FirstCarousel></FirstCarousel>
    </div>
    <div>
      <RecCard></RecCard>
    </div>
    <div>
      <Exploration></Exploration>
    </div>
    <div>
      <Logobox></Logobox>
    </div>
    <div>
      <Partner></Partner>
    </div>
    <BottomVue></BottomVue>
  </div>
</template>

<script>
import FirstCarousel from "./FirstCarousel";
import Exploration from "./Exploration";
import RecCard from "./RecCard";
import Logobox from "./Logobox";
import Partner from "./Partner";
import BottomVue from "@/touristLayout/components/Bottom";
export default {
  name: "Home",
  data() {
    return {
      FirstCarousel: [],
    };
  },
  components: {
    FirstCarousel,
    RecCard,
    Exploration,
    Logobox,
    Partner,
    BottomVue,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Noto Serif SC", serif !important;
}

.fullscreenswiper {
  margin-bottom: 50px;
}
</style>
