<template>
  <div class="card" :style="styleObj">
    <div class="card-borders">
      <div class="border-top"></div>
      <div class="border-right"></div>
      <div class="border-bottom"></div>
      <div class="border-left"></div>
    </div>
    <div class="card-content">
      <el-image :src="avatar" class="avatar"></el-image>
      <div class="username">{{ userName }}</div>
      <div class="social-icons">
        <a
          v-for="(social, index) in socials"
          :key="index"
          rel="nofollow noopener"
          class="social-icon"
          :title="'分享到' + social.name"
          @click.prevent="shareWindow(social.name, social.url)"
        >
          <i class="iconfont" :class="`icon-${social.icon || social.class || social.name}`"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VabProfile",
  props: {
    styleObj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    userName: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      socials: [
        {
          name: "微信",
          class: "weixin",
          url: () => `/iframe/qrcode.html?url=${this.url}`
        },
        {
          name: "微博",
          class: "weibo",
          url: () =>
            `https://service.weibo.com/share/share.php?url=${
              this.url
            }&title=${this.title()}&source=${this.url}&sourceUrl=${
              this.url
            }&content=${this.description()}`
        },
        {
          name: "QQ空间",
          class: "QQkongjian",
          url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
              this.url
            }&title=${this.title()}&summary=${this.description()}&site=${
              this.url
            }`
        }
      ]
    };
  },
  computed: {
    url() {
      return window.location.href;
    }
  },
  methods: {
    description() {
      try {
        if (document) {
          return document
            .getElementsByName("description")[0]
            .getAttribute("content");
        }
      } catch (error) {
        return "";
      }
    },
    title() {
      try {
        if (document) {
          return document.title;
        }
      } catch (error) {
        return appConfig.meta.title;
      }
    },
    shareWindow(social, url) {
      const targetUrl = url().includes("mailto")
        ? url().replace(/\s|\||Surmon.me/g, "")
        : encodeURI(url());
      // 给打开的窗口命名
      const windowName = `分享 `;
      // 窗口宽度,需要设置
      const awidth = (screen.availWidth / 6) * 2;
      // 窗口高度,需要设置
      const aheight = (screen.availHeight / 5) * 2;
      // 窗口顶部位置,一般不需要改
      const atop = (screen.availHeight - aheight) / 2;
      // 窗口放中央,一般不需要改
      const aleft = (screen.availWidth - awidth) / 2;
      // 新窗口的参数
      const baseParam =
        "scrollbars=0,status=0,menubar=0,resizable=2,location=0";
      // 新窗口的左部位置，顶部位置，宽度，高度
      const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${baseParam}`;
      // 打开新窗口
      const _window = window.open(targetUrl, windowName, params);
      // 新窗口获得焦点
      _window.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  --card-bg-color: hsl(240, 31%, 25%);
  --card-bg-color-transparent: linear-gradient(
    to bottom right,
    #ff99ff,
    yellow
  );
  // background-image: linear-gradient(to bottom right, #FF99FF , yellow);
  position: relative;
  width: 100%;
  height: 100%;
  .card-borders {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .border-top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 2px;
      background: var(--card-bg-color);
      transform: translateX(-100%);
      animation: slide-in-horizontal 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)
        forwards;
    }
    .border-right {
      position: absolute;
      right: 0;
      width: 2px;
      height: 100%;
      background: var(--card-bg-color);
      transform: translateY(100%);
      animation: slide-in-vertical 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)
        forwards;
    }
    .border-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: var(--card-bg-color);
      transform: translateX(100%);
      animation: slide-in-horizontal-reverse 0.8s
        cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }
    .border-left {
      position: absolute;
      top: 0;
      width: 2px;
      height: 100%;
      background: var(--card-bg-color);
      transform: translateY(-100%);
      animation: slide-in-vertical-reverse 0.8s
        cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }
  }
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 40px 0 40px 0;
    background: var(--card-bg-color-transparent);
    opacity: 0;
    transform: scale(0.6);
    animation: bump-in 0.5s 0.8s forwards;
    .avatar {
      width: 80px;
      height: 80px;
      border: 1px solid #f7f1e3;
      border-radius: 50%;
      opacity: 0;
      transform: scale(0.6);
      animation: bump-in 0.5s 1s forwards;
    }
    .username {
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 26px;
      color: transparent;
      letter-spacing: 2px;
      animation: fill-text-white 1.2s 2s forwards;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: black;
        content: "";
        background: #35b9f1;
        transform: scaleX(0);
        transform-origin: left;
        animation: slide-in-out 1.2s 1.2s cubic-bezier(0.75, 0, 0, 1) forwards;
      }
    }
    .social-icons {
      display: flex;
      .social-icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5em;
        height: 2.5em;
        margin: 0 15px;
        color: white;
        text-decoration: none;
        border-radius: 50%;
        @for $i from 1 through 3 {
          &:nth-child(#{$i}) {
            &::before {
              animation-delay: 2s + 0.1s * $i;
            }
            &::after {
              animation-delay: 2.1s + 0.1s * $i;
            }
            i {
              animation-delay: 2.2s + 0.1s * $i;
            }
          }
        }
        :hover{
           color: rgb(181, 196, 186);
          cursor: pointer;
        }
        &::before,
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: "";
          border-radius: inherit;
          transform: scale(0);
        }
        &::before {
          background: #f7f1e3;
          animation: scale-in 0.5s cubic-bezier(0.75, 0, 0, 1) forwards;
        }
        &::after {
          background: #1873ce;
          animation: scale-in 0.5s cubic-bezier(0.75, 0, 0, 1) forwards;
        }
        i {
          z-index: 99;
          transform: scale(0);
          animation: scale-in 0.5s cubic-bezier(0.75, 0, 0, 1) forwards;
        }
        .icon,
        .iconfont {
          font-family: "iconfont" !important;
          font-size: 25px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -webkit-text-stroke-width: 0.2px;
          -moz-osx-font-smoothing: grayscale;
        }
      }
    }
  }
}
@keyframes bump-in {
  50% {
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slide-in-horizontal {
  50% {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes slide-in-horizontal-reverse {
  50% {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes slide-in-vertical {
  50% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}
@keyframes slide-in-vertical-reverse {
  50% {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
@keyframes slide-in-out {
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
@keyframes fill-text-white {
  to {
    color: white;
  }
}
@keyframes scale-in {
  to {
    transform: scale(1);
  }
}
</style>