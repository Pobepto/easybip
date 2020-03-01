<template>
<div class="select_block">
  <label class="select_block-text">{{ label }}</label>
  <select
    class="select_block-select"
    @change="onChange"
  >
    <option
      v-for="(option, index) of options"
      :value="option.value"
      :key="index"
    >{{ option.label }}</option>
  </select>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EasyIconButton extends Vue {
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: [] }) readonly options!: any[]

  onChange (v: any) {
    this.$emit('change', v.target.value)
  }
}
</script>

<style lang="scss" scoped>
.select_block {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;

  .select_block-text {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0 1rem;
  }
  .select_block-select {
    border: 2px solid $yellow;
    border-radius: 10px;
    font-size: 1rem;

    margin-top: 0.5rem;
    padding: 1rem;
    background: #ffffff;
    height: 3.5rem;

    &:disabled {
      cursor: not-allowed;
      background: #ffffff;
    }
  }
}
</style>
