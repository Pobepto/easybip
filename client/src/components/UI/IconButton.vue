<template>
  <div
    class="icon_button"
    @click="onClick"
  >
    <div class="icon_button-inner">
      <slot></slot>
    </div>
    <span class="icon_button-text">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EasyIconButton extends Vue {
  @Prop({ default: '' }) readonly title!: string

  onClick (v: any) {
    console.log(typeof v)
    this.$emit('click', v)
  }
}
</script>

<style lang="scss" scoped>
.icon_button {
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon_button-inner {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 2px solid $yellow;
    border-radius: 10px;
    padding: 1rem;

    height: 4rem;
    width: 4rem;

    &:hover {
      transform: scale(1.1)
    }
  }

  .icon_button-text {
    padding: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
