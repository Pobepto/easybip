<template>
  <div class="payment_done">
    <EasyTitle title="DONE, <br>SHARE LINK!" />
    <EasyInput
      :value="currentLink"
      :disabled="true"
      label="Link"
      icon="copy"
    />
    <div class="payment_done-media">
      <Telegram
        :url="shareLink"
        class="payment_done-media-icon"
        scale="2"
      />
      <WhatsApp
        :url="shareLink"
        class="payment_done-media-icon"
        scale="2"
      />
      <Facebook
        :url="shareLink"
        class="payment_done-media-icon"
        scale="2"
      />
      <Twitter
        :url="shareLink"
        class="payment_done-media-icon"
        scale="2"
      />
      <Email
        :url="shareLink"
        class="payment_done-media-icon"
        scale="2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import EasyTitle from '@/components/UI/Title.vue'
import EasyInput from '@/components/UI/Input.vue'
import EasyButton from '@/components/UI/Button.vue'
import { State } from 'vuex-class'

import { Facebook, Telegram, Email, Twitter, WhatsApp } from 'vue-socialmedia-share'

@Component({
  components: {
    EasyTitle,
    EasyInput,
    EasyButton,

    Facebook,
    Telegram,
    Email,
    Twitter,
    WhatsApp
  }
})
export default class PaymentDone extends Vue {
  @State(state => state.Payment.receiveLink) link

  get currentLink () {
    const host = window.location.host
    return `${host}/r/${this.link}`
  }

  get shareLink () {
    const host = window.location.origin
    return `${host}/r/${this.link}`
  }
}
</script>

<style lang="scss" scoped>
.payment_done {
  .payment_done-media {
    display: flex;
    justify-content: space-around;

    .payment_done-media-icon {
      cursor: pointer;
    }
  }
}
</style>
