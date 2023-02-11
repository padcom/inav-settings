<template>
  <pre>{{ a.$state }}</pre>

  <button @click="a.login()">Login</button>
  <button @click="a.logout()">Logout</button>
</template>

<script setup lang="ts">
const a = useAuth()
</script>