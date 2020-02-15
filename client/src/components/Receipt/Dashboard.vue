<template>
  <div class="payment_dashboard">
    <EasyTitle :title="showUsername">
      <span class="payment_dashboard-desc">{{ showFromUsername }} sent you <b>{{ receipt.balance }} BIP</b></span>
    </EasyTitle>
    <div class="payment_dashboard-actions">
      <div class="payment_dashboard-actions-primary">
        <EasyIconButton
          title="Receive"
          @click="() => chooseAction(this.actions.Receive)"
        >
          <ReceiveIcon />
        </EasyIconButton>
        <EasyIconButton title="Send">
          <SendIcon />
        </EasyIconButton>
      </div>
      <div class="payment_dashboard-actions-secondary">
        <EasyIconButton title="Food">
          <FoodIcon />
        </EasyIconButton>
        <EasyIconButton title="Phone">
          <PhoneIcon />
        </EasyIconButton>
        <EasyIconButton title="Travel">
          <TravelIcon />
        </EasyIconButton>
        <EasyIconButton title="Stuff">
          <GasIcon />
        </EasyIconButton>
        <EasyIconButton title="Games">
          <GamesIcon />
        </EasyIconButton>
        <EasyIconButton title="Movie">
          <MovieIcon />
        </EasyIconButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

import EasyTitle from '@/components/UI/Title.vue'
import EasyIconButton from '@/components/UI/IconButton.vue'

import ReceiveIcon from '@/assets/receipt/receive.svg'
import SendIcon from '@/assets/receipt/send.svg'
import FoodIcon from '@/assets/receipt/food.svg'
import PhoneIcon from '@/assets/receipt/phone.svg'
import TravelIcon from '@/assets/receipt/travel.svg'
import GasIcon from '@/assets/receipt/gas.svg'
import GamesIcon from '@/assets/receipt/games.svg'
import MovieIcon from '@/assets/receipt/movie.svg'
import { State } from 'vuex-class'

import { ReceiptActions } from '../../enums'

@Component({
  components: {
    EasyTitle,
    EasyIconButton,
    ReceiveIcon,
    SendIcon,
    FoodIcon,
    PhoneIcon,
    TravelIcon,
    GasIcon,
    GamesIcon,
    MovieIcon
  }
})
export default class extends Vue {
  @State(state => state.Payment.receipt) receipt
  @PropSync('action', { default: 0 }) chooseAction !: () => {}

  actions = ReceiptActions

  get showUsername () {
    if (this.receipt.to.length) {
      return `Hi, ${this.receipt.to}!`
    }
    return 'Hi, dude!'
  }

  get showFromUsername () {
    if (this.receipt.from.length) {
      return this.receipt.from
    }
    return 'Incognito'
  }
}
</script>

<style lang="scss" scoped>
.payment_dashboard {

  .payment_dashboard-desc {
    font-weight: 300;
    font-size: 1.2rem;
  }

  .payment_dashboard-actions {
    margin-top: 1rem;

    .payment_dashboard-actions-primary {
      display: grid;
      grid-template: ". .";
      justify-content: space-between;
    }

    .payment_dashboard-actions-secondary {
      display: grid;
      grid-template: ". . ."
                    ". . .";
      justify-content: space-between;
    }
  }
}
</style>
