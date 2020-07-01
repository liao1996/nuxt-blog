<template>
  <div class="page">
    <clock-home />
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <h2 class="header-title">个人简介</h2>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在你面前的是：发呆业务爱好者、柠檬吞噬者、国家一级退堂鼓表演艺术家、耳机依赖患者、宇宙一级潜在鸽王、退役熬夜选手、拖延俱乐部顶级VIP、资深网络表情包传播者、霍格沃茨废话大赛冠军、赖床世锦赛冠军得主！</p>
           <el-divider></el-divider>
            <img :src="fontImg"  />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <h2 class="header-title">博客信息</h2>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            偶然看到一个博客网站
            <a
              href="https://surmon.me"
            >surmon.me</a>遂对Nuxt产生了浓厚的兴趣，于是有了这个啥也不行的博客，第一次用Nuxt，肯定有很多毛病。希望偶然点进来的人不吝赐教。本着取之GitHub，用之GitHub。留下地址
            <br />前端地址：
            <a
              href="https://github.com/liao1996/nuxt-blog"
            >https://github.com/liao1996/nuxt-blog</a>，使用的Nuxt+Element，
            <br />后端地址：
            <a
              href="https://github.com/liao1996/java-blog"
            >https://github.com/liao1996/java-blog</a>，使用的spring+MqSql。
          </p>
          <el-divider content-position="left">感谢你的到来</el-divider>
          <strong>名称：</strong>
          <span>手辰</span>
          <el-divider></el-divider>
          <strong>电话：</strong>
          <span>1303127695</span>
          <el-divider></el-divider>
          <strong>邮件：</strong>
          <span>lzhen228@outlook.com</span>
          <el-divider></el-divider>
          <strong>地址：</strong>
          <span>中国北京</span>
          <el-divider></el-divider>
          <strong>语言：</strong>
          <span>HTML5, CSS3, JavaScript, Java, VUE, MySql</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import fontImg from "~/assets/img/font.png";
import ClockHome from "~/components/clock/ClockHome";
export default {
  name: "Aboutme",
  data() {
    return {
      fontImg: fontImg,
    };
  },
  components: {
    ClockHome
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  background: #d3dce6;
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
  height: 58vh;
  font-size: 16px;
  img {
    width :100%
  }

  .header-title {
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    margin-top: 0;
    font-size: 18px;
  }
  /deep/ .el-divider--horizontal {
    margin: 2vh ,0 !important;
  }

  a {
    color: #409EFF;
  }
}
</style>
