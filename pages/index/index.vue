<template>
  <div class="container">
    <nav>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">推荐</el-menu-item>
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-menu-item index="2-1">前端</el-menu-item>
          <el-menu-item index="2-2">算法</el-menu-item>
          <el-menu-item index="2-3">架构</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">其他</template>
            <el-menu-item index="2-4-1">生活琐事</el-menu-item>
            <el-menu-item index="2-4-2">心灵鸡汤</el-menu-item>
            <el-menu-item index="2-4-3">天马行空</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled title="登陆后才能查看">消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="http://www.eightythousand.com" target="_blank">小喵八万</a>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </nav>
    <transition-group name="bolgList" tag="ul" class="bolg_list">
      <li v-for="(item,index) in blogList" :key="item.id" :hid="item.id" :data-index="index">
        <nuxt-link :to="{ name: 'index-detail-id', path:'/index/detail' ,query: {id: '1'}}">
          <!-- :class="{bolg_click:bolg.bolgListClick==item.id}"
         @mousedown="BolgDown"
          @mouseup="BolgUp"-->
          <div class="list_img_box">
            <!-- <img :src="item.imgUrl" alt="" class="list_img"> -->
            <div class="list_title_box">
              <div class="list_title">
                <i class="el-icon-d-arrow-left" size="20"></i>
                {{item.title}}
                <i class="el-icon-d-arrow-right" size="20"></i>
              </div>
              <p
                style="text-align: center;color: rgba(92,107,119,0.8);"
                class="list_time"
              >发布日期：&nbsp;&nbsp;&nbsp;{{parseTime(item.time)}}</p>
            </div>
          </div>
          <div class="list_info">
            <p class="list_content" v-html>{{text(item.content) | FontFilter}}</p>
            <div class="list_record">
              <span class="list_record_span" style="margin-left: 0px;">
                <i class="el-icon-view" size="15"></i>
                &nbsp;&nbsp;&nbsp;{{item.readNum}}
              </span>
              <span class="list_record_span">
                <i class="el-icon-star-on" size="15"></i>
                &nbsp;&nbsp;&nbsp;{{item.loveNum}}
              </span>
              <span class="list_record_span">
                <i class="el-icon-chat-line-round" size="15"></i>
                &nbsp;&nbsp;{{item.fontNum}}
              </span>
              <div class="list_tag">
                <div class="tag">
                  <i
                    :class="$store.state.tag[item.tag].style"
                    :style="{color:$store.state.tag[item.tag].color}"
                  >&nbsp;{{item.tag}}</i>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="new" v-if="(new Date()-new Date(item.time))/86400000<=newTime">new</div> -->
          <!-- <div class="hr"></div> -->
        </nuxt-link>
      </li>
    </transition-group>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { getBlogList } from "~/api/articlelist";
const getdata = () => {
   return   getBlogList()
    .then(res => {
      if (res.resultCode == 1) {
        return res.result.data;
      }
    })
    .catch(err => {   
    });
};
export default {
  components: {
    Logo
  },
  data() {
    return {
      activeIndex: "1",
      blogList: []
    };
  },
  async asyncData() {
    const data = await getdata();
    return { blogList: data };
  },
  mounted() {
    if (process.browser) {
      getdata().then(res => {
        this.blogList = res.result.data;
      });
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // BolgDown(el) {
    //   this.bolg.bolgListClick = el.currentTarget.getAttribute("hid");
    //   // this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
    // },
    // BolgUp(el) {
    //   this.$router.push("/Article/" + el.currentTarget.getAttribute("hid"));
    //   this.bolg.bolgListClick = "";
    // }

    text(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
      str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
      str = str.replace(/\s/g, ""); //将空格去掉
      return str;
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string" && /^[0-9]+$/.test(time)) {
          time = parseInt(time);
        }
        if (typeof time === "number" && time.toString().length === 10) {
          time = time * 1000;
        }
        date = new Date(time);
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
          return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        return value.toString().padStart(2, "0");
      });
      return time_str;
    }
  },
  filters: {
    FontFilter(val) {
      return val.substr(0, 200) + "...";
    }
  }
};
</script>

<style lang="stylus" scoped>
@import url('~/assets/pagecss/blogmain.css');

.container {
  nav {
    left: 0;
    background-color: #fff;
    position: fixed;
    top: 5rem;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    transform: translateZ(0);

    .el-menu-demo {
      left: 38rem;
    }
  }
}
</style>
