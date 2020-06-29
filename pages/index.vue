<template>
  <div class="container">
    <nav>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">全部</el-menu-item>
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-menu-item index="3">前端</el-menu-item>
          <el-menu-item index="4">算法</el-menu-item>
          <el-menu-item index="5">架构</el-menu-item>
          <el-submenu index="6">
            <template slot="title">其他</template>
            <el-menu-item index="7">生活琐事</el-menu-item>
            <el-menu-item index="8">心灵鸡汤</el-menu-item>
            <el-menu-item index="9">天马行空</el-menu-item>
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
        <nuxt-link :to="{ name: 'detail-id', path:'/detail' ,query: {id: item.id}}">
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
              >发布日期：&nbsp;&nbsp;&nbsp;{{item.time}}</p>
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
                    :class="$store.state.style.tag[item.tag].style"
                    :style="{color:$store.state.style.tag[item.tag].color}"
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

    <div class="head_left" :style="{top:headTop+'px',left:headLeft_2+'px'}">
      <div class="head_left_box">
        <div class="notice_box">
          <p class="notice_title">
            <i class="el-icon-date" style="line-height: 1px;margin-right: 10px;"></i>最新公告
          </p>
          <transition-group name="noticeList" tag="ul" class="notice_list">
            <li v-for="item in notice" :key="item.id">
              <!-- <Icon
                type="md-radio-button-on"
                color="rgb(138,43,226)"
                size="10"
                style="line-height: 1px;"
                class="notice_icon"
              />-->
              <span class="notice_time">{{item.time}}</span>
              <p class="notice_content">{{item.content}}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="head_right" :style="{top:headTop+'%',left:headLeft+'px'}">
      <!-- <Tooltip
        max-width="200"
        :always="tipStatus"
        :delay="tipDelay"
        placement="top"
        class="head_img_content_box"
        :content="tipContent"
      >
      </Tooltip>-->
      <div class="head_img_box">
        <img :src="headImg" alt />
        <!-- <Icon type="ios-contact" size="60"/> -->
      </div>
      <p class="head_intro">一只小透明的窝</p>
    </div>
  </div>
</template>

<script>
import headImg from "~/assets/img/header.jpg";
import Logo from "~/components/Logo.vue";
import { getBlogList } from "~/api/articlelist";
const getdata = (id = 0, falge = 0) => {
  return getBlogList(id, falge)
    .then(res => {
      if (res.resultCode == 1) {
        return res.result.data;
      }
    })
    .catch(err => {});
};
export default {
  components: {
    Logo
  },
  data() {
    return {
      headImg: headImg,
      headTop: 0,
      headLeft: 1070,
      headLeft_2: -220,
      activeIndex: "1",
      blogList: [],
      notice: [
        {
          id: 12,
          time: "2020-06-26",
          content: "第一"
        },
        {
          id: 11,
          time: "2020-02-04",
          content: "第二"
        },
        { id: 10, time: "2019-09-15", content: "第四" },
        {
          id: 9,
          time: "2019-08-12",
          content: "第三"
        }
      ]
    };
  },
  async asyncData() {
    const data = await getdata();
    return { blogList: data };
  },
  mounted() {
    if (process.browser) {
      getdata().then(res => {
        this.blogList = res;
      });
    }
  },
  methods: {
    handleSelect(key) {
       getdata(0,key).then(res => {
        this.blogList = res;
      });
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
