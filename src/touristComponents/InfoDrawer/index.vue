<template>
  <div id="Drawer">
    <div @click="drawer = true" type="primary" style="margin-left: 16px">
      <slot name="btn" class="avatar"></slot
      >
    </div>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :append-to-body="true"
      @open="open()"
    >
      <el-container>
        <el-aside width="70px" class="aside">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="true"
          >
            <el-menu-item index="1" @click="go('1')">
              <i class="el-icon-message"></i>
              <span slot="title">消息</span>
              <span slot="label" class="leftIcon">
                <el-badge :value="navList[0].new" class="iconNew"> </el-badge>
              </span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span slot="title">收藏</span>
                <span slot="label" class="leftIcon">
                  <el-badge :value="this.navList[1].new" class="iconNew">
                  </el-badge>
                </span>
              </template>
              <el-menu-item-group>
                <span slot="title">类别</span>
                <el-menu-item index="2-1" @click="go('2-1')">景点</el-menu-item>
                <el-menu-item index="2-2" @click="go('2-2')">文章</el-menu-item>
                <el-menu-item index="2-3" @click="go('2-3')"
                  >文创作品</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" @click="go('3')">
              <template slot="title">
                <i class="el-icon-time"></i>
                <span slot="title">历史记录</span>
                <span slot="label" class="leftIcon">
                <el-badge :value="this.navList[2].new" class="iconNew">
                </el-badge>
              </span>
              </template>
              <el-menu-item-group>
                <span slot="title">类别</span>
                <el-menu-item index="3-1" @click="go('3-1')">景点</el-menu-item>
                <el-menu-item index="3-2" @click="go('3-2')">文章</el-menu-item>
                <el-menu-item index="3-3" @click="go('3-3')"
                >文创作品</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container class="container">
          <div id="tab">
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '1'" class="view">
                <ul class="drawerUl message">
                  <li
                    v-for="(item, index) in messageList"
                    :key="index"
                    :class="[item.type == 0 ? 'Read' : '']"
                    @click="showMessageDialog(item)"
                  >
                    <span class="title" v-if="item.user">{{ item.user.nickName }}</span>
                    <span class="time">{{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}</span>
                    <span class="content">{{ item.commentContent }}</span>
                  </li>
                  <span v-if="messageList.length == 0" class="noTip"
                    >暂无消息哦</span
                  >
                  <el-dialog
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                    :append-to-body="true"
                  >
                    <span slot="title" v-if="currentItem.user"
                      >来自 {{ currentItem.user.nickName }} 的消息</span
                    >
                    <span>{{ currentItem.commentContent }}</span>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="dialogVisible = false"
                        >确 定</el-button
                      >
                    </span>
                  </el-dialog>
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '2-1'" class="view">
                <ul class="fav">
                  <li
                    v-for="(item, index) in favAttraction"
                    :key="index"
                    @click="gotoAttraction(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.sightsImage.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                        ><i class="el-icon-position"></i>{{ item.sightsName }}</span
                      >
                      <span class="favtime">收藏于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}</span>
                    </div>
                  </li>
                  <span v-if="favAttraction.length == 0" class="noTip"
                    >暂无收藏哦</span
                  >
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '2-2'" class="view">
                <ul class="fav">
                  <li
                      v-for="(item, index) in favArticle"
                      :key="index"
                      @click="gotoArticle(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.articleCover.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                      ><i class="el-icon-position"></i>{{ item.articleTitle }}</span
                      >
                      <span class="favtime">收藏于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}</span>
                    </div>
                  </li>
                  <span v-if="favCul.length == 0" class="noTip"
                  >暂无收藏哦</span
                  >
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '2-3'" class="view">
                <ul class="fav">
                  <li
                      v-for="(item, index) in favCul"
                      :key="index"
                      @click="gotoCul(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.culCreativityImage.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                      ><i class="el-icon-position"></i>{{ item.culCreativityTitle }}</span
                      >
                      <span class="favtime">收藏于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}
                      </span>
                    </div>
                  </li>
                  <span v-if="favCul.length == 0" class="noTip"
                  >暂无收藏哦</span
                  >
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '3-1'" class="view">
                <ul class="fav">
                  <li
                      v-for="(item, index) in hisAttraction"
                      :key="index"
                      @click="gotoAttraction(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.sightsImage.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                      ><i class="el-icon-position"></i>{{ item.sightsName }}</span
                      >
                      <span class="favtime">浏览于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}</span>
                    </div>
                  </li>
                  <span v-if="favAttraction.length == 0" class="noTip"
                  >暂无历史浏览记录哦</span
                  >
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '3-2'" class="view">
                <ul class="fav">
                  <li
                      v-for="(item, index) in hisArticle"
                      :key="index"
                      @click="gotoArticle(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.articleCover.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                      >{{ item.articleTitle }}</span
                      >
                      <span class="favtime">收藏于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}</span>
                    </div>
                  </li>
                  <span v-if="favCul.length == 0" class="noTip"
                  >暂无历史浏览记录哦</span
                  >
                </ul>
              </div>
            </transition>
            <transition name="fade" mode="out-in">
              <div v-if="this.type == '3-3'" class="view">
                <ul class="fav">
                  <li
                      v-for="(item, index) in favCul"
                      :key="index"
                      @click="gotoCul(item)"
                  >
                    <div class="leftbox">
                      <img :src="$store.state.front.url+item.culCreativityImage.split(',')[0]" alt="" />
                      <div class="cover"></div>
                    </div>
                    <div class="rightbox">
                      <span class="location"
                      >{{ item.culCreativityTitle }}</span
                      >
                      <span class="favtime">收藏于 {{  parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}')  }}
                      </span>
                    </div>
                  </li>
                  <span v-if="favCul.length == 0" class="noTip"
                  >暂无历史浏览记录哦</span
                  >
                </ul>
              </div>
            </transition>
          </div>
        </el-container>
      </el-container>
    </el-drawer>
  </div>
</template>

<script>
import {getFavCul,getHisCul} from '@/api/sights/cul_creativity'
import {getFavArticle,getHisArticle} from '@/api/article/article'
import {getAttractionFav,getAttractionHistory} from '@/api/attraction/attraction'
import {getUserMessage,hasReadMessage} from "@/api/user/user"
export default {
  data() {
    return {
      type: "1",
      title: this.drawerTitle,
      drawer: false,
      dialogVisible: false,
      tabPosition: "left",
      currentItem: {},
      navList: [
        { icon: "el-icon-message", name: "消息", new: 1 }, //new指的是未读消息数量
        { icon: "el-icon-star-off", name: "收藏", new: 1 },
        { icon: "el-icon-time", name: "历史" },
      ],
      messageList: [], //message
      favAttraction: [],
      favCul:[],
      favArticle:[],
      hisAttraction:[],
      hisArticle:[],
      hisCul:[]
    };
  },
  methods: {
    go(value) {
      this.type = value;
      console.log(this.type);
    },
    handleOpen() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    showMessageDialog(item) {
      this.dialogVisible = true;
      this.currentItem = item;
      item.type = 0;
      hasReadMessage([item.commentId]).then((response)=>{
        console.log(response)
      })
    },
    gotoAttraction(item) {
      this.$router.push({ path: "/frontHome/attractions/attraction", query: { id: item.sightsId } });
    },
    gotoArticle(item){
      this.$router.push({ path: "/frontHome/articlepage", query: { id: item.articleId } });
    },
    gotoCul(item){
      this.$router.push({ path: "/frontHome/culcreation", query: { id: item.culCreativityId } });
    },
    getAttractionFav(){
      getAttractionFav().then((response)=>{
        this.favAttraction=response.rows;
      })
    },
    getFavArticle(){
      getFavArticle().then((response)=>{
        this.favArticle=response.rows;
      })
    },
    getFavCul(){
      getFavCul().then((response)=>{
        this.favCul=response.rows;
      })
    },
    getAttractionHistory(){
      getAttractionHistory().then((response)=>{
        this.hisAttraction=response.rows;
      })
    },
    getHisArticle(){
      getHisArticle().then((response)=>{
        this.hisArticle=response.rows;
      })
    },
    getHisCul(){
      getHisCul().then((response)=>{
      })
    },
    getUserMessage(){
      getUserMessage().then((response)=>{
        this.messageList=response.rows;
      })
    },
    open(){
      this.getFavCul();
      this.getFavArticle();
      this.getAttractionFav();
      this.getAttractionHistory();
      this.getHisArticle();
      this.getHisCul();
      this.getUserMessage();
    }
  },
  mounted(){
    this.open();
  },
  props: ["drawerTitle", "direction"],
};
</script>

<style lang="scss" scoped>
.leftIcon {
  font-size: 22px;
}
.tabPane {
  height: 55px;
  line-height: 55px;
}
.container {
  width: 100%;
  height: 100%;
  background-color: red;
  #tab {
    width: 100%;
    position: relative;
    .view {
      position: absolute;
      top: 0;
      width: 100%;
      ::v-deep .el-tabs__item {
        height: 63px;
        line-height: 63px;
        font-size: 20px;
      }
      ::v-deep .drawerUl {
        padding-inline-start: 0px;
      }
      li {
        transition: all 0.3s ease-in-out;
      }
      .message li {
        position: relative;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 5px;
      }
      .fav li {
        display: flex;
        padding: 5px;
        &:hover .leftbox .cover {
          opacity: 1;
        }
        .leftbox {
          position: relative;
          width: 180px;
          height: 120px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cover {
            top: 0px;
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: all 0.3s ease-in-out;
          }
        }
        .rightbox {
          flex: 1;
          padding-left: 5px;
          padding-top: 5px;
          position: relative;
          .location {
            font-size: 18px;
            letter-spacing: 2px;
          }
          .favtime {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .title {
        display: block;
        padding-bottom: 10px;
        padding-top: 5px;
      }
      .time {
        position: absolute;
        top: 9px;
        right: 12px;
        font-size: 12px;
        color: #409eff;
      }
      .content {
        font-size: 14px;
      }
      .noTip {
        display: block;
        padding-top: 20px;
        height: 100%;
        text-align: center;
        color: #9499a0;
      }
      .Read {
        color: #5c5c5c;
        .time,
        .content,
        .time {
          color: #5c5c5c;
        }
      }
      ul li:hover {
        cursor: pointer;
        background-color: #e6e8ea;
      }
      ::v-deep .el-badge__content.is-fixed {
        top: 11px;
        right: 10px;
      }
      ::v-deep .el-badge__content {
        border-radius: 20px;
        color: #fff;
        display: inline-block;
        font-size: 6px;
        height: 21px;
        line-height: 18px;
        padding: 0px 6px;
      }
      ::v-deep .el-tabs__content {
        height: 100%;
        overflow-y: auto; /*浏览器决定*/
      }
    }
  }
}

.aside {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
