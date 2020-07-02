<template>
  <div class="page">
    <clock-home />
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
    <span><i class="el-icon-user"></i>手辰</span>
    <div class="bloghr" />
    <strong>电话：</strong>
    <span><i class="el-icon-phone-outline"></i>1303127695</span>
    <div class="bloghr" />
    <strong>邮件：</strong>
    <span><i class="el-icon-message"></i>lzhen228@outlook.com</span>
    <div class="bloghr" />
    <strong>地址：</strong>
    <span><i class="el-icon-location-information"></i>中国北京</span>
    <div class="bloghr" />
    <strong>技术：</strong>
    <span><i class="el-icon-office-building"></i>HTML5, CSS3, JavaScript, Java, Vue, Nuxt, Egg, Koa, MySql,Linux</span>
  </div>
</template>

<script type="text/ecmascript-6">
import fontImg from "~/assets/img/font.png";
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
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.page {
  font-family: "微软雅黑";
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
}
</style>
