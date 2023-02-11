<template>
  <Column class="page">
    <slot />
  </Column>
</template>

<style lang="scss">
.page {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 24px 0 24px;
}
</style>
