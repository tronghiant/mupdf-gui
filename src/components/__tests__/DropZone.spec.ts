import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DropZone from '../DropZone.vue'

describe('DropZone', () => {
  it('renders properly', () => {
    const slotContent = 'Hello DropZone'
    const wrapper = mount(DropZone, { slots: { default: slotContent } })
    expect(wrapper.text()).toContain(slotContent)
  })
  it('should be in de-active state by default', () => {
    const wrapper = mount(DropZone, {
      slots: { default: `Active state: [{{ params.dropZoneActive }}]` }
    })
    console.log(wrapper.text())
    expect(wrapper.text()).toContain(`Active state: [false]`)
  })
})
