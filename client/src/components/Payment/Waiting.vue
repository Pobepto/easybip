<template>
  <div class="payment_waiting">
    <EasyTitle title="WAITING <br>FOR COINS">
      <span
        v-if="!isZero"
        class="payment_waiting-title-desc"
      >Minimum amount <b>{{ requiredBalance }} BIP</b></span>
    </EasyTitle>
    <EasyInput
      label="Address"
      icon="copy"
      :value="address.value"
      :disabled="true"
    />
    <EasyLoader v-if="address.loading"/>
    <template v-else>
      <div class="payment_waiting-desc">
        <p class="payment_waiting-desc-balance">{{ balance }}</p>
        <b>BIP</b>
      </div>
      <EasyButton
        v-if="checkRequiredAmount"
        title="Continue"
        @click="beforeContinue"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import BN from 'bignumber.js'

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
export default class PaymentProtection extends Vue {
  @Prop(Function) readonly onClick!: () => {}

  intervalNumber: number | undefined

  @State(state => state.Payment.address) address
  @State(state => state.Payment.balance) balance
  @State(state => state.Payment.requiredBalance) requiredBalance

  @Action checkMoneyAmount
  @Action activateWallet

  created () {
    this.intervalNumber = window.setInterval(() => {
      this.checkMoneyAmount({ address: this.address.value })
    }, 2 * 1000)
  }

  beforeDestroy () {
    window.clearInterval(this.intervalNumber)
  }

  async beforeContinue () {
    await this.activateWallet({ address: this.address.value })
    this.onClick()
  }

  get checkRequiredAmount () {
    return new BN(this.balance).gte(
      new BN(this.requiredBalance)
    )
  }

  get isZero () {
    return new BN(this.requiredBalance).eq(0)
  }
}
</script>

<style lang="scss" scoped>
.payment_waiting {
  .payment_waiting-title-desc {
    font-weight: 300;
  }
  .payment_waiting-desc {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    .payment_waiting-desc-balance {
      margin-right: 0.2rem;
      font-weight: 300;
    }
  }
}
</style>
