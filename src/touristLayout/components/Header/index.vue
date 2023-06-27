<template>
  <div id="Header" :class="{ isHide: isHide }">
    <div class="header">
      <div class="logo">
        <img src="@/assets/images/LogoGreen.png" alt="" />
      </div>
      <div class="nav_div">
        <router-link to="/frontHome/home">主页</router-link>
        <router-link to="/frontHome/new" active-class="active"
          >快讯</router-link
        >
        <router-link to="/frontHome/attractions" active-class="active"
          >景点</router-link
        >
        <router-link to="/frontHome/culcreationHome" active-class="active"
          >文创</router-link
        >
        <router-link to="/frontHome/article" active-class="active"
        >漫记</router-link
        >
        <router-link to="/frontHome/map">地图</router-link>
      </div>
      <div class="search" v-if="this.$route.path != '/frontHome/home'">
        <Search></Search>
      </div>

      <div class="avatar">
        <!-- <el-button
          class="login"
          @click="jumpToLogin"
          v-if="this.$store.state.user.token == ''"
          >登录</el-button
        >
        <el-button class="register" v-if="this.$store.state.user.token == ''"
          >注册</el-button
        > -->
        <ul>
          <li>
            <router-link to="/frontHome/creation/index">
              <div class="icon_box">
                <div>
                  <i class="fa fa-puzzle-piece fa-lg" aria-hidden="true"></i>
                </div>
                <div class="text">创作中心</div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/frontHome/subscription" active-class="active">
              <div class="icon_box">
                <i class="fa fa-bell fa-lg" aria-hidden="true"></i>
                <div class="text">文创订阅</div>
              </div>
            </router-link>
          </li>
        </ul>
        <li>
          <span class="username" @click="gotoProfile">{{ $store.state.user.name }}</span>
        </li>
        <li>
          <InfoDrawer
              :drawerTitle="drawer.drawerTitle"
              :direction="drawer.direction"
          >
<!--            <el-avatar-->
<!--                :src="$store.state.user.avatar"-->
<!--            ></el-avatar>-->
            <div id="avatar" slot="btn">
              <el-popover
                  placement="bottom"
                  width="100"
                  trigger="hover"
                  style="display: flex;width: 100%;justify-content: center;"
              >
                  <el-button divided @click.native="logout" class="downBtn">退出登录</el-button>
                  <el-button divided @click.native="changeLanguage" class="downBtn">选择语言</el-button>
                <img :src="$store.state.user.avatar" alt="" slot="reference">
              </el-popover>
            </div>
            >
          </InfoDrawer>
        </li>
      </div>
    </div>
    <el-dialog
        title="选择主语言"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        append-to-body
    >
      <el-radio-group v-model="$store.state.front.lang">
        <el-radio v-for="(item,index) in langList" :key="index"  :label="item.audioId">{{item.baiduLabel}}-{{item.langEn}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Drawer from "@/touristComponents/Drawer";
import InfoDrawer from "@/touristComponents/InfoDrawer";
import Search from "@/touristComponents/Search";
import Speak from "@/components/Speak";
import {getLangList} from "@/api/system/translate";
export default {
  name: "Header",
  data() {
    return {
      drawer: {
        drawerTitle: "你好 ! " + this.$store.state.user.name,
        direction: "rtl",
      },
      dialogVisible: false,
      oldScrollTop: 0,
      isHide: false,
      style: { backgroundColor: "", transition: "all ease-in-out .3s" },
      langList:[]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    jumpToLogin(item) {
      if (this.$route.path === "/Login") {
        this.$message("你已经在登陆界面啦~");
        return;
      }
      this.$router.push("/Login");
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;
      if (scrollStep < 0) {
        this.isHide = false;
      } else {
        this.isHide = true;
      }
    },
    gotoProfile(){
      this.$router.push({
      path :'/frontHome/user',
  })
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    },
    changeLanguage(){
      this.dialogVisible=true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    getLangList(){
      getLangList().then((res)=>{
        this.langList=res.data;
      })
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // if (
    //   this.$route.path == "/Attractionspage" ||
    //   this.$route.path == "/Attractionspage"
    // ){
    // }
    this.getLangList();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: { Drawer, Search, InfoDrawer },
};
</script>
<style lang="scss" scoped>
::v-deep.el-radio-group{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}
::v-deep.el-radio{
  width: 120px;
  margin: 10px;
}
li {
  list-style: none;
  font-size: 14px;
}
#Header a {
  text-decoration: none;
  color: #222227;
  text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 30%);
  transition: 0.3s all ease-in-out;
}
#Header a:hover {
  color: rgb(0, 123, 255);
}
#Header .active {
  color: rgb(0, 123, 255);
}
#Header {
  position: relative;
  height: 60px;
  margin-bottom: 30px;
  position: fixed;
  z-index: 100;
  width: 100%;
  color: #222227;
  top: 0;
  background-color: #fff;
  box-shadow: 0 1px 12px 0 rgba(204, 204, 204, 0.72);
  transition: all 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Lato,
    Roboto, PingFang SC, Microsoft YaHei, sans-serif !important;
}
#Header .header {
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  .username{
    cursor: pointer;
    &:hover{
      color: rgb(0, 123, 255);
    }
  }
}
#Header.isHide {
  top: -60px;
  background-color: rgba(255, 255, 255, 0.294);
}

#Header .header.isHide {
  color: rgb(0, 0, 0);
}
#Header .header .logo {
  position: absolute;
  display: inline-block;
  width: 220px;
  height: 56px;
  left: 30px;
  // margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#Header .el-menu-demo {
  width: 100%;
}
#Header .nav_div a {
  display: inline-block;
  font-size: 18px;
  text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 30%);
  line-height: 40px;
  margin-right: 20px;
}
#Header .nav_div {
  height: 40px;
  margin-left: 130px;
  display: inline-block;
}

#Header .search {
  display: inline-block;
  // height: 100%;
}
#Header .avatar {
  position: absolute;
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  align-items: center;
  justify-content: center;
  right: 90px;
  top: 10px;
  .img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#Header .avatar .login,
#Header .avatar .register {
  color: #333;
  background-color: transparent;
  border: none;
  transition: all 0.3s ease-in-out;
}

#Header .avatar .login:hover,
#Header .avatar .register:hover {
  background-color: #409eff;
  color: #fff;
}
#Header .avatar .register {
  margin-right: 15px;
}
#Header .avatar span {
  font-size: 14px;
  padding-right: 10px;
}

#Header ul li {
  display: inline-block;
  text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 30%);
}
#Header ul li .icon_box {
  position: relative;
  //height: 50px;
  text-align: center;
  margin-top: -10px;
  margin-right: 15px;
}

#Header ul li i {
  margin: 0 auto;
}
#Header ul li .text {
  margin:  auto;
}
#Header #avatar:hover {
  cursor: pointer;
}
.username {
  color: #333;
}
#avatar{
  position: relative;
  width: 50px;
  height: 50px;
  .list{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 200px;
    background-color: red;
  }
  img{
    //position: absolute;
    //top: 0;
    //left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    transition: all ease .3s;
    z-index: 1;
  }
}
.downBtn{
  margin: 0 auto 10px 5px;
  text-align: center;
}
</style>
