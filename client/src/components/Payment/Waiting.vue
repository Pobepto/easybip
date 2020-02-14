<template>
  <div class="payment_waiting">
    <EasyTitle title="WAITING <br>FOR COINS" />
    <EasyInput
      label="Address"
      icon="copy"
    />
    <EasyLoader />
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
import EasyLoader from '@/components/UI/Loading.vue'

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton,
    EasyLoader
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
