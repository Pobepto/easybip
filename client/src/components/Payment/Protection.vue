<template>
  <div class="payment_protection">
    <EasyTitle title="PAYMENT <br>PROTECTION" />
    <EasyInput
      label="Password"
      type="password"
    />
    <EasyButton
      title="Continue"
      @click="() => {}"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
export default class PaymentProtection extends Vue {}
</script>

<style lang="scss" scoped>
.payment_type {
  .payment_type-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
