<template>
  <div class="input_block">
    <label class="input_block-text">{{ label }}</label>
    <input
      class="input_block-input"
      :type="type"
    />
    <template v-if="icon.length">
      <CopyIcon class="input_block-icon" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CopyIcon from '@/assets/copy.svg'

@Component({
  components: {
    CopyIcon
  }
})
export default class EasyInput extends Vue {
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: 'text' }) readonly type!: string
  @Prop({ default: '' }) readonly icon!: string
}
</script>

<style lang="scss" scoped>
.input_block {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;

  .input_block-text {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0 1rem;
  }
  .input_block-input {
    border: 2px solid $yellow;
    border-radius: 10px;
    font-size: 1rem;

    margin-top: 0.5rem;
    padding: 1rem;
  }
  .input_block-icon {
    position: absolute;
    right: 2%;
    top: 45%;
    cursor: pointer;

    &:hover {
      transform: scale(1.1)
    }
  }
}
</style>
