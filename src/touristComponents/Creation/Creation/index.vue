<template>
  <div id="creation">
    <el-container class="el-container">
      <el-aside width="200px">
        <el-col :span="12" class="el-col">
          <!-- <el-button
            type="primary"
            class="submissionBtn"
            icon="el-icon-s-promotion"
            @click="go()"
          >
            投稿
          </el-button> -->
          <el-menu
            default-active="/frontHome/Creation/index"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
          >
            <el-menu-item index="/frontHome/Creation/submission" class="btn">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">投稿</span>
            </el-menu-item>
            <el-menu-item index="/frontHome/Creation/index">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组</template>
                <el-menu-item index="/frontHome/Creation/manuscript"
                  >稿件管理</el-menu-item
                >
                <el-menu-item index="/frontHome/Creation/appeal"
                  >申诉管理(待完善)</el-menu-item
                >
                <el-menu-item index="/frontHome/Creation/draft"
                  >草稿箱</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/frontHome/Creation/comment">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/frontHome/Creation/convention">
              <i class="el-icon-collection"></i>
              <span slot="title">创作公约</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main
        ><div class="routerview">
          <transition name="fade" mode="out-in">
            <router-view > </router-view>
          </transition></div
      ></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    go() {
      this.$router.push("/frontHome/Creation/submission");
    },
  },
};
</script>

<style lang="scss" scoped>
#creation {
  a {
    text-decoration: none;
    color: black;
  }
  width: 100%;
  padding-top: 60px;
  ::v-deep .el-col {
    position: fixed;
    width: 195px;
    height: 100%;
    ul {
      width: 100%;
      height: 100%;
      border-color: transparent;
    }
  }
  // .submissionBtn {
  //   display: block;
  //   margin: 0 auto;
  //   margin-top: 20px;
  //   margin-bottom: 20px;
  //   font-size: 17px;
  //   color: #fff;
  // }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1890ff;
    width: 100px;
    height: 40px;
    color: #fff;
    margin: 0 auto;
    font-size: 17px;
    margin-bottom: 20px;
    border-radius: 5px;
    margin-top: 20px;
    i {
      color: #fff;
    }
    &:hover {
      outline: none;
      background-color: #46a6ff;
    }
  }
  .submissionBtn a {
    color: #fff;
  }
  ::v-deep .el-container {
    height: 100%;
  }
  .routerview {
    width: 1340px ;
    margin: 0 auto;
    background-color: #fafafa;
    padding: 20px;
    padding-left: 150px;
    padding-right: 150px;
  }
  .el-main {
    height: calc(100vh - 60px); //搞了我好久
    padding: 0px;
    background-color: #fafafa;
  }
  .el-aside {
    height: 500px;
  }
  ::v-deep .el-col {
    height: 100%;
  }
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
