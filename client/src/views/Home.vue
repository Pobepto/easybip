<template>
  <div class="content">
    <div class="content_left">
      <div class="content_left-text">
        <span class="content_left-title">Easy<br>Payment</span>
        <img src="@/assets/phone.png" class="content_left-phone" />
        <span class="content_left-desc">Fast. Easy. Secure.</span>
        <div class="content_left-message">
          <ul>
            <li class="content_left-message-feature">Top up phone credit</li>
            <li class="content_left-message-feature">Transfer to wallet</li>
          </ul>
        </div>
      </div>
      <div class="content_left-button">
        <EasyButton
          title="Create push"
          @click="goTo"
        />
      </div>
    </div>
    <div class="content_right">
      <PhoneIcon class="content_right-phone" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EasyHeader from '@/components/UI/Header.vue'
import EasyButton from '@/components/UI/Button.vue'
import PhoneIcon from '@/assets/phone-15deg.svg'

@Component({
  components: {
    EasyHeader,
    EasyButton,
    PhoneIcon
  }
})
export default class Home extends Vue {
  goTo () {
    this.$router.push({ name: 'Payment' })
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas: ". .";
  align-content: center;
  height: 80vh;

  @media screen and (max-width: 1149px) {
    display: flex;
    flex-direction: column;
    flex-direction: column-reverse;
    align-items: center;
    height: unset;
  }

  .content_left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .content_left-text {
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 1149px) {
        align-items: center;
        width: 100%;
      }

      .content_left-title {
        font-weight: 600;
        padding: 1rem 0.5rem;
        @include fluid-type(3, 9, 350, 1200);
      }

      .content_left-desc {
        font-weight: 300;
        font-size: 2rem;
        padding: 1rem;
      }

      .content_left-phone {
        display: none;
        @media screen and (max-width: 1149px) {
          align-self: center;
          width: 30vw;
          display: unset;
        }
      }
    }

    .content_left-button {
      width: 25rem;
      margin-bottom: 1rem;

      @media screen and (max-width: 1149px) {
        width: 20rem;
      }
    }

    .content_left-message {
      padding: 1rem;
      .content_left-message-feature {
        font-size: 0.9rem;
        margin: 0.5rem 0;
      }
    }
  }

  .content_right {
    .content_right-phone {
      display: unset;
      @media screen and (max-width: 1149px) {
        display: none;
      }
    }
  }
}
</style>
