<template>
  <div class="payment_users">
    <EasyTitle title="RECIPIENTS <br>INFORMATION" />
    <EasyInput
      label="Email"
    />
    <EasyInput
      label="Full name"
    />
    <EasyInput
      label="Amount"
    />
    <EasyButton
      title="Add user"
      type="secondary"
      @click="() => {}"
    />
    <hr class="payment_users-hr">
    <div class="payment_users-list">
      <div class="payment_users-list-item">
        <span>Jason Statham</span>
        <b>0.1 BIP</b>
      </div>
      <div class="payment_users-list-item">
        <span>Jason Statham</span>
        <b>0.1 BIP</b>
      </div>
      <div class="payment_users-list-item">
        <span>Jason Statham</span>
        <b>0.1 BIP</b>
      </div>
    </div>
    <hr class="payment_user-hr">
    <div class="payment_users-total">
      <span>Total 3</span>
      <b>100 BIP</b>
    </div>
    <EasyButton
      title="Continue"
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
export default class PaymentUsers extends Vue {}
</script>

<style lang="scss" scoped>
.payment_users {
  .payment_users-hr {
    margin: 1rem 0;
  }
  .payment_users-list {
    .payment_users-list-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      padding: 1rem 0;
    }
  }
  .payment_users-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem
  }
}
</style>
