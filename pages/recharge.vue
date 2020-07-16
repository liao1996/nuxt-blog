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
              @clickSmall="smallClick(item.toSmall)"
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
