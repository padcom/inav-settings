<template>
  <AppHeader />
  <ul>
    <li v-for="entry in settings" :key="entry.id">{{ entry }}</li>
  </ul>
  <button v-if="!user" @click="login">Login</button>
  <button v-else @click="logout">Logout</button>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@/auth'
import { useCollection } from '@/firebase'
import AppHeader from '@/components/AppHeader.vue'

const { user, login, logout } = useAuth()
const settings = useCollection('settings')
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
