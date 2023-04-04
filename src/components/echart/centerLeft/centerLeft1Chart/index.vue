<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
  import Chart from './chart.vue';
  export default {
    data () {
      return {
        time:'',
        cdata: {
          xData: ["文章收藏", "文章点赞", "文章浏览", "文创收藏", "文创点赞", "文创浏览"],
          seriesData: [
            { value: 20, name: "文章收藏" },
            { value: 45, name: "文章点赞" },
            { value: 160, name: "文章浏览" },
            { value: 4, name: "文创收藏" },
            { value: 5, name: "文创点赞" },
            { value: 7, name: "文创浏览" }
          ]
        },
      }
    },
    props:{
      articlePie:{
        type:Object,
        required:true,
      },
      culPie:{
        type:Object,
        required:true,
      }
    },
    components: {
      Chart,
    },
    // watch:{
    //   articlePie:{
    //     deep:true,
    //     immediate:true,
    //     handler(newItem,oldItem){
    //       this.cdata.seriesData[0].value = newItem.articleCollect;
    //       this.cdata.seriesData[1].value = newItem.articleLike;
    //       this.cdata.seriesData[2].value = newItem.articleView;
    //     }
    //   },
    //   culPie:{
    //     deep:true,
    //     immediate:true,
    //     handler(newItem,oldItem){
    //       this.cdata.seriesData[3].value = newItem.culCreativityCollection;
    //       this.cdata.seriesData[4].value = newItem.culCreativityLike;
    //       this.cdata.seriesData[5].value = newItem.culCreativityView;
    //     }
    //   }
    // },
  }
</script>
