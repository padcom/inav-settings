import { ref, unref, watchEffect } from 'vue'
import { get } from '@vueuse/core'

function clone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * An "editor"-type ref generator that connects a property (usually 'modelValue')
 * to a ref value that can be locally modified. However, when the prop value changes
 * that means the user started from a different origin and it becomes the current
 * value of data
 *
 * @param props source reactive object (usually props)
 * @param name name of the prop to connect to
 * @param def default value for the field if it is missing in the props.
 * @returns a ref connected to props[name] with the prop changes having higher priority over local edits
 */
export function editorRef<T, K extends keyof T>(props: T, name: K, def?: T[K]) {
  const data = ref<T[K]>()

  watchEffect(() => {
    data.value = clone(unref(get(props, name) ?? def))
  })

  return data
}
