<template>
  <div :id="id" :class="className" :style="{height: height, width: width}"/>
</template>

<script>
  import tdTheme from './theme.json'
  import '../map/fujian'
export default {
  name: "echart",
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width:{
      type: String,
      default: '100%'
    }
    ,
    height: {
      type: String,
      default: '2.5rem'
    },
    options:{
      type: Object,
      default: ()=>({})
    }
  },
  data (){
    return{
      chart:null
    }
  },
  watch:{
    options:{
      handler(options){
        //设置true清空 echarts 缓存
        this.chart.setOption(options,true)
      },
      deep:true
    }
  },
  mounted() {
    this.$echarts.registerTheme('tdTheme',tdTheme)
    this.initChart()
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
  },
  methods:{
    initChart(){
      this.chart = this.$echarts.init(this.$el,'tdTheme')
      this.chart.setOption(this.options,true)
    }
  }

}
</script>

<style scoped>

</style>
