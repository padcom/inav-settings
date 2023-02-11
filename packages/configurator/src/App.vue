<template>
  <AppHeader />
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang="postcss" scoped>
.container {
  @apply px-[5%];
}

/* This class will NOT be included */
.app-scoped {
  @apply text-blue-900 border border-solid border-red-500;
}
</style>
