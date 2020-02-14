<template>
  <div class="payment_info">
    <EasyTitle title="PAYMENT <br>INFORMATION" />
    <template v-if="type === 1">
      <EasyInput
        label="From"
      />
    </template>
    <template v-if="type === 2">
      <EasyInput
        label="From"
      />
      <EasyInput
        label="To"
      />
      <EasyInput
        label="Amount"
      />
    </template>
    <EasyButton
      title="Create payment"
      @click="() => {}"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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
export default class PaymentInfo extends Vue {
  // 1 - Single type, 2 - Multi type
  @Prop({ default: 1 }) readonly type!: number
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
