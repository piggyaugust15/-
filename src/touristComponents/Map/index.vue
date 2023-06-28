<template>
  <div id="map">
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11" :scroll-wheel-zoom="true">
      <bm-driving :start="start" :end="end" @searchcomplete="handleSearchComplete" :panel="false" @stop="reset"
                  :autoViewport="true"></bm-driving>
      <bml-lushu :path="path" :icon="icon" :play="play" :rotation="true">
      </bml-lushu>
    </baidu-map>
    <div class="btn">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="出发地">
          <el-input ref="start" placeholder="请输入起点" v-model="startinput" />
        </el-form-item>
        <el-form-item label="目的地">
          <el-input ref="end" placeholder="请输入终点" v-model="endinput" />
        </el-form-item>
        <el-form-item>
          <el-button type="button" @click="confirm">确认</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
<!--  <baidu-map class="map"-->
<!--             :center="center"-->
<!--             :zoom="zoom"-->
<!--             @ready="handler"-->
<!--             :scroll-wheel-zoom="true"-->
<!--  >-->
<!--    <bm-polyline :path="polylinePath"-->
<!--                 stroke-color="blue"-->
<!--                 :stroke-opacity="0.5"-->
<!--                 :stroke-weight="10"-->
<!--                 :editing="false"-->
<!--                 @lineupdate="updatePolylinePath"></bm-polyline>-->
<!--  </baidu-map>-->
</template>
<script>
import {
  BmlLushu
} from 'vue-baidu-map'
export default {
  data() {
    return {
      play: false,
      path: [],
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: {
          width: 52,
          height: 26
        },
        opts: {
          anchor: {
            width: 27,
            height: 13
          }
        }
      },
      start: '',
      end: '',
      startinput:'',
      endinput:''
    }
  },
  methods: {
    reset () {
      this.play = false
    },
    handleSearchComplete(res) {
      this.path = res.getPlan(0).getRoute(0).getPath()
    },
    confirm() {
      this.start = this.$refs.start.value
      this.end = this.$refs.end.value
      this.play = true
    }
  },
  components: {
    BmlLushu
  }
}
</script>
<style lang="scss" scoped>
#map{
  display: block;
  position: relative;
  width: 100%;
  height: 100vh;
  .btn{
    padding: 10px;
    //width: 400px;
    position: absolute;
    right: 10px;
    top: 100px;
    background-color: #fff;
    border-radius: 10px;
    opacity: .7;
    transition: all ease-in-out .1s;
    &:hover{
      opacity: 1;
    }
  }
  .map {
    width: 100%;
    height: 100vh;

  }
  .BMap_cpyCtrl {
    display: none !important;
  }
  .anchorBL {
    display: none !important;
  }
}


</style>