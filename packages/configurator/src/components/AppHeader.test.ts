import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AppHeader from './AppHeader.vue'

describe('AppHeader', () => {
  it('will render', () => {
    const value = 'Hello, world!'

    const wrapper = mount(AppHeader, {
      slots: {
        default: value,
      },
    })

    expect(wrapper.text()).toBe(value)
  })
})
