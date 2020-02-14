<template>
  <div class="payment_protection">
    <EasyTitle title="PAYMENT <br>PROTECTION" />
    <EasyInput
      label="Password"
      type="password"
      @input="v => syncPass = v"
    />
    <EasyButton
      title="Continue"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'
import EasyTitle from '@/components/UI/Title.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton
  }
})
export default class PaymentProtection extends Vue {
  @PropSync('password', { default: '' }) syncPass!: string
  @Prop(Function) readonly onClick!: () => {}
}
</script>

<style lang="scss" scoped>
.payment_type {
  .payment_type-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
