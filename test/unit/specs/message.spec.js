import Message from '@/components/app/message'
import {
  shallowMount
} from '@vue/test-utils'
const message = 'olololololo!'
describe('message.vue', () => {
  it('Accept message property', () => {
    const wrapper = shallowMount(Message)
    const element = wrapper.find('v-snackbar-stub')
    wrapper.setProps({ message })
    expect(element.html()).toContain(message)
  })

  it('Accept level property', () => {
    const wrapper = shallowMount(Message)
    wrapper.setProps({ level: 'error' })
    const element = wrapper.find('v-snackbar-stub')
    expect(element.attributes().color).toBe('error')
    wrapper.setProps({ level: '' })
    expect(element.attributes().color).toBe('info')
  })

  it('Accept timeout property', () => {
    const wrapper = shallowMount(Message)
    wrapper.setProps({ timeout: 10000 })
    const element = wrapper.find('v-snackbar-stub')
    expect(element.attributes().timeout).toBe('10000')
  })

})
