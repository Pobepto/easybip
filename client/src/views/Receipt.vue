<template>
  <div class="block_center">
    <ReceiptPassword
      v-if="currentStep === step.Password"
      :password.sync="receipt.password"
      :on-click="checkPassword"
    />
    <ReceiptDashboard
      v-if="currentStep === step.Dashboard"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ReceiptDashboard from '@/components/Receipt/Dashboard.vue'
import ReceiptPassword from '@/components/Receipt/Password.vue'
import { Action } from 'vuex-class'

enum Step {
  Password,
  Dashboard,
  Send
}

@Component({
  components: {
    ReceiptDashboard
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
  }
}
</script>

<style>

</style>
