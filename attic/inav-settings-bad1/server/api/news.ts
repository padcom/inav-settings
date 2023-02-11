import { getServerSession } from '#auth'

interface ExampleResponse {
  status: string
}

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (session) console.log('Session', session)
  else console.log('Not logged in')
  if (!(await useStorage().hasItem('memory:data'))) {
    console.log('Storage does not contain data - fetching')
    const data: ExampleResponse = await $fetch('https://dummy.restapiexample.com/api/v1/employees')
    await useStorage().setItem('memory:data', data)
  } else {
    console.log('Data in storage - not fetching')
  }
  const data = await useStorage().getItem('memory:data')
  // await sleep(300)
  return { message: 'Hello, world! from API! (' + data.status + ')' }
})
