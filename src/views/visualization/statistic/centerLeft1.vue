<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">本日数据</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CenterLeft1Chart :article-pie="articlePie" :cul-pie="culPie"/>
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div
          class="item-box mt-2"
          v-for="(item, index) in numberData"
          :key="index"
        >
          <div class="d-flex">
<!--            <span class="coin">个</span>-->
            <dv-digital-flop class="dv-digital-flop" :config="item.number" />
          </div>
          <p class="text" style="text-align: center;">
            {{ item.text }}
            <span class="colorYellow">(个)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CenterLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart/index'
  import {getLeftPie} from '@/api/visualization/visualization'
  export default {
    data() {
      return {
        timer:'',
        numberData: [
          {
            number: {
              number: [32],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 24
              }
            },
            text: '发布总数'
          },
          {
            number: {
              number: [3],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 24
              }
            },
            text: '驳回数量'
          },
          {
            number: {
              number: [32],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 24
              }
            },
            text: '已经审核'
          },
          {
            number: {
              number: [0],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 24
              }
            },
            text: '仍未审核'
          }
        ],
        articlePie:{},
        culPie:{},
      }
    },
    components: {
      CenterLeft1Chart
    },
    mounted() {
      this.Time()
      this.changeTiming()
      this.getLeftPie()
    },
    methods: {
      getLeftPie(){
        getLeftPie().then((response)=>{
          this.articlePie = response.data.articlePie
          this.culPie = response.data.culPie
          this.numberData[0].number.number=[parseInt(response.data.sum)]
          this.numberData[0].number = {...this.numberData[0].number}
          this.numberData[1].number.number=[parseInt(response.data.failed)]
          this.numberData[1].number = {...this.numberData[1].number}
          this.numberData[2].number.number=[parseInt(response.data.judged)]
          this.numberData[2].number = {...this.numberData[2].number}
          this.numberData[3].number.number=[parseInt(response.data.unJudge)]
          this.numberData[3].number = {...this.numberData[3].number}
          this.numberData = {...this.numberData}
        })
      },
      Time(){
        this.timer = setInterval(()=>{
          this.getLeftPie();
        },1000*60*5)
      }
      ,
      changeTiming() {
        setInterval(() => {
          this.changeNumber()
        }, 3000)
      },
      changeNumber() {
        let list = Array.prototype.slice.call(this.numberData);
        list.forEach((item, index) => {
          item.number.number[0] += ++index
          item.number = { ...item.number }
        })
      }
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  $box-width: 300px;
  $box-height: 410px;

  #centerLeft1 {
    padding: 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
    .bg-color-black {
      height: $box-height - 30px;
      border-radius: 10px;
    }
    .d-flex{
      text-align: center;
    }
    .text {
      color: #c3cbde;
    }
    .dv-dec-3 {
      position: relative;
      width: 100px;
      height: 20px;
      top: -3px;
    }

    .bottom-data {
      .item-box {
        & > div {
          padding-right: 5px;
        }
        font-size: 14px;
        float: right;
        position: relative;
        width: 50%;
        color: #d3d6dd;
        .dv-digital-flop {
          width: 120px;
          height: 30px;
        }
        // 金币
        .coin {
          position: relative;
          top: 6px;
          font-size: 20px;
          color: #ffc107;
        }
        .colorYellow {
          color: yellowgreen;
        }
        p {
          text-align: center;
        }
      }
    }
  }
</style>
