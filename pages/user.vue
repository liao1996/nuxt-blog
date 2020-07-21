<template>
  <div class="container">
    <div class="stars"></div>
    <div class="moon"></div>
    <div class="twinkl"></div>
    <div class="userinfo" style>
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="个人简介">欢迎你:{{this.$store.state.user.userName}}</el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="阅读历史">阅读历史</el-tab-pane>
        <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
        <el-tab-pane label="安全设置">安全设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  middleware:"auth",
  name: "User",
  data() {
    return {
      tabPosition: "left"
    };
  }
};
</script>
<style scoped lang="scss" rel="stylesheet/stylus">
.container {
  .userinfo {
    width: 55vw;
    height: auto;
    margin: auto;
    position: relative;
    margin-bottom: 50px;
    color: beige;
    /deep/ .el-tabs__item {
      color: beige;
      &:hover {
        color: #DD22DD;
      }
    }
    /deep/ .el-tabs__item.is-active {
      color: #DD22DD ;
    }
  }
  .moon {
    position: absolute;
    top: 10rem;
    right: 10rem;
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
    opacity: 0.9;
    box-shadow: 0px 0px 40px 15px white;
    z-index: 1;
  }
  .stars,
  .twinkl {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .stars {
    background: #000 url(/stars.png) repeat top center;
    z-index: 0;
  }

  .twinkl {
    background: transparent url(/twinkling.png) repeat top center;
    z-index: 0;

    -moz-animation: move-twink-back 200s linear infinite;
    -ms-animation: move-twink-back 200s linear infinite;
    -o-animation: move-twink-back 200s linear infinite;
    -webkit-animation: move-twink-back 200s linear infinite;
    animation: move-twink-back 200s linear infinite;
  }

  @keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }
}
</style>