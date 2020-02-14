<template>
  <div class="block_center">
    <ReceiptDashboard />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import ReceiptDashboard from '@/components/Receipt/Dashboard.vue'

@Component({
  components: {
    ReceiptDashboard
  }
})
export default class Receipt extends Vue {}
</script>

<style>

</style>
