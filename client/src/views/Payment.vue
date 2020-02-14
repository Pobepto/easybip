<template>
  <div class="block_center">
    <PaymentType
      :type.sync="payment.type"
      v-if="currentStep === step.Type"
    />
    <PaymentInfo
      :type="payment.type"
      :info="payment.info"
      :on-click="nextStep"
      v-else-if="currentStep === step.Info"
    />
    <PaymentUsers
      v-else-if="currentStep === step.Users"
      :on-click="nextStep"
    />
    <PaymentProtection
      :password="payment.password"
      :on-click="nextStep"
      v-else-if="currentStep === step.Protection"
    />
    <PaymentWaiting v-else-if="currentStep === step.Waiting" />
    <PaymentDone v-else-if="currentStep === step.Done" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import PaymentType from '@/components/Payment/Type.vue'
import PaymentInfo from '@/components/Payment/Info.vue'
import PaymentProtection from '@/components/Payment/Protection.vue'
import PaymentWaiting from '@/components/Payment/Waiting.vue'
import PaymentDone from '@/components/Payment/Done.vue'
import PaymentUsers from '@/components/Payment/Users.vue'

import { Type } from '../enums'

import isNull from 'lodash/isNull'

enum Step {
  Type,
  Info,
  Users,
  Protection,
  Waiting,
  Done
}

interface PaymentStructure {
  type: Type | null;
  info: {
    from: string;
    to: string;
  };
  password: string;
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
  type = Type
  currentStep: Step = Step.Type

  payment: PaymentStructure = {
    type: null,
    info: {
      from: '',
      to: ''
    },
    password: ''
  }

  @Watch('payment', { deep: true })
  onPaymentChange (v: PaymentStructure) {
    if (!isNull(v.type)) {
      this.currentStep = this.step.Info
    }
  }

  nextStep () {
    const {
      Info,
      Users,
      Protection,
      Waiting,
      Done
    } = this.step

    const setStep = (v: Step) => (this.currentStep = v)

    switch (this.currentStep) {
      case Info:
        if (this.payment.type === this.type.Single) {
          setStep(Protection)
        } else {
          setStep(Users)
        }
        break
      case Users:
        setStep(Protection)
        break
      case Protection:
        setStep(Waiting)
        break
      case Waiting:
        setStep(Done)
        break
      default:
        break
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
