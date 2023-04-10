<template>
  <div id="manuscriptlist" v-loading="loading">
    <el-empty
        description="一个稿件都没有，请换个筛选条件(''▔□▔)"
        v-if="List.length == 0"
    ></el-empty>
    <ul v-else>
      <li v-for="(item, index) in List" :key="index">
        <div class="img">
          <img :src="$store.state.front.url + item.culCreativityImage.split(',')[0]" alt="" />
        </div>
        <div class="rightbox">
          <span class="title">
            {{ item.culCreativityTitle }}
          </span>
          <span class="time">{{ item.createTime }}</span>
          <div class="tags">
            <span class="view"
            ><i class="el-icon-s-data"></i>{{ item.culCreativityView }}</span
            >
            <span class="thumbsup"
            ><i class="el-icon-thumb"></i>{{ item.culCreativityLike }}</span
            >
            <span class="favourite"
            ><i class="el-icon-star-off"></i>{{ item.culCreativityCollection }}</span
            >
          </div>
          <div class="btn">
            <el-button
                icon="el-icon-edit"
                class="edit"
                @click="gotoEdit(item.culCreativityId)"
            >编辑</el-button
            >
            <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="handleConfirm([item.culCreativityId])"
            >
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { deleteManuscript } from "@/api/cul/cul";
import deletePopover from "../deletePopover/index";
import { getCulByWays } from "@/api/cul/cul.js";
import { getDraft } from "@/api/cul/cul.js";
export default {
  data() {
    return {
      loading: true,
      List: [],
    };
  },
  components: { deletePopover },
  methods: {
    handleConfirm([item]) {
      this.loading = true;
      deleteManuscript([item]).then((response) => {
        console.log(response);
        this.getInfo();
      });
    },
    getInfo() {
      if (this.type === 3) {
        getDraft().then((response) => {
          console.log(response);
          this.List = response.rows;
          this.loading = false;
        });
      } else {
        getCulByWays(this.type).then((response) => {
          console.log('cul',response)
          this.List = response.rows;
          // this.$emit("get", this.List.length);
          this.loading = false;
        });
      }
    },
    gotoEdit(id) {
      this.$router.push({
        path: "/frontHome/Creation/submission",
        query: {
          type: "edit",
          id: id,
          arg:'cul',
        },
      });
    },
  },
  mounted() {
    this.getInfo();
  },
  props: ["type"],
};
</script>

<style lang="scss" scoped>
$font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial,
"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
ul {
  li {
    display: flex;
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid #e7e7e7;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &:hover {
      background-color: #fafafa;
    }
    .img {
      width: 154px;
      height: 96px;
      border-radius: 10px;
      padding-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightbox {
      position: relative;
      flex: 1;
      .title {
        display: block;
        font-size: 16px;
        color: #212121;
        padding-bottom: 15px;
        font-family: $font;
      }
      .time {
        display: block;
        font-size: 14px;
        color: #505050;
        font-family: $font;
        padding-bottom: 20px;
      }
      .tags {
        span {
          padding-right: 20px;
          font-family: $font;
          font-size: 12px;
          color: #99a2aa;
          i {
            padding-right: 5px;
          }
        }
      }
      .btn {
        position: absolute;
        right: 20px;
        top: 40px;
        .edit {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>