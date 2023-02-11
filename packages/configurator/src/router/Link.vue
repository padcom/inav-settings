<template>
  <router-link :to="props.to" class="link">
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
const props = defineProps<{
  /**
   * Where to lead this link to
   */
  to: string
}>()
</script>

<style lang="postcss">
.link {
  @apply text-blue-700 no-underline;

  &:hover {
    @apply underline;
  }
}
</style>
