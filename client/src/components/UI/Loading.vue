<template>
  <div class="loader_block">
    <Loader class="loader_block-icon" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Loader from '@/assets/loading.svg'

@Component({
  components: {
    Loader
  }
})
export default class EasyLoader extends Vue {}
</script>

<style lang="scss" scoped>
.loader_block {
  padding: 0 2rem;
  margin-bottom: 2rem;

  animation: 4s cubic-bezier(.1,.3,.1,.1) 0s infinite move;
}

@keyframes move {
 0% {
  margin-left: -2%;
  opacity: 0;
 }
 10% {
  opacity: 1;
 }
 90% {
  opacity: 1;
 }
 100% {
  opacity: 0;
  margin-left: 75%;
 }
}
</style>
