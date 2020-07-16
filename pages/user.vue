<template>
  <div class="page">
    欢迎你:{{this.$store.state.user.userName}}<br/>
    该页面登陆后才可以进入，用作后续鉴权处理
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  middleware: "auth",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
