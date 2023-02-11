<template>
  <pre>(user) {{ a.$storage.options }}</pre>
  <pre>(user) {{ a.$state }}</pre>
  <h3>{{ pending }}</h3>
  <h1>(message) {{ message }}</h1>
  <button @click="auth.upc">Click me</button>
  <button @click="a.loginWith('google')">Login</button>
  <button @click="a.logout()">Logout</button>
  <button @click="a.fetchUserOnce()">Fetch user</button>
</template>

<script setup lang="ts">
import useAuthentication from '@/stores/authentication'

definePageMeta({ middleware: 'auth' })

const a = useAuth()

const auth = useAuthentication()
const message = computed(() => auth.message.value?.message)
const pending = auth.pending

// const { data, pending } = useFetch('/api/news', { server: false })
// const message = computed(() => data.value?.message)

// const { message } = await $fetch('/api/news')
// const pending = false
// const message = 'Hello, world!'
// const pending = false
</script>
