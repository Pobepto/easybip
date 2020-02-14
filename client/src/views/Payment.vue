<template>
  <div class="block_center">
    <PaymentUsers />
    <PaymentType
      v-if="currentStep === step.Type"
    />
    <PaymentInfo v-else-if="currentStep === step.Info" />
    <PaymentProtection v-else-if="currentStep === step.Protection" />
    <PaymentWaiting v-else-if="currentStep === step.Waiting" />
    <PaymentDone v-else-if="currentStep === step.Done" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PaymentType from '@/components/Payment/Type.vue'
import PaymentInfo from '@/components/Payment/Info.vue'
import PaymentProtection from '@/components/Payment/Protection.vue'
import PaymentWaiting from '@/components/Payment/Waiting.vue'
import PaymentDone from '@/components/Payment/Done.vue'
import PaymentUsers from '@/components/Payment/Users.vue'

enum Step {
  Type,
  Info,
  Protection,
  Waiting,
  Done
}

@Component({
  components: {
    PaymentType,
    PaymentInfo,
    PaymentProtection,
    PaymentWaiting,
    PaymentDone,
    PaymentUsers
  }
})
export default class Payment extends Vue {
  step = Step
  currentStep: Step = Step.Type
}
</script>

<style lang="scss" scoped>
</style>
