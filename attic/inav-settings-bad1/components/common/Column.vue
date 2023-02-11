<template>
  <div class="column" :class="{ 'fixed-width': props.width }" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: { type: String, default: null }
})
const style = computed(() => ({ width: props.width }))
</script>

<style lang="scss">
.column {
  display: flex;
  flex: 1 1 0px;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: flex-start;
  min-width: 1px;
  flex-direction: row;
}

.column + .column {
  margin-left: 12px;
}

.column + .full-width {
  margin-left: 0px;
}

.fixed-width {
  flex: 0 0 auto;
}
</style>
