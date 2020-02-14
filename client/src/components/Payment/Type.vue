<template>
  <div class="payment_type">
    <EasyTitle title="CHOOSE TYPE OF <br>PAYMENT" />
    <div class="payment_type-buttons">
      <EasyIconButton
        title="Single"
        @click="syncType = types.Single"
      >
        <SingleTypeIcon />
      </EasyIconButton>
      <EasyIconButton
        title="Multi"
        @click="syncType = types.Multi"
      >
        <MultiTypeIcon />
      </EasyIconButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import EasyTitle from '@/components/UI/Title.vue'
import EasyIconButton from '@/components/UI/IconButton.vue'

import MultiTypeIcon from '@/assets/multi-type.svg'
import SingleTypeIcon from '@/assets/single-type.svg'

import { Type } from '../../enums'

@Component({
  components: {
    EasyTitle,
    EasyIconButton,
    MultiTypeIcon,
    SingleTypeIcon
  }
})
export default class PaymentType extends Vue {
  @PropSync('type', { default: null }) syncType!: number | null

  types = Type
}
</script>

<style lang="scss" scoped>
.payment_type {
  .payment_type-buttons {
    display: flex;
    justify-content: space-around;
  }
}
</style>
