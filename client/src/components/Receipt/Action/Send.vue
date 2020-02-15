<template>
  <div class="receipt_send">
    <EasyTitle title="SEND MONEY">
      <span class="payment_dashboard-desc">You're balance: <b>{{ balance }} BIP</b></span>
    </EasyTitle>
    <EasyInput
      label="To"
      @input="v => form.to = v"
    />
    <EasyInput
      label="Amount"
      @input="v => form.amount = v"
    />
    <EasyButton
      title="Continue"
      :loading="isLoading"
      @click="beforeClick"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'
import EasyTitle from '@/components/UI/Title.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'
import { Action, State } from 'vuex-class'

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton
  }
})
export default class PaymentProtection extends Vue {
  @Prop(Function) readonly onClick!: () => {}
  @State(state => state.Payment.receipt.balance) balance

  form = {
    to: '',
    amount: ''
  }

  isLoading = false

  @Action transfer

  beforeClick () {
    this.isLoading = true
    const { link } = this.$route.params
    this.transfer({
      ...this.form,
      link
    })
      .then(() => {
        this.onClick()
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
