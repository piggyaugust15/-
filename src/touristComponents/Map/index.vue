<template>
  <div id="map">
    <div class="title">Echarts中国地图三级钻取</div>
    <div class="box">
      <button class="backBtn" @click="back()">返回上级</button>
      <div id="mapChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import cityMap from "@/utils/china-main-city-map.js";
import echarts from "echarts";
import axios from "axios";
// import {getMap} from '@/api/map/map.js'
import {requestLocal} from "@/utils/requestLocal";
import Vue from "vue";
// import registerAndsetOption from '@/js/echarts-map'
// import {} from'../../../public/js/map'
//中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;

//记录父级ID、Name
var mapStack = [];
var parentId = null;
var parentName = null;

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null;
export default {
  name: "chinaMap",
  props: {
    msg: String
  },
  mounted: function() {
    this.mapChart("mapChart");
  },
  methods: {
    getback(){
      // 去掉整个页面的右击事件
      document.oncontextmenu = function(){
        return false;
      }
      // 点击右键返回到上一级
      document.getElementById("backRight").onmousedown = function(e){
        if(e.button ==2){
          this.back()
        }
      }
    },
    /**
     * 返回上一级地图
     */
    back() {
      if (mapStack.length != 0) {
        //如果有上级目录则执行
        var map = mapStack.pop();
        axios.get("http://localhost:80/public/js/map" + map.mapId + ".json", {
        }).then(response => {
          const mapJson = response.data;
          registerAndsetOption(
              myChart,
              map.mapId,
              map.mapName,
              mapJson,
              false
          );
          //返回上一级后，父级的ID、Name随之改变
          parentId = map.mapId;
          parentName = map.mapName;
        });
      }
    },
    /**
     * Echarts地图
     */
    mapChart(divid) {
      axios.get("http://localhost:80/public/js/map" + chinaId + ".json", {

      }).then(response => {
        const mapJson = response.data;
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById(divid));
        registerAndsetOption(myChart, chinaId, chinaName, mapJson, false);
        parentId = chinaId;
        parentName = "china";
        myChart.on("click", function(param) {
          console.log(param)
          var cityId = cityMap[param.name];
          if (cityId) {
            //代表有下级地图
            axios.get("http://localhost:80/public/js/map" + cityId + ".json", {

            }).then(response => {
              const mapJson = response.data;
              registerAndsetOption(
                  myChart,
                  cityId,
                  param.name,
                  mapJson,
                  true
              );
            });
          } else {
            //没有下级地图，回到一级中国地图，并将mapStack清空
            registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
            mapStack = [];
            parentId = chinaId;
            parentName = chinaName;
          }
          // $.get('./asset/json/map/'+param.data.id+'.json', function (mapJson,status) {

          //     registerAndsetOption(myChart,param.data.id,param.name,mapJson,true)

          // }).fail(function () {
          //     registerAndsetOption(myChart,chinaId,'china',chinaJson,false)
          // });
        });
      });
    }
  }
};
/**
 *
 * @param {*} myChart
 * @param {*} id        省市县Id
 * @param {*} name      省市县名称
 * @param {*} mapJson   地图Json数据
 * @param {*} flag      是否往mapStack里添加parentId，parentName
 */
function registerAndsetOption(myChart, id, name, mapJson, flag) {
  echarts.registerMap(name, mapJson);
  console.log('2',initMapData(mapJson))
  myChart.setOption({
    series: [
      {
        type: "map",
        map: name,
        itemStyle: {
          normal: {//未选中状态
            borderWidth:2,//边框大小
            borderColor:'#9afcef',
            areaColor: '#17578e',//背景颜色
            label: {
              show: true,//显示名称
              position: 'left',
              // offset:[300, 140],
              // distance : 5,
              textStyle: {
                color: '#fff'
              }
            }
          },
          emphasis: {// 选中高亮时的样式
            borderWidth:2,
            borderColor:'#9afcef',
            areaColor: '#067dd6',
            label: {
              show: true,
              position: 'top',
              // offset:[300, 140],
              // distance : 5,
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        data: initMapData(mapJson)
      }
    ]
  });

  if (flag) {
    //往mapStack里添加parentId，parentName,返回上一级使用
    mapStack.push({
      mapId: parentId,
      mapName: parentName
    });
    parentId = id;
    parentName = name;
  }
}

function initMapData(mapJson) {
  var mapData = [];
  for (var i = 0; i < mapJson.features.length; i++) {
    mapData.push({
      name: mapJson.features[i].properties.name
      //id:mapJson.features[i].id
    });
  }
  return mapData;
}

</script>

<style>
body {
  /*background-image: url("../../assets/beijingtupian.png");*/
}
</style>

<style scoped>
.title {
  width: 100%;
  height: 10vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 10vh;
}
.box {
  position: absolute;
  width: 90%;
  height: 80vh;
  left: 5%;
  top: 10%;
  background-color: rgba(24, 27, 52, 0.62);
}

.chart {
  position: relative;
  width: 100%;
  height: 840px;
}
.backBtn {
  position: absolute;
  top: 0;
  background-color: #00c298;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
}
</style>
