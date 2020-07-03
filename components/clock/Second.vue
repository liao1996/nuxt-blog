<template>
  <ul :style="{ transform: `rotate(${rotates * -6}deg)` }">
    <li
      v-for="(item, index) in secondList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
    >{{ item }}</li>
  </ul>
</template>
<script>
export default {
  name: "second",
  props: ["second"],
  data() {
    return {
      rotates: "",
      secondList: [
        "壹秒",
        "貳秒",
        "叁秒",
        "肆秒",
        "伍秒",
        "陆秒",
        "柒秒",
        "捌秒",
        "玖秒",
        "拾秒",
        "拾壹秒",
        "拾貳秒",
        "拾叁秒",
        "拾肆秒",
        "拾伍秒",
        "拾陆秒",
        "拾柒秒",
        "拾捌秒",
        "拾玖秒",
        "貳拾秒",
        "貳壹秒",
        "貳貳秒",
        "貳叁秒",
        "貳肆秒",
        "貳伍秒",
        "貳陆秒",
        "貳柒秒",
        "貳捌秒",
        "貳玖秒",
        "叁拾秒",
        "叁壹秒",
        "叁貳秒",
        "叁叁秒",
        "叁肆秒",
        "叁伍秒",
        "叁陆秒",
        "叁柒秒",
        "叁捌秒",
        "叁玖秒",
        "肆拾秒",
        "肆壹秒",
        "肆貳秒",
        "肆叁秒",
        "肆肆秒",
        "肆伍秒",
        "肆陆秒",
        "肆柒秒",
        "肆捌秒",
        "肆玖秒",
        "伍拾秒",
        "伍壹秒",
        "伍貳秒",
        "伍叁秒",
        "伍肆秒",
        "伍伍秒",
        "伍陆秒",
        "伍柒秒",
        "伍捌秒",
        "伍玖秒",
        "零秒"
      ]
    };
  },

  watch: {
    second(val) {
      this.rotates = val;
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  z-index: 9;
  @for $i from 1 through 60 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 6deg}) translateX(390px);
    }
  }
}
</style>
