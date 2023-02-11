import { defineStore } from 'pinia'
import { useNow } from '@vueuse/core'

export const useDateStore = defineStore('date', () => {
  const now = useNow()

  return { now }
})
