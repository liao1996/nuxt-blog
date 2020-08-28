<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <h2 class="header-title">个人简介</h2>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在你面前的是：发呆业务爱好者、柠檬吞噬者、国家一级退堂鼓表演艺术家、耳机依赖患者、宇宙一级潜在鸽王、退役熬夜选手、拖延俱乐部顶级VIP、资深网络表情包传播者、霍格沃茨废话大赛冠军、赖床世锦赛冠军得主！</p>
          <el-divider></el-divider>
          <img :src="fontImg" />
        </div>
      </el-col>
    </el-row>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      偶然看到一个博客网站
      <a href="https://surmon.me">surmon.me</a>遂对Nuxt产生了浓厚的兴趣，于是有了这个啥也不行的博客，第一次用Nuxt，肯定有很多毛病。希望偶然点进来的人不吝赐教。本着取之GitHub，用之GitHub。留下地址
      <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前端地址：
      <a
        href="https://github.com/llzhen228/nuxt-blog"
      >https://github.com/llzhen228/nuxt-blog</a>，使用的Nuxt+Element，
      <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后端地址：
      <a
        href="https://github.com/llzhen228/java-blog"
      >https://github.com/llzhen228/java-blog</a>，使用的spring+MqSql。
    </p>
    <el-divider content-position="left">感谢你的到来</el-divider>
    <strong>名称：</strong>
    <span>
      <i class="el-icon-user"></i>手辰
      <el-button type="primary" icon="el-icon-download" class="callme" round @click="open">简历</el-button>
    </span>
    <div class="bloghr" />
    <strong>电话：</strong>
    <span>
      <i class="el-icon-phone-outline"></i>1303127695
      <el-button type="primary" icon="el-icon-chat-line-square" class="callme" round @click="sendPhoto">短信</el-button>
    </span>
    <div class="bloghr" />
    <strong>邮件：</strong>
    <span>
      <i class="el-icon-message"></i>lzhen228@outlook.com
    </span>
    <div class="bloghr" />
    <strong>地址：</strong>
    <span>
      <i class="el-icon-location-information"></i>中国北京
    </span>
    <div class="bloghr" />
    <strong>技术：</strong>
    <span>
      <i class="el-icon-office-building"></i>HTML5, CSS3, JavaScript, Java, Vue, Nuxt, Egg, Koa, MySql,Linux
    </span>
    <clock-home class="clock" />
    <div class="about-map">
      <iframe class="iframe" src="/iframe/map.html" />
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import fontImg from "~/assets/img/font.png";
import { isPassword , sendtelPhoto} from "~/api/articlelist";
import ClockHome from "~/components/clock/ClockHome";

export default {

  name: "Aboutme",
  data() {
    return {
      fontImg: fontImg
    };
  },
  components: {
    ClockHome
  },
  mounted() {},
  methods: {
    open() {
      this.$prompt("请输入正确的验证码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder:"可以使用短信功能，系统会将验证码发送给您",
        inputPattern: /^\d{6}$/,
        inputErrorMessage: "验证码格式不正确"
      })
        .then(({ value }) => {
          isPassword(value).then(res => {
            if (res.result.data) {
              this.$message({
                type: "success",
                message: "验证码正确，正在为您打开下载链接"
              });
              t1 = window.setTimeout(
                window.open(
                  "http://eightythousand.com:12937/blog/index/download.htm"
                ),
                1000
              );
              window.clearTimeout(t1); //去掉定时器
            } else {
              this.$message({
                type: "error",
                message: "验证码错误"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    sendPhoto() {
      this.$prompt("请输入您的手机号，系统将把下载验证码发送给您", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^1[3456789]\d{9}$/,
        inputErrorMessage: "手机号格式不正确"
      })
        .then(({ value }) => {
          sendtelPhoto(value).then(res => {           
            if (res.result.code) {
              this.$message({
                type: "success",
                message: "发送成功，请查收"
              });              
            } else {
              this.$message({
                type: "error",
                message: "发送失败,失败原因:"+res.result.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.page {
  font-family: "微软雅黑";
  margin: 0 30rem;
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .grid-content {
    background: #d3dce6;
    border-radius: 4px;
    min-height: 36px;
    padding: 30px;
    font-size: 16px;
    img {
      margin: auto;
    }

    .header-title {
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      margin-top: 0;
      font-size: 18px;
    }
  }
  a {
    color: #409eff;
  }
  .bloghr {
    height: 1px;
    width: 100%;
    margin: 12px 0;
    background-color: #dcdfe6;
    position: relative;
  }
  button {
    z-index: 99;
    margin-left: 10px;
  }
  .clock {
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 50%;
    bottom: 0px;
    margin: auto;
  }
  .about-map {
    .iframe {
      z-index: 99;
      width: 100%;
      height: 25rem;
    }
  }
  /deep/ .callme{
    padding: 5px 10px;
  }
}
</style>
