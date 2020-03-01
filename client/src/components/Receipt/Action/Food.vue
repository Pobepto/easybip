<template>
  <div class="receipt_send">
    <EasyTitle title="FOOD SERVICE">
      <span class="payment_dashboard-desc">You're balance: <b>{{ balance }} BIP</b></span>
    </EasyTitle>
    <EasySelect
      label="Product"
      :options="formattedGifts"
      @change="onGiftSelect"
    />
    <span
      v-if="showMessage"
      class="payment_dashboard-desc"
    >Price was updated!</span>
    <EasyInput
      label="Price"
      :disabled="true"
      :value="bill.sum"
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
import EasySelect from '@/components/UI/Select.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'
import { Action, State } from 'vuex-class'

@Component({
  components: {
    EasyTitle,
    EasySelect,
    EasyInput,
    EasyButton
  }
})
export default class FoodService extends Vue {
  @Prop(Function) readonly onClick!: () => {}
  @State(state => state.Payment.receipt.balance) balance
  @State(state => state.ServiceFood.bill) bill
  @State(state => state.ServiceFood.gifts) gifts

  form = {
    product: ''
  }

  showMessage = false

  get formattedGifts () {
    const gifts = [
      'Gift for 1000',
      'Gift for 2000',
      'Gift for 3000',
      'Test gift'
    ]
    return this.gifts.map((v, i) => ({ label: gifts[i], value: v }))
  }

  isLoading = false

  @Action getPrices
  @Action transferToFood

  onGiftSelect (product) {
    this.form.product = product
    const { link } = this.$route.params
    this.getPrices({ link, product })
  }

  beforeClick () {
    this.isLoading = true
    const { link } = this.$route.params
    this.transferToFood({
      ...this.form,
      product: this.form.product,
      link
    })
      .then(({ isChanged }) => {
        if (isChanged) {
          this.showMessage = true
          setTimeout(() => {
            this.showMessage = false
          }, 5 * 1000)
          return
        }
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