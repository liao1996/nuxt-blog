<template>
  <div class="error">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">{{ error.message || notFound }}</h2>
      </div>
      <p class="error-link">
        <nuxt-link class="link" to="/">{{msg}}</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  layout: "empty", //错误页面布局
  props: {
    error: Object,
  },
  data() {
    return {
      notFound: "页面未找到", //默认404
      msg: "如果我是不及格的那一个，我只想知道标准答案",
    };
  },
};
</script>

<style lang="scss" scoped>
.error {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 99999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(white, 0.6);

  @keyframes error-item {
    0% {
      opacity: 0;
      transform: translate3d(0, -30%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  > .error-content {
    > .error-code,
    > .error-link,
    > .error-wrapper-message {
      color: #555555;
      animation: error-item ease-out both 0.6s 0.38s;
      font-size: 1rem;
    }

    .link {
      &:hover {
        border-bottom: 1px solid;
      }
    }

    > .error-code {
      text-transform: uppercase;
      font-size: 10em;
      font-weight: normal;
      margin: 0;
    }

    > .error-wrapper-message {
      > .error-message {
        font-size: 2rem;
        font-weight: normal;
        margin-top: 0;
      }
    }
  }
}
</style>
