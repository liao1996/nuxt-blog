<template>
  <div class="page"></div>
</template>

<script type="text/ecmascript-6">
const LOGOUT_RUL = process.env.LOGOUT_RUL;
import { getUserInfo } from "~/api/user";
export default {
  data() {
    return {};
  },
  mounted() {
    this.code = this.$route.query.code;
    if (this.code) {
      this.get();
    }
  },
  methods: {
    get() {
      let params = this.code;
      getUserInfo(params)
        .then(res => {
          if (res.result.data) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            const userName = JSON.parse(res.result.data).login;
            this.$store.commit("user/setUser", userName);
            alert(userName)
          } else {
            this.$message({
              type: "error",
              message: "登录失败"
            });
          }
          	window.location.href = 'http://localhost:3000/'
        })
        .catch(err => {});
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
