<template>
  <div id="speak">
<!--    <el-button-->
<!--    type="success"-->
<!--    class="el-icon-microphone"-->
<!--    @click="play()"-->
<!--    ></el-button>-->
    <i :class="{'el-icon-microphone':true,'icon':true,'active':active&&ifplay}" @click="play()"/>
    <span v-if="active"><i class="el-icon-video-pause icon" @click="paused()" v-if="ifplay"/>
    <i :class="{'el-icon-video-play':true, 'icon':true,'active':ifplay}" @click="paused()" v-else/></span>
  </div>
</template>

<script>
  /**
   * https://www.npmjs.com/package/speak-tts 官方
   *Speech.setVoice('Fiona')
   *Speech.setRate(1)
   *Speech.setVolume(1)
   *Speech.setPitch(1)
   *Speech.pause()
   *Speech.resume()
   *Speech.cancel()
   *Speech.pending()
   *Speech.paused()
   *Speech.speaking()
   */
  import Speech from 'speak-tts'
  import md5 from "@/utils/md5";
  export default {
    props:{
      voice: {
        type:String,
        required:true
      },
      volume: {
        type: Number,
        default: 1
      },
      lang:{
        type:String,
        default: 'zh-CN', // en.US
      },
      pitch: {
        type:Number,
        default:1,
      },
      splitSentences:{
        type:Boolean,
        default:true
      },
      queue:{
        type:Boolean,
        default:false
      }

    },
    watch: {
       lang(val) {
        // this.lang = val;
         console.log(val)
        this.speech.setLanguage(val)
      }
    },
    data(){
      return {
        active:false,
        ifplay:false,
        speech:null,
        support:true,
        appid:'20220724001282080',
        salt:new Date().getTime(),
        secretKey:'2H4LG690Vjvbu6nTEeXN',
      }
    },
    mounted() {
      this.SpeechInit();
      console.log('挂载speak 组件',this.lang)
    },
    methods:{
      SpeechInit(){
        this.speech = new Speech()
        // this.support = this.speech.hasBrowserSupport()
        this.speech.setLanguage(this.lang)
        this.speech.init({
          volume:this.volume,
          lang:this.lang,
          pitch:this.pitch,
          voice:this.voice,
          // listeners: {
          //   onvoiceschanged:(voices)=>{
          //     console.log('呵呵')
          //   }
          // }
        }).then(()=>{
        })
      },
      // 播放按钮
      play(){
        this.speech.speak({
          text:this.voice,
          queue:this.queue,
          listeners:{
            // 开始播放
            onstart:()=>{
              this.active=true;
              this.ifplay=true;
              // console.log("开始播放")
            },
            // 判断播放是否完毕
            onend:()=>{
              console.log("播放结束")
            },
            // 回复播放
            onresume:()=>{},
            onboundary:(event) =>{
            }
          },
        }).then(()=>{}).catch(e=>{

        })
      },
      // 暂停
      paused(){
        if(this.ifplay){
          this.speech.pause();
        }else{
          this.goahead();
        }
        this.ifplay=!this.ifplay;
      },
      // 从暂停处继续播放
      goahead(){
        this.speech.resume();
      },
    },
    // 离开页面取消语音
    destroyed() {
      this.speech.cancel();
    },

  }
</script>
<style lang="scss" scoped>
#speak{
  display: block !important;
  margin-top: 10px;
  width: 100%;
  height: 100%;
  .icon{
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    font-size: 25px;
    border-radius: 50%;
    transition: all ease .1s;
    cursor: pointer;
    margin-left: 5px;
    &:hover{
      background-color: #d6d6d6;
    }
  }
  .active{
    color: #fff;
    background-color: #349eff;
  }
}
</style>


