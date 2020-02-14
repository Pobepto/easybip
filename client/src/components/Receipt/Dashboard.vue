<template>
  <div class="payment_dashboard">
    <EasyTitle :title="`Hi, ${to}!`">
      <span class="payment_dashboard-desc">{{ from }} sent you <b>{{ amount }} BIP</b>!</span>
    </EasyTitle>
    <div class="payment_dashboard-actions">
      <div class="payment_dashboard-actions-primary">
        <EasyIconButton title="Receive">
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
import { Vue, Component } from 'vue-property-decorator'

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
  to = 'Jason'
  from = 'Big boi'
  amount = 100
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
