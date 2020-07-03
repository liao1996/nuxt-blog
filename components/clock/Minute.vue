<template>
  <ul :style="{ transform: `rotate(${rotates * -6}deg)` }">
    <li
      v-for="(item, index) in minuteList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
    >{{ item }}</li>
  </ul>
</template>
<script>
export default {
  name: "minute",
  props: ["minute"],
  data() {
    return {
      rotates: "",
      minuteList: [  
             
        "壹分",
        "貳分",
        "叁分",
        "肆分",
        "伍分",
        "陆分",
        "柒分",
        "捌分",
        "玖分",
        "拾分",
        "拾壹分",
        "拾貳分",
        "拾叁分",
        "拾肆分",
        "拾伍分",
        "拾陆分",
        "拾柒分",
        "拾捌分",
        "拾玖分",
        "貳拾分",
        "貳壹分",
        "貳貳分",
        "貳叁分",
        "貳肆分",
        "貳伍分",
        "貳陆分",
        "貳柒分",
        "貳捌分",
        "貳玖分",
        "叁拾分",
        "叁壹分",
        "叁貳分",
        "叁叁分",
        "叁肆分",
        "叁伍分",
        "叁陆分",
        "叁柒分",
        "叁捌分",
        "叁玖分",
        "肆拾分",
        "肆壹分",
        "肆貳分",
        "肆叁分",
        "肆肆分",
        "肆伍分",
        "肆陆分",
        "肆柒分",
        "肆捌分",
        "肆玖分",
        "伍拾分",
        "伍壹分",
        "伍貳分",
        "伍叁分",
        "伍肆分",
        "伍伍分",
        "伍陆分",
        "伍柒分",
        "伍捌分",
        "伍玖分",
        "零分"
        

      ]
    };
  },

  watch: {
    minute(val) {
      this.rotates = val;
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  z-index: 8;
  @for $i from 1 through 60 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 6deg}) translateX(320px);
    }
  }
}
</style>
