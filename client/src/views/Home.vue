<template>
  <div class="content">
    <div class="content_left">
      <div class="content_left-text">
        <span class="content_left-title">Easy<br>Payment</span>
        <span class="content_left-desc">Fast. Easy. Secure.</span>
      </div>
      <div class="content_left-button">
        <EasyButton
          title="Create payment"
          @click="() => {}"
        />
      </div>
    </div>
    <div class="content_right">
      <PhoneIcon />
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

}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas: ". .";

  .content_left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .content_left-text {
      display: flex;
      flex-direction: column;

      .content_left-title {
        font-weight: 600;
        font-size: 9rem;
        padding: 1rem 0.5rem;
      }

      .content_left-desc {
        font-weight: 300;
        font-size: 2rem;
        padding: 1rem;
      }
    }

    .content_left-button {
      width: 25rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
