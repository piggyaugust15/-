<template>
  <div id="CulHome">
    <CulCreationSwiper></CulCreationSwiper>
    <div class="main">
      <el-container>
        <el-header>
          <ComponentTitle>
            <template v-slot:Chinese>文创</template>
            <template v-slot:English>Cultural creativity</template>
          </ComponentTitle>
        </el-header>
<!--        <el-main>-->
          <CulCreationMain></CulCreationMain>
<!--        </el-main>-->
      </el-container>
    </div>
  </div>
</template>

<script>
import ComponentTitle from "@/touristComponents/components/ComponentsTitle";
import TitleSwiper from "@/touristComponents/components/TitleSwiper";
import CategoryLink from "@/touristComponents/components/CategoryLink";
import ViewTemplate from "@/touristComponents/components/ViewTemplate";
import CulCreationMain from "@/touristComponents/Culcreation/CulcreationHome/CulCreationMain"
import CulCreationSwiper from "@/touristComponents/Culcreation/CulcreationHome/CulCreationSwiper"
export default {
  name: "Bulletins",
  data() {
    return {
      type: "CulcreationHome",
    };
  },
  components: {
    ComponentTitle,
    TitleSwiper,
    CategoryLink,
    ViewTemplate,
    CulCreationMain,
    CulCreationSwiper
  },
};
</script>
<style scoped>
#CulHome {
  height: 100vh;
}
#CulHome .main {
  width: 1340px;
  margin: 0 auto;
}
</style>
