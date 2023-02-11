<template>
  <div class="column full-width">
    <slot />
  </div>
</template>

<script>
import './Column.vue'
</script>

<style lang="scss">
.full-width {
  width: 100%;
  flex-basis: 100%;
}
</style>


