interface ExampleResponse {
  status: string
}

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default defineEventHandler(async (event) => {
  const data: ExampleResponse = await $fetch('https://dummy.restapiexample.com/api/v1/employees')
  await sleep(300)
  return { message: 'Hello, world! from API! (' + data.status + ')' }
})
