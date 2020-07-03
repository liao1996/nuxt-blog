<template>
  <ul :style="{ transform: `rotate(${rotates * -11.613}deg)` }">
    <li
      v-for="(item, index) in dayList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "day",
  props: ["day"],
  data() {
    return {
      rotates: "",
      dayList: [ "壹号",
      "貳号",
      "叁号",
      "肆号",
      "伍号",
      "陆号",
      "柒号",
      "捌号",
      "玖号",
      "拾号",
      "拾壹号",
      "拾貳号",
      "拾叁号",
      "拾肆号",
      "拾伍号",
      "拾陆号",
      "拾柒号",
      "拾捌号",
      "拾玖号",
      "貳拾号",
      "貳壹号",
      "貳貳号",
      "貳叁号",
      "貳肆号",
      "貳伍号",
      "貳陆号",
      "貳柒号",
      "貳捌号",
      "貳玖号",
      "叁拾号",
      "叁壹号"]
    };
  },
 
  watch: {
    day(val) {
      this.rotates = val;
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  z-index: 4;
  @for $i from 1 through 31 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 11.6129deg}) translateX(120px);
    }
  }
}
</style>
