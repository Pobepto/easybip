<template>
  <div class="receipt_send">
    <EasyTitle title="PHONE SERVICE">
      <div class="payment_dashboard">
        <span class="payment_dashboard-desc">You're balance: <b>{{ balance }} BIP</b></span>
        <span class="payment_dashboard-desc">Day limit: <b>{{ phone.limit }} BIP</b></span>
        <span class="payment_dashboard-desc">BIP price: <b>{{ phone.rub }} RUR</b></span>
      </div>
    </EasyTitle>
    <EasyInput
      label="Phone"
      placeholder="79990000000"
      @input="v => form.phone = v"
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
    <EasyButton
      title="Back"
      type="secondary"
      :loading="isLoading"
      @click="onClick"
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
export default class PhoneService extends Vue {
  @Prop(Function) readonly onClick!: () => {}
  @State(state => state.Payment.receipt.balance) balance
  @State(state => state.ServicePhone.phone) phone

  form = {
    to: 'Mx403b763ab039134459448ca7875c548cd5e80f77',
    phone: '',
    amount: ''
  }

  isLoading = false

  @Action getLimits
  @Action transferToPhone

  created () {
    this.getLimits()
  }

  beforeClick () {
    this.isLoading = true
    const { link } = this.$route.params
    this.transferToPhone({
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
.payment_dashboard {
  display: flex;
  flex-direction: column;

  .payment_dashboard-desc {
    margin-bottom: 0.3rem;
  }
}
</style>
