<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">热度排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
import {getSightsTop} from '@/api/visualization/visualization.js'
   export default {
    data() {
      return {
        config: {
          header: [ '名称', '热度'],
          data: [

          ],
          rowNum: 7, //表格行数
          headerHeight: 35,
          headerBGC: '#0f1325', //表头
          oddRowBGC: '#0f1325', //奇数行
          evenRowBGC: '#171c33', //偶数行
          index: true,
          columnWidth: [50],
          align: ['center']
        },
        sightsList:[]
      }
    },
    methods:{
      getSightsTop(){
        getSightsTop().then((response)=>{
          console.log("si",response)
          this.sightsList = response.data

          let data = []

          for (let i = 0; i < this.sightsList.length; i++) {
            let sights = [this.sightsList[i].sightsName,this.sightsList[i].sightsHot]
            data.push(sights)
          }
          this.config.data = data

          this.config = {...this.config}


        })
      }
    },
    mounted() {
      this.getSightsTop()
    }
  }
</script>

<style lang="scss" scoped>
  $box-height: 410px;
  $box-width: 300px;
  #centerRight1 {
    padding: 16px;
    padding-top: 20px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;
    .bg-color-black {
      height: $box-height - 30px;
      border-radius: 10px;
    }
    .text {
      color: #c3cbde;
    }
    .body-box {
      border-radius: 10px;
      overflow: hidden;
      .dv-scr-board {
        width: 270px;
        height: 340px;
      }
    }
  }
</style>
