<template>
  <div class="input_block">
    <label class="input_block-text">{{ label }}</label>
    <input
      class="input_block-input"
      :value="value"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="onInput"
    />
    <template v-if="icon.length">
      <span
        v-if="isMessageVisible"
        class="input_block-icon-msg"
      >Copied!</span>
      <CopyIcon
        class="input_block-icon"
        @click="onCopy"
      />
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
  @Prop({ default: false }) readonly disabled!: boolean
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop() readonly value!: number | string

  timeoutNumber: number | undefined
  isMessageVisible = false

  onInput (e: InputEvent) {
    this.$emit('input', (e.target as HTMLInputElement).value)
  }

  onCopy () {
    this.$copyText(String(this.value))
    this.isMessageVisible = true
    this.timeoutNumber = window.setTimeout(() => {
      this.isMessageVisible = false
      window.clearTimeout(this.timeoutNumber)
    }, 2 * 1000)
  }
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

    &:disabled {
      cursor: not-allowed;
    }
  }
  .input_block-icon-msg {
    position: absolute;
    top: 55%;
    right: 10%;
    font-weight: 200;
    font-size: 0.9rem;
    animation: 0.3s linear hide;
    background-color: #ffffff;
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

@keyframes hide {
  0% {
    opacity: 0;
    right: 0%;
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    right: 10%;
  }
}
</style>
