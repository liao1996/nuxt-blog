<template>
  <div class="auth-modal-box" @click="firstShow">
    <form class="auth-form">
      <div class="panfish">
        <img
          v-show="first"
          src="http://eightythousand.com:520/assets/normal.0447fe9.png"
          class="normal"
        />
        <img
          v-show="second"
          src="http://eightythousand.com:520/assets/greeting.1415c1c.png"
          class="greeting"
        />
        <img
          v-show="thirdly"
          src="http://eightythousand.com:520/assets/blindfold.58ce423.png"
          class="blindfold"
        />
      </div>
      <i title="关闭" class="close-btn el-icon-circle-close" @click="loginClose"></i>
      <div class="panel">
        <h1 class="title">登录</h1>
        <div class="input-group">
          <div class="input-box">
            <input
              name="loginPhoneOrEmail"
              maxlength="64"
              @click="secondShow"
              placeholder="当前登陆无意义，只是能进入用户界面"
              class="input"
            />
          </div>
          <div class="input-box">
            <input
              @click="thirdlyShow"
              name="loginPassword"
              type="password"
              maxlength="64"
              placeholder="只做了GitHub第三方登录"
              class="input"
            />
          </div>
        </div>
        <button class="btn">登录</button>
        <div class="prompt-box">
          没有账号？
          <span class="clickable">注册</span>
          <span class="right clickable">忘记密码</span>
        </div>
      </div>
      <div class="agreement-box">
        注册登录即表示同意
        <a href="/protocol.html" target="_blank">用户协议</a>、
        <a href="/privacy.html" target="_blank">隐私政策</a>
      </div>

      <div class="oauth-box">
        <div v-if="isOther" class="hint" @click="isOther = false">
          <a>第三方登录</a>
        </div>
        <div v-else class="oauth">
          <div class="oauth-bg">
            <img
              title="微博"
              alt="微博"
              src="http://eightythousand.com:520/assets/weibo.fa758eb.svg"
              class="oauth-btn"
            />
          </div>
          <div class="oauth-bg">
            <img
              title="微信"
              alt="微信"
              src="http://eightythousand.com:520/assets/wechat.e0ff124.svg"
              class="oauth-btn"
            />
          </div>
          <div class="oauth-bg" @click="githubLogin">
            <img
              title="GitHub"
              alt="GitHub"
              src="http://eightythousand.com:520/assets/github.547dd8a.svg"
              class="oauth-btn"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      first: true,
      second: false,
      thirdly: false,
      username: "",
      userpassword: "",
      isOther: true
    };
  },
  mounted() {},
  methods: {
    githubLogin() {
      window.open(
        "https://github.com/login/oauth/authorize?client_id=64466896abdc4ee6f609&redirect_uri=http://eightythousand.com:80/gitCallback",
        "_self"
      );
    },
    loginClose() {
      this.$emit("changeLoginShow", false);
      this.isOther = true;
    },
    firstShow(e) {
      if (e.target.className != "input") {
        (this.first = true), (this.second = false), (this.thirdly = false);
      }
    },
    secondShow(e) {
      (this.first = false), (this.second = true), (this.thirdly = false);
    },
    thirdlyShow() {
      (this.first = false), (this.second = false), (this.thirdly = true);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.auth-modal-box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;

  .auth-form {
    position: relative;
    padding: 2rem;
    width: 26.5rem;
    max-width: 100%;
    font-size: 1.167rem;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;

    .panfish {
      .normal {
        position: absolute;
        top: 0;
        left: 50%;
        width: 10rem;
        transform: translate(-50%, -83%);
        z-index: 1;
      }

      .greeting {
        position: absolute;
        top: 0;
        left: 50%;
        width: 10rem;
        transform: translate(-50%, -75.8%);
        z-index: 1;
      }

      .blindfold {
        position: absolute;
        top: 0;
        left: 50%;
        width: 8.6rem;
        transform: translate(-50%, -75%);
        z-index: 1;
      }
    }

    .close-btn {
      float: right;
      cursor: pointer;
      opacity: 0.4;

      &:hover {
        opacity: 1;
      }
    }

    .panel {
      .title {
        font-size: 1.5rem;
        margin: 0 0 2rem;
      }

      .input-group {
        margin-bottom: 0.5rem;
        overflow: hidden;

        .input-box {
          position: relative;
          margin-bottom: 0.8rem;

          .input {
            padding: 10px;
            width: 100%;
            border: 1px solid #e9e9e9;
            border-radius: 2px;
            outline: none;
            box-sizing: border-box;
          }
        }
      }

      .btn {
        width: 100%;
        height: 3.334rem;
        color: #fff;
        background-color: #007fff;
        border-radius: 2px;
        outline: none;
        box-sizing: border-box;
        cursor: pointer;
      }

      .prompt-box {
        margin: 1rem 0 0;
        color: #767676;

        .clickable {
          color: #007fff;
          cursor: pointer;
        }

        .right {
          float: right;
        }
      }
    }

    .agreement-box {
      margin-top: 1.667rem;
      color: #767676;

      a {
        color: #007fff !important;
      }
    }

    .oauth-box {
      margin-top: 1.2rem;
      line-height: 1.9rem;
      color: #767676;

      a {
        text-decoration: none;
        cursor: pointer;
        color: #909090;
      }

      .oauth {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 15px;

        .oauth-bg {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #f4f8fb;
          display: flex;
          align-items: center;
          justify-content: center;

          .oauth-btn {
            height: 1.9rem;
            vertical-align: bottom;
            cursor: pointer;
          }

          img {
            width: auto;
          }
        }
      }
    }
  }
}
</style>
