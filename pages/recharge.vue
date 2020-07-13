<template>
  <div class="pigeonhole">
    <div class="card-container">
      <el-carousel :interval="4000" type="card" height="30em">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <el-card shadow="hover">
            <div slot="header">
              <span>{{ item.title }}</span>
            </div>
            <vab-img
              :big-src="item.img"
              :percent="item.percent"
              :small-src="item.smallImg"
              @clickBig="bigClick(item.toBig)"
              @clickSmall="smallClick(item.toSmaill)"
            ></vab-img>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <vab-charge :start-val="startVal" :end-val="endVal" class="charge"></vab-charge>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecharge } from "~/api/articlelist";
import VabCharge from "~/components/VabCharge";
import VabImg from "~/components/VabImg";
export default {
  name: "Recharge",
  components: {
    VabCharge,
    VabImg
  },
  asyncData(){
    return getRecharge().then(res =>{
      return {list : res.result.data}
    })
  },
  data() {
    return {
      startVal: 0,
      endVal: 20,
      timeInterval: null,
      // list: [
      //   {
      //     title: "React",
      //     img: "http://eightythousand.com:520/assets/react.jpg",
      //     percent: 5,
      //     toBig: "https://react.docschina.org/",
      //     toSmaill: "http://huziketang.mangojuice.top/books/react/",
      //     smallImg: "http://eightythousand.com:520/assets/reactBook.jpg"
      //   },
      //   {
      //     title: "Vue",
      //     img: "http://eightythousand.com:520/assets/vue.jpg",
      //     percent: 5,
      //     toBig: "https://cn.vuejs.org/",
      //     toSmaill: "",
      //     smallImg: "http://eightythousand.com:520/assets/bbb.jpg"
      //   },
      //   {
      //     title: "划水摸鱼",
      //     img: "http://eightythousand.com:520/assets/bilibili.jpg",
      //     percent: 5,
      //     toBig: "https://www.bilibili.com/",
      //     toSmaill: "https://juejin.im/",
      //     smallImg: "http://eightythousand.com:520/assets/bbb.jpg"
      //   },
      //   {
      //     title: "算法",
      //     img: "http://eightythousand.com:520/assets/arithmetic.jpg",
      //     percent: 5,
      //     smallImg: "http://eightythousand.com:520/assets/bbb.jpg",
      //     toBig: "https://algorithm.yuanbin.me/zh-hans/", 
      //     toSmaill: "https://leetcode-cn.com/"
      //   },
      //   {
      //     title: "前端面试",
      //     img: "http://eightythousand.com:520/assets/web.png",
      //     percent: 5,
      //     smallImg: "http://eightythousand.com:520/assets/web1.jpg",
      //     toBig: "https://coffe1891.gitbook.io/frontend-hard-mode-interview/",
      //     toSmaill: "http://caibaojian.com/interview-map/frontend/"
      //   }
      // ]
    };
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      if (this.endVal < 100) {
        this.startVal = this.endVal;
        this.endVal++;
      }
    }, 5000);
  },
  beforeDestroy() {
    if (this.clearInterval) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    bigClick(URL) {
      window.open(URL);
    },
    smallClick(URL) {
      window.open(URL);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.pigeonhole {
  margin-top: 5%;
  .card-container {
    width: 80%;
    margin: auto;
    /deep/ .el-card__body {
      height: 310px;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  @media screen and (max-height: 700px) {
    .charge {
      display: none;
    }
  }
}
</style>
