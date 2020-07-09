<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :xs="24"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="4"
      >
        <el-card shadow="hover">
          <div slot="header">
            <span>{{ item.title }}</span>
          </div>
          <div style="width: 100%; height: 200px;">
            <vab-image
              :big-src="item.img"
              :percent="item.percent"
              :small-src="item.smallImg"
              @clickBig="bigClick(item)"
              @clickSmall="smallClick(item)"
            ></vab-image>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <vab-charge :start-val="startVal" :end-val="endVal"></vab-charge>
  </div>
  
</template>

<script type="text/ecmascript-6">
import VabCharge from "~/components/VabCharge";
import VabImg from "~/components/VabImg";
export default {
  name: "Pigeonhole",
  components: {
    VabCharge,
    VabImg
  },
  data() {
    return {
      startVal: 0,
      endVal: 20,
      timeInterval: null,      
      list: null,
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
  methods:{
     bigClick(val) {
      this.$baseAlert("点击了大图");
    },
    smallClick(val) {
      this.$baseAlert("点击了小图");
    },
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">

</style>
