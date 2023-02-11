export default function() {
  const { data: message, pending, refresh } = useFetch('/api/news', {
    server: false,
    pick: ['message'],
    default: () => ({ message: 'I am currently loading...' }),
  })

  function upc() {
    // message.value = { message: message.value?.message.toUpperCase() || '' }
    refresh()
  }

  return {
    message,
    pending,
    refresh,
    upc
  }
}
