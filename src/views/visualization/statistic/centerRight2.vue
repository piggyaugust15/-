<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2" style="text-align: center">
        <span>
          <icon name="align-left" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2" >部分已录入景点国家地区分布</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
<!--        <centerRight2Chart1 />-->
      </div>
    </div>
  </div>
</template>

<script>
  import centerRight2Chart1 from '@/components/echart/centerRight/centerRightChart'
  import {getCountryNum} from '@/api/visualization/visualization'
  export default {
    data() {
      return {
        config: {
          data: [{
            name:null,
            value:null
          },
            {
              name:null,
              value:null
            },
            {
              name:null,
              value:null
            },
            {
              name:null,
              value:null
            },
            {
              name:null,
              value:null
            },
          ]
        }
      }
    },
    mounted(){
      this.getCountryNum();
    },
    methods:{
      getCountryNum(){
        getCountryNum().then((res)=>{
          for (let i = 0; i < 5; i++) {
            this.config.data[i].name=res.data[i].name;
            this.config.data[i].value=res.data[i].value;
          }
          this.config = {...this.config}
        })

      }
    },
    components: { centerRight2Chart1}
  }

</script>

<style lang="scss" scoped>
  #centerRight2 {
    $box-height: 410px;
    $box-width: 340px;
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;
    .bg-color-black {
      padding: 5px;
      height: $box-height;
      width: $box-width;
      border-radius: 10px;
      padding-top: 155px;
    }
    .text {
      color: #c3cbde;
    }
    .body-box {
      border-radius: 10px;
      overflow: hidden;
      .dv-cap-chart {
        width: 100%;
        height: 160px;
      }
    }
  }
</style>
