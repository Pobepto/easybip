<template>
  <button
    :class="`button ${type}`"
    @click="onClick"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EasyButton extends Vue {
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: '' }) readonly type!: string

  onClick (v: any) {
    this.$emit('click', v)
  }
}
</script>

<style lang="scss" scoped>
.button {
  background-color: $yellow;
  border-radius: 10px;
  border-width: 0;
  color: $black1;

  height: 45px;
  width: 100%;

  font-size: 16px;
  font-weight: 600;

  text-transform: uppercase;
  cursor: pointer;

  margin-bottom: 1rem;

  &.secondary {
    background-color: $grey;
  }

&:hover {
    border-color: $black1;
    border-width: 1px;
  }
}
</style>
