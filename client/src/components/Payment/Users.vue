<template>
  <div class="payment_users">
    <EasyTitle title="RECIPIENTS <br>INFORMATION" />
    <EasyInput
      label="Email"
      :value="user.email"
      @input="v => user.email = v"
    />
    <EasyInput
      label="Full name"
      :value="user.fullName"
      @input="v => user.fullName = v"
    />
    <EasyInput
      label="Amount"
      :value="user.amount"
      @input="v => user.amount = v"
    />
    <EasyButton
      title="Add user"
      type="secondary"
      @click="addUser"
    />
    <template v-if="users.length">
      <hr class="payment_users-hr">
      <div class="payment_users-list">
        <template v-for="(user, index) of syncUser">
          <div
            class="payment_users-list-item"
            :key="index"
          >
            <span>{{ user.fullName }}</span>
            <b>{{ user.amount }} BIP</b>
          </div>
        </template>
      </div>
      <hr class="payment_user-hr">
      <div class="payment_users-total">
        <span>Total {{ totalUsers }}</span>
        <b>{{ totalAmount }} BIP</b>
      </div>
      <EasyButton
        title="Continue"
        @click="onClick"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import EasyTitle from '@/components/UI/Title.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'

interface UserStructure {
  email: string;
  fullName: string;
  amount: string;
}

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton
  }
})
export default class PaymentUsers extends Vue {
  @PropSync('users', { default: [] }) syncUser!: UserStructure[]
  @Prop(Function) readonly onClick!: () => {}

  user: UserStructure = {
    email: '',
    fullName: '',
    amount: ''
  }

  addUser () {
    this.syncUser.push(this.user)
    this.resetUser()
  }

  resetUser () {
    this.user = {
      email: '',
      fullName: '',
      amount: ''
    }
  }

  get totalUsers () {
    return this.syncUser.length
  }

  get totalAmount () {
    return this.syncUser.reduce((v, user) => v + Number(user.amount), 0)
  }
}
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
