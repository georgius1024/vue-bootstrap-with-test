import {
  shallowMount
} from '@vue/test-utils'

import component from '@/components/app/breadcrumbs'

describe('breadcrumbs.vue', () => {
  const wrapper = shallowMount(component)
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain('Начало')
    expect(wrapper.attributes().divider).toBe('/')
  })
  it('should show items array', () => {
    wrapper.setProps({ items: [
      {text: 'one'},
      {text: 'two'}
    ]})
    expect(wrapper.html()).not.toContain('Начало')
    expect(wrapper.html()).toContain('one')
    expect(wrapper.html()).toContain('two')
    const items = wrapper.findAll('v-breadcrumbs-item-stub')
    expect(items.length).toBe(2)
  })
})
