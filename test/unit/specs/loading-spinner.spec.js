import Vue from 'vue'
import {
  shallowMount
} from '@vue/test-utils'

import LoadingSpinner from '@/components/loading-spinner'

describe('loading-spinner.vue', () => {
  const wrapper = shallowMount(LoadingSpinner)
  it('should render correct contents', () => {
    expect(wrapper.html()).toContain('v-progress-circular-stub')
    const div = wrapper.find('.loading-spinner-control')
    expect(div.html()).toContain('v-progress-circular-stub')
    expect(div.attributes().style).toBe('display: none;')
  })
  it('should show when :loading is true', () => {
    wrapper.setProps({ loading: true })
    const div = wrapper.find('.loading-spinner-control')
    expect(div.attributes().style).toBe('')
  })
  it('should hide when :loading is false again', () => {
    wrapper.setProps({ loading: false })
    const div = wrapper.find('.loading-spinner-control')
    expect(div.attributes().style).toBe('display: none;')
  })

})
