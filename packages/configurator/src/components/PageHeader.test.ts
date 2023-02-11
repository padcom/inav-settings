import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PageHeader from './PageHeader.vue'

describe('PageHeader', () => {
  it('will render', () => {
    const value = 'Hello, world!'

    const wrapper = mount(PageHeader, {
      slots: {
        default: value,
      },
    })

    expect(wrapper.text()).toBe(value)
  })
})
