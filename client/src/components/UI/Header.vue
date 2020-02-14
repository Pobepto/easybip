<template>
  <div class="header">
    <span
      class="header_title"
      @click="goTo"
    >Easy<span class="header_title yellow">Bip</span></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class EasyHeader extends Vue {
  goTo () {
    this.$router.push({ name: 'Home' })
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem;

  .header_title {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 48px;
    cursor: pointer;

    &.yellow {
      color: $yellow;
    }
  }
}
</style>
