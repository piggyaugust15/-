<template>
  <div id="user">
    <div class="container">
      <div class="profile">
        <div class="background">
          <img :src="$store.state.front.url + user.backgroundImage" alt="" />
          <button class="uploadimg" @click="openEditBackGround()" v-if="this.isShow">
            <i class="el-icon-camera-solid"></i>
            上传封面照片
          </button>
        </div>
        <div class="detail">
          <div class="img">
            <img :src="$store.state.front.url + user.avatar" alt="" />
          </div>
          <div class="content">
            <div class="name">
              <h2>{{ user.nickName }}</h2>
            </div>
            <div class="intro">{{ user.intro }}</div>
          </div>
          <button class="editprofile" @click="editProfile()" v-if="this.isShow">
            编辑个人资料
          </button>
          <button class="subscribe" @click="handlesubscribe()" v-else>
            关注
          </button>
          <el-dialog
            title="修改个人资料"
            :visible.sync="dialogFormVisible"
            width="500px"
            v-loading="editLoading"
          >
            <el-form :model="form" class="demo-ruleForm" :rules="rules">
              <el-form-item
                label="昵称"
                :label-width="formLabelWidth"
                prop="nickName"
              >
                <el-input v-model="form.nickName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱"
                prop="email"
                :label-width="formLabelWidth"
              >
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-radio-group v-model="form.sex">
                  <el-radio
                    v-for="dict in dict.type.sys_user_sex"
                    :key="dict.value"
                    :label="dict.value"
                    @change="judgeDel(dict.value)"
                    >{{ dict.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="个人简介"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-input v-model="form.intro" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="电话"
                prop="phonenumber"
                :label-width="formLabelWidth"
              >
                <el-input v-model="form.phonenumber" />
              </el-form-item>
              <el-form-item
                label="头像"
                prop="avatar"
                :label-width="formLabelWidth"
              >
                <imageUpload v-model="form.avatar" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false;this.editLoading=true;">取 消</el-button>
              <el-button type="primary" @click="changeProfile()"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-dialog
            title="修改资料卡背景"
            :visible.sync="dialogEditVisible"
            width="500px"
          >
            <el-radio-group v-model="edit.background" class="edit">
              <el-radio
                v-for="(item, index) in edit.list"
                :key="index"
                :label="index"
              >
                <img
                  :src="$store.state.front.url + item"
                  alt=""
                  class="editBImg"
                />
              </el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeBackImg()"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
        <div class="bottom">
          <div class="tab">
            <el-tabs v-model="activeName">
              <el-tab-pane label="文章" name="first">
                <div v-if="this.article.length>0">
                  <li v-for="(item, index) in article" :key="index" >
                    <div class="infobox">
                      <div class="top">
                        <div class="tag article">文章</div>
                        <span class="title">{{ item.articleTitle }}</span>
                      </div>
                      <div class="box">
                        <div class="leftbox">
                          <img
                              :src="$store.state.front.url + item.articleCover"
                              alt=""
                          />
                        </div>
                        <div class="rightbox">
                        <span v-html="item.articleContent" class="content">
                        </span>
                        </div>
                      </div>
                      <div class="buttonList">
                        <button class="thumbup">
                          <i class="el-icon-caret-top icon"></i> 赞同
                          {{ item.articleLike }}
                        </button>
                        <button class="thumbdown">
                          <i class="el-icon-caret-bottom icon"></i>
                        </button>
                        <span class="comment inline"
                        ><i class="el-icon-chat-line-round"></i> 评论</span
                        >
                        <span class="share inline"
                        ><i class="el-icon-s-promotion"></i> 分享</span
                        >
                        <span class="fav inline"
                        ><i class="el-icon-star-off"> 收藏</i></span
                        >
                      </div>
                    </div>
                  </li>
                </div>

                <el-empty description="这里暂时还没有文章哦"  v-else ></el-empty>
              </el-tab-pane>
              <el-tab-pane label="文创" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="收藏" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div>
          <div class="data">
            <div class="box">
              <div class="todaylike item">
                <p class="today">今日阅读数</p>
                <p class="number">0</p>
                <p class="yesterday">昨日数据</p>
              </div>
              <div class="todayview item">
                <p class="today">今日赞同数</p>
                <p class="number">0</p>
                <p class="yesterday">昨日数据</p>
              </div>
            </div>
            <button @click="gotocreation()">
              <i class="el-icon-s-promotion"></i> 进入创作中心
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article/article";
import { getUserInfo, changeBacImg,getUserProfile,changeUserProfile } from "@/api/user/user";
import { getDyTypeset } from "@/api/system/typeset.js";
import store from "@/store";
export default {
  dicts: ["sys_user_sex"],
  data() {
    return {
      flag:this.$route.query.id,
      editLoading:true,
      // url: process.env.VUE_APP_BASE_API,
      isShow:true,
      activeName: "first",
      article: [],
      user: {},
      dialogFormVisible: false,
      dialogEditVisible: false,
      edit: {
        background: "",
        list: [],
      },
      form: {
        nickName: "",
        email: "",
        intro: "",
        phoneNumber: "",
        sex: "",
        avatar: "",
        backgroundImage: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 1 到 15 个字符", trigger: "blur" },
        ],
        email: [{ required: false, message: "请输入邮箱", trigger: "change" }],
        intro: [
          { required: false, message: "请输入个人介绍", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 1 到 50 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    gotocreation() {
      this.$router.push("/frontHome/creation/index");
    },
    openEditBackGround() {
      this.dialogEditVisible = true;
      getDyTypeset(1, 9).then((response) => {
        this.edit.list = response.data[0].typesetImage.split(",");
        console.log("123", response);
      });
    },
    getInfo() {
      if(this.flag===undefined){
        this.flag=-1;
      }
      getUserInfo(this.flag).then((response) => {
        this.user = response.data;
        this.isShow=response.ifSelf;
      });
    },
    changeBackImg() {
      this.dialogEditVisible = false;
      let background = this.edit.background;
      changeBacImg(background).then((response) => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: "success",
          });
        } else {
          this.$message.err(response.msg);
        }
        this.getInfo();
      });
    },
    editProfile(){
      this.dialogFormVisible = true;
      getUserProfile().then((response)=>{
        console.log('edit',response)
        this.form=response.data;
        this.editLoading=false;
      })
    },
    changeProfile(){
      changeUserProfile(this.form).then((response)=>{
        if(response.code==200){
          this.$message({
            message:response.msg,
            type:'success'
          })
          store.commit('SET_AVATAR', process.env.VUE_APP_BASE_API+this.form.avatar);
          store.commit('SET_NAME', this.form.nickName);
        }else{
          this.$message.err(response.msg)
        }
        this.dialogFormVisible = false;

        this.getInfo();
      })
    },
    handlesubscribe(){

    },
    getUerArticleList(){
      if(this.flag===undefined){
        this.flag=-1;
      }
      getArticleList(this.flag).then((response) => {
        this.article = response.rows;
      });
    }
  },
  mounted() {
      this.getInfo();
      this.getUerArticleList();
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
#user {
  padding-top: 60px;
  .container {
    width: 1340px;
    margin: 0 auto;
    padding: 10px;
    .background {
      position: relative;
      width: 100%;
      height: 132px;
      background-color: #999999;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .uploadimg {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 120px;
        height: 40px;
        border: 1px solid #d3d3d3;
        background-color: transparent;
        border-radius: 5px;
        color: #d3d3d3;
        background: none;
        border: 1px solid;
        border-radius: 3px;
        cursor: pointer;
        text-align: center;
      }
    }
    .detail {
      position: relative;
      .img {
        position: absolute;
        width: 160px;
        height: 160px;
        left: 20px;
        top: -30px;
        background-color: #060a09;
        border-radius: 10px;
        border: 4px solid #fff;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content {
        position: relative;
        left: 200px;
        padding: 10px;
        // background-color: red;
        .name {
          font-weight: 700;
        }
      }
      .editprofile,.subscribe {
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 100px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #409eff;
        color: #409eff;
        cursor: pointer;
        background-color: #e6f0fd;
      }
      .edit {
        ::v-deep.el-radio-group {
          display: flex;
          // align-items: center;
        }
        ::v-deep.el-radio {
          display: flex;
          // justify-content: center;
          align-items: center;
        }
      }
      .editBImg {
        width: 150px;
        height: 100px;
      }
    }
    .bottom {
      display: flex;
      padding: 10px;
      margin-top: 50px;
      .tab {
        width: 900px;
        li {
          border-bottom: 1px solid #d6d6d6;
          padding: 5px;
          padding-bottom: 15px;
          .infobox {
            cursor: pointer;
            .top {
              display: flex;
              align-items: center;
              padding: 10px 0px 10px 0px;
              .tag {
                display: inline-block;
                width: 34px;
                height: 20px;
                font-size: 13px;
                line-height: 20px;
                text-align: center;
                border-radius: 5px;
                color: #fff;
                margin-right: 5px;
              }
              .article {
                background-color: #1e90ff;
              }
              .creation {
                background-color: #f08080;
              }
              .sights {
                background-color: #67c23a;
              }
              .title {
                display: inline-block;
                font-size: 25px;
                transition: all 0.1s ease-in-out;
                font-weight: 600;
              }
            }
            .box {
              display: flex;
              margin-bottom: 15px;
              height: 130px;
              overflow: hidden;
              .leftbox {
                width: 210px;
                height: 130px;
                border-radius: 10px;
                overflow: hidden;
                margin-right: 15px;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .rightbox {
                flex: 1;
                word-break: break-word;
                line-height: 1.6;
                white-space: normal;
                .content {
                  word-break: break-all;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow-y: hidden;
                  line-height: 30px;
                }
              }
            }
            .buttonList {
              button {
                text-align: center;
                display: inline-block;
                height: 30px;
                border: none;
                cursor: pointer;
                border-radius: 3px;
                color: #056de8;
                background-color: #e6f0fd;
                &:hover {
                  background-color: #dae9fc;
                }
              }
              .inline {
                margin-right: 20px;
                cursor: pointer;
                color: #8590a6;
                &:hover {
                  color: #606a7e;
                }
              }
              .thumbup {
                display: flex;
                display: inline-block;
                justify-content: center;
                align-items: center;
                width: 100px;
                margin-right: 5px;
                .icon {
                  font-size: 17px;
                }
              }
              .thumbdown {
                width: 30px;
                margin-right: 15px;
              }
            }
          }
          .box:hover {
            + .top {
              .title {
                color: #175199;
              }
            }
          }
        }
      }
      .data {
        flex: 1;
        margin-left: 20px;
        height: 100%;
        padding: 10px;
        // background-color: green;
        .box {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .item {
            text-align: center;
            .today {
              font-size: 12px;
              line-height: 22px;
              color: #a4acbd;
            }
            .yesterday {
              box-sizing: border-box;
              margin: 0px;
              min-width: 0px;
              color: rgb(99, 133, 166);
            }
            .number {
              font-size: 18px;
              font-synthesis: style;
              font-weight: 600;
              line-height: 28px;
            }
          }
        }
        button {
          display: block;
          margin: 0 auto;
          width: 100%;
          height: 54px;
          border: 1px solid #409eff;
          // background-color: #409eff;
          border-radius: 5px;
          margin-top: 20px;
          color: #409eff;
          font-size: 16px;
          transition: all 0.2s ease;
          background-color: #e6f0fd;
          cursor: pointer;
          i {
            font-size: 20px;
          }
          &:hover {
            background-color: #409eff;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>