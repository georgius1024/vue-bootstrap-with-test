import {
  shallowMount
} from '@vue/test-utils'

import Component from '@/components/app/scroll-top'

describe('footer.vue', () => {
  const wrapper = shallowMount(Component, {
    propsData: {
      right: 100,
      bottom: 100,
      speed: 20
    }
  })
  it('should render correct props', () => {
    expect(wrapper.props().right).toBe(100)
    expect(wrapper.props().bottom).toBe(100)
    expect(wrapper.props().speed).toBe(20)
  })

})
