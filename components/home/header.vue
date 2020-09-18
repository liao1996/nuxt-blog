<template>
  <header class="v-header">
    <div class="header-container">
      <nuxt-link to="/">
        <img src="~/assets/img/lzLogo.png" class="logo-img" />
      </nuxt-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <v-dropdown   @changeLoginShow="getChild"/>
          </li>
          <li class="nav-item search">
            <v-input />
          </li>
          <li class="nav-item auth">
            <span class="login" @click="openLogin">登录</span>           
          </li>
        </ul>
      </nav>
    </div>
    <login v-show="loginShow"  @changeLoginShow="getChild" />
  </header>
</template>

<script>
import { mapState } from "vuex";
import VDropdown from "./dropdown";
import Login from "@/components/Login";
import VInput from "@/components/input";

export default {
  name: "VHeader",
  components: {
    VDropdown,
    VInput,
    Login
  },
  data() {
    return {
      maxClientWidth: 980,
      loginShow:false
    };
  },
  computed: {
    ...mapState({
      isPhone: state => state.isPhone
    })
  },
  mounted() {
    const self = this;
    // document.body.onresize = () => {
      if (document.body.clientWidth > self.maxClientWidth) {
        self.$store.commit("isPhone/PCORPHONE", false);
      } else {
        self.$store.commit("isPhone/PCORPHONE", true);
      }
    //};
  },
  methods:{
    openLogin(){
      this.loginShow=true

    },
    getChild(v){
      this.loginShow = v
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/stylus/header';

.v-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 103;
  height: 5rem;
  background: #fff;
  color: #909090;
  border-bottom: 1px solid #f1f1f1;

  .header-container {
    max-width: 960px;
    height: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    position: relative;

    .logo-img {
      width: 10rem;
      height: 4rem;
    }
  }

  .main-nav {
    height: 100%;
    flex: 1 0 auto;
  }
  
}

@media (max-width: 960px) {
  .v-header {
    .header-container {
      width: 85%;
    }
  }
}
</style>
