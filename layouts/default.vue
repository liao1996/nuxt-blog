<template>
  <div>
    <v-header></v-header>
    <main ref="container" class="content-container">
      <nuxt/>
    </main>
    <player></player>
  </div>
</template>

<script>
import VHeader from '~/components/home/header'
import Player from '~/utils/player/player'

export default {
  components: {
    VHeader,
    Player
  }
}
</script>

<style lang="stylus" scoped>
.content-container {
  position relative
  margin 0 auto
  width 100%
  max-width 960px
  top 5rem
  &::after {
    display table
    content ""
    clear both  
  }
}
</style>
