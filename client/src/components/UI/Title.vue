<template>
  <div class="title_block">
    <p class="title_block-title" v-html="title"></p>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EasyTitle extends Vue {
  @Prop({ default: '' }) readonly title!: string
}
</script>

<style lang="scss" scoped>
.title_block {
  margin: 2.5rem 0;
  .title_block-title {
    font-weight: 600;
    // font-size: 3.5rem;

    @include fluid-type(2, 3.5, 350, 1200)
  }
}
</style>
