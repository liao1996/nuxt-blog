<template>
  <div class="page"></div>
</template>

<script type="text/ecmascript-6">
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
            setTimeout(() => {
              this.$router.push("/user");
            }, 1000);
            console.log(userName);
          } else {
            this.$message({
              type: "error",
              message: "登录失败"
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          }
        })
        .catch(err => {
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
