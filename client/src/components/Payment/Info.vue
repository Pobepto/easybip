<template>
  <div class="payment_info">
    <EasyTitle title="PAYMENT <br>INFORMATION" />
    <template v-if="type === types.Multi">
      <EasyInput
        label="From"
        @input="v => syncInfo.from = v"
      />
    </template>
    <template v-if="type === types.Single">
      <EasyInput
        label="From"
        @input="v => syncInfo.from = v"
      />
      <EasyInput
        label="To"
        @input="v => syncInfo.to = v"
      />
    </template>
    <EasyButton
      title="Continue"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import EasyTitle from '@/components/UI/Title.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'

import { Type } from '../../enums'

interface InfoStructure {
  from: string;
  to: string;
}

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton
  }
})
export default class PaymentInfo extends Vue {
  @Prop({ default: 0 }) readonly type!: Type
  @Prop(Function) readonly onClick!: () => {}
  @PropSync('info', { default: Object }) syncInfo!: InfoStructure

  types = Type
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
