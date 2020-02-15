<template>
  <div class="block_center">
    <ReceiptPassword
      v-if="currentStep === step.Password"
      :password.sync="receipt.password"
      :on-click="onPasswordCheck"
    />
    <ReceiptDashboard
      v-if="currentStep === step.Dashboard"
      :action="beforeAction"
    />
    <ReceiptActionSend
      v-if="currentStep === step.Send"
      :on-click="back"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ReceiptDashboard from '@/components/Receipt/Dashboard.vue'
import ReceiptPassword from '@/components/Receipt/Password.vue'
import ReceiptActionSend from '@/components/Receipt/Action/Send.vue'
import { Action } from 'vuex-class'
import { ReceiptActions } from '../enums'

enum Step {
  Password,
  Dashboard,
  Send
}

@Component({
  components: {
    ReceiptDashboard,
    ReceiptPassword,

    ReceiptActionSend
  }
})
export default class Receipt extends Vue {
  step = Step
  currentStep: Step = Step.Password

  receipt = {
    password: ''
  }

  @Action login

  onPasswordCheck () {
    const { link } = this.$route.params
    this.login({ password: this.receipt.password, link })
      .then(() => {
        this.currentStep = this.step.Dashboard
      })
  }

  beforeAction (v: ReceiptActions) {
    if (ReceiptActions.Receive === v) {
      this.currentStep = this.step.Send
    }
  }

  back () {
    this.currentStep = this.step.Dashboard
  }
}
</script>

<style>

</style>
