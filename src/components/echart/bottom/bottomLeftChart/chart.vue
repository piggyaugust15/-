<template>
  <div style="width: 100%">
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="480px"
      width="100%"
    />
  </div>
</template>

<script>
import Echart from "../../../../common/echart/index";
export default {
  data () {
    return{
      options:{}
    };
  },
  components: {Echart,},
  props:{
    cdata:{
      type: Object,
      default:()=>({})
    },
  },
  watch:{
    cdata:{
      handler(newData){
        this.options = {
          tooltip:{
            trigger:"axis",
            backgroundColor:"rgba(255,255,255,0,1)",
            axisPointer:{
              type:"",
              label:{
                show:true,
                backgroundColor: "#7B7DDC"
              }
            }
          },
          legend:{
            data:["已发布","驳回","未通过"],
            textStyle:{
              color: "#B4B4B4"
            },
            top:"0%"
          },
          grid:{
            x:"",
            width:"",
            y:""
          },
          xAxis:{
            data: newData.category,
            axisLine:{
              lineStyle:{
                color: "#B4B4B4"
              }
            },
            axisTick:{
              show:false
            }
          },
          yAxis:[
            {
              splitLine:{show:false},
              axisLine: {
                LineStyle:{
                  color:"#B4B4B4"
                }
              },
              axisLabel:{
                formatter:"{value}"
              }
            },
            {
              splitLine: {show:false},
              axisLine: {
                lineLine:{
                  color:"#B4B4B4"
                }
              },
              axisLabel: {
                formatter: "{value}"
              }
            }
          ],
          series:[{
            name: "文章",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle:{
              normal:{
                color: "#F02FC2"
              }
            },
            data: newData.rateData
          },{
            name: "文创",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" }
                ])
              }
            },
            data: newData.barData
          },{
            name: "未通过",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.8)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  { offset: 1, color: "rgba(156,107,211,0.2)" }
                ])
              }
            },
            z: -12,
            data: newData.lineData
          }]
        }
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style scoped>

</style>
