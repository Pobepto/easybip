<template>
  <button
    :class="`button ${type} ${loading ? 'loading' : ''}`"
    @click="onClick"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class EasyButton extends Vue {
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: '' }) readonly type!: string
  @Prop({ default: false }) readonly loading!: boolean

  onClick (v: any) {
    this.$emit('click', v)
  }
}
</script>

<style lang="scss" scoped>
.button {
  background-color: $yellow;
  border-radius: 10px;
  border-width: 1px;
  border-color: $yellow;
  color: $black1;
  border-style: solid;

  height: 45px;
  width: 100%;

  font-size: 16px;
  font-weight: 600;

  text-transform: uppercase;
  cursor: pointer;

  margin-bottom: 1rem;

  outline: none;

  &.secondary {
    background-color: $grey;
    border-color: $grey;
  }

  &:hover {
    border-color: $black1;
    border-width: 1px;
  }
}

.loading {
  animation: loading 1s linear infinite alternate;
}

@keyframes loading {
  0% {
    border-color: $black1;
  }
  100% {
    border-color: $yellow;
  }
}
</style>
