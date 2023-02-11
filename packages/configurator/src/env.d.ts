// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

declare module '*.vue' {
  // NOTE: ts-loader
  import { type defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent>
  export default component
}
