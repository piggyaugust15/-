<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
    <div class="down">
<!--      <div class="ranking bg-color-black">-->
<!--        <span>-->
<!--          <icon name="chart-pie" class="text-icon"></icon>-->
<!--        </span>-->
<!--        <span class="fs-xl text mx-2 mb-1 pl-3">年度负责人组件达标榜</span>-->
<!--        <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="ranking" />-->
<!--      </div>-->
      <div class="percent">
        <div class="item bg-color-black">
          <span>文章通过率</span>
          <CenterChart
            :id="rate[0].id"
            :tips="rate[0].tips"
            :colorObj="rate[0].colorData"
          />
        </div>
        <div class="item bg-color-black">
          <span>文创通过率</span>
          <CenterChart
            :id="rate[1].id"
            :tips="rate[1].tips"
            :colorObj="rate[1].colorData"
          />
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </div>
      <div>
        <center-right2 />
      </div>
    </div>
  </div>
</template>

<script>
  import CenterChart from '@/components/echart/center/centerChartRate'
  import CenterRight2 from "@/views/visualization/statistic/centerRight2";
  import {getData,getMedium} from "@/api/visualization/visualization.js"
  export default {
    data() {
      return {
        timer:'',
        titleItem: [
          {
            title: '今日累计发布',
            number: {
              number: [1],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          },
          {
            title: '本月累计发布',
            number: {
              number: [10],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          },
          {
            title: '今年累计发布',
            number: {
              number: [36],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          },
          {
            title: '今年总驳回',
            number: {
              number: [3],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          },
          {
            title: '今年总通过',
            number: {
              number: [33],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          },
          {
            title: '在线用户人数',
            number: {
              number: [1],
              toFixed: 1,
              textAlign: 'center',
              content: '{nt}',
              style: {
                fontSize: 26
              }
            }
          }
        ],
        ranking: {
          data: [
            {
              name: '周口',
              value: 55
            },
            {
              name: '南阳',
              value: 120
            },
            {
              name: '西峡',
              value: 78
            },
            {
              name: '驻马店',
              value: 66
            },
            {
              name: '新乡',
              value: 80
            },
            {
              name: '新乡2',
              value: 80
            },
            {
              name: '新乡3',
              value: 80
            },
            {
              name: '新乡4',
              value: 80
            },
            {
              name: '新乡5',
              value: 80
            },
            {
              name: '新乡6',
              value: 80
            }
          ],
          carousel: 'single',
          unit: '人'
        },
        water: {
          data: [20,13],
          shape: 'roundRect',
          formatter: '{value}%',
          waveNum: 6,
          colors:['#00BAFF', '#3DE7C9']

        },
        // 通过率和达标率的组件复用数据
        rate: [
          {
            id: 'centerRate1',
            tips: 33,
            colorData: {
              textStyle: '#3fc0fb',
              series: {
                color: ['#00bcd44a', 'transparent'],
                dataColor: {
                  normal: '#03a9f4',
                  shadowColor: '#97e2f5'
                }
              }
            }
          },
          {
            id: 'centerRate2',
            tips: 66,
            colorData: {
              textStyle: '#67e0e3',
              series: {
                color: ['#faf3a378', 'transparent'],
                dataColor: {
                  normal: '#ff9800',
                  shadowColor: '#fcebad'
                }
              }
            }
          }
        ]
      }
    },
    components: {
      CenterChart,
      CenterRight2
    },
    methods:{
      Time(){
        this.timer = setInterval(() => {
           this.getData();
           this.getMedium();
        }, 5000)
        this.getData();
        this.getMedium();
    },
      getData(){
        getData().then((response)=>{
          let data = []
          data.push(response.server.mem.used)
          data.push(response.server.cpu.used)
          this.rate[0].tips = response.articleRate
          this.rate[1].tips = response.culRate;
          this.water.data = data;
          data=[]
          this.rate = {...this.rate}
          this.water = {...this.water}
        })
      },
      getMedium(){
        getMedium().then((response)=>{
          this.titleItem[0].number.number=[parseInt(response.DAY)];
          this.titleItem[0].number = {...this.titleItem[0].number}
          this.titleItem[1].number.number=[parseInt(response.MONTH)];
          this.titleItem[1].number={...this.titleItem[1].number}
          this.titleItem[2].number.number=[parseInt(response.YEAR)];
          this.titleItem[2].number={...this.titleItem[2].number}
          this.titleItem[3].number.number=[parseInt(response.YEARNO)];
          this.titleItem[3].number={...this.titleItem[3].number}
          this.titleItem[4].number.number=[parseInt(response.YEAROK)];
          this.titleItem[4].number={...this.titleItem[4].number}
          this.titleItem[5].number.number=[response.onLineNum];
          this.titleItem[5].number={...this.titleItem[5].number}
          this.titleItem = {...this.titleItem}
        })
      }
    },
    mounted() {
      this.Time()
      this.getData();
      this.getData();
      this.getMedium();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
</script>

<style lang="scss" scoped>
  #center {
    width: 510px;
    display: flex;
    flex-direction: column;
    .up {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        border-radius: 6px;
        padding-top: 8px;
        margin-top: 8px;
        width: 32%;
        height: 70px;
        .dv-dig-flop {
          width: 150px;
          height: 30px;
        }
      }
    }
    .down {
      margin-top: 50px;
      padding: 6px 4px;
      padding-bottom: 0;
      width: 100%;
      display: flex;
      height: 255px;
      justify-content: space-between;
      align-items: center;
      .bg-color-black {
        border-radius: 5px;
      }
      .ranking {
        padding: 10px;
        width: 59%;
        .dv-scr-rank-board {
          height: 225px;
        }
      }
      .percent {
        width: 40%;
        display: flex;
        flex-wrap: wrap;
        //margin: 0 auto;
        .item {
          width: 50%;
          height: 120px;
          span {
            margin-top: 8px;
            font-size: 14px;
            display: flex;
            justify-content: center;
          }
        }
        .water {
          width: 100%;
          .dv-wa-le-po {
            height: 120px;
          }
        }
      }
    }
  }
</style>
