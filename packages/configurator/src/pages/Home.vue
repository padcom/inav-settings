<template>
  <PageHeader>Homepage</PageHeader>
  Go to <Link to="about">About</Link> page..

  <div class="content">
    <h3 class="content-header">Example content:</h3>
    {{ date.now }} {{ message }} ({{ example }})
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageHeader from '@/components/PageHeader.vue'
import { useDateStore } from '@/stores/date'

export default defineComponent({
  components: {
    PageHeader,
    // Link,
  },
  setup() {
    const date = useDateStore()

    return { date }
  },
  data() {
    return {
      message: 'this.example cannot be used here',
      // test: this.example,
      info: 'from data',
    }
  },
  computed: {
    example() {
      // but you can use props and and data in computed properties
      return this.info
    },
  },
})
</script>

<style lang="postcss">
.content {
  @apply mt-16 text-xs text-green-900;
}

.content-header {
  @apply text-black font-extralight;
}
</style>
