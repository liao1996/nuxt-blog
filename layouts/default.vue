<template>
  <div @click="blackgroundFont">
    <v-header></v-header>
    
    <main ref="container" class="content-container">
        <nuxt />
    </main>
   
    <player></player>
  </div>
</template>

<script>
import VHeader from "~/components/home/header";
import Player from "~/utils/player/player";
import $ from "jquery";
export default {
  components: {
    VHeader,
    Player
  },
  name:"Default",
  data() {
    return {
      fqIndex: 0,
      fqArr: [
        "富强",
        "民主",
        "文明",
        "和谐",
        "自由",
        "平等",
        "公正",
        "法治",
        "爱国",
        "敬业",
        "诚信",
        "友善"
      ],
      gmCss: {
        "z-index": 1000,
        position: "absolute",
        "font-weight": "bold",
        color: "#ff6651",
        "user-select": "none"
      }
    };
  },
  methods: {
    blackgroundFont(e) {
      const x = e.pageX;
      const y = e.pageY;
      const $s = $("<span></span>")
        .text(this.fqArr[this.fqIndex])
        .css(this.gmCss)
        .css({
          top: y - 20,
          left: x,
          color: this.randomColor()
        });
      //循环下标
      this.fqIndex = (this.fqIndex + 1) % this.fqArr.length;
      //显示并动画然后移除
      $("html").append($s);
      $s.animate(
        {
          top: y - 180,
          opacity: 0
        },
        1500,
        function() {
          $s.remove();
        }
      );
    },
    randomColor() {
      return (
        "rgb(" +
        this.randomVal(255) +
        "," +
        this.randomVal(255) +
        "," +
        this.randomVal(255) +
        ")"
      );
    },
    randomVal(val) {
      return Math.floor(Math.random() * (val + 1));
    }
  }
};
</script>

<style lang="stylus" scoped>
.content-container {
  margin-top : 5rem;
  width: 100%;
 // max-width: 960px;

  &::after {
    display: table;
    content: '';
    clear: both;
  }
}
</style>
