<template>
  <div id="app">
    <EasyHeader />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EasyHeader from '@/components/UI/Header.vue'

@Component({
  components: {
    EasyHeader
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,700&display=swap');

#app {
  display: flex;
  align-self: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 80vw;
  height: 100vh;
}

html {
  font-family: 'IBM Plex Sans', sans-serif;
  color: $black2;
}

.block_center {
  display: flex;
  flex-direction: column;

  max-width: 35vw;
  width: 35vw;
  margin: 0 auto;

  @media screen and (max-width: 1149px) {
    flex-direction: column;
    align-items: center;
    margin: unset;
    width: 100%;
    max-width: unset;
  }
}
</style>
