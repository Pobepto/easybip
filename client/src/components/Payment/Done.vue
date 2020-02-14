<template>
  <div class="payment_waiting">
    <EasyTitle title="DONE, <br>SHARE LINK!" />
    <EasyInput
      label="Link"
      icon="copy"
    />
    <EasyButton
      title="Share"
      @click="() => {}"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

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
export default class PaymentDone extends Vue {}
</script>

<style>

</style>
