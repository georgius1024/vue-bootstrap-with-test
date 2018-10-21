
import Message from '@/components/app/message'
import {
  mount,
  shallowMount
} from '@vue/test-utils'


const message = 'olololololo!'
describe('message.vue', () => {
  jest.useFakeTimers()

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

  it('should show and hide by manipulation with input property', () => {
    const wrapper = mount(Message)
    expect(wrapper.html()).toBeFalsy()  // DIV еще не отрисован
    wrapper.setProps({ message: message, timeout: 10000, value: true })
    expect(wrapper.html()).toBeTruthy()  // DIV появляется
    wrapper.setProps({ value: false })
    expect(wrapper.html()).toBeFalsy()  // DIV снова исчезает
  })

  it('should close after timeout', () => {
    jest.useFakeTimers()
    const wrapper = mount(Message)
    expect(wrapper.html()).toBeFalsy()
    wrapper.setProps({ message: message, timeout: 10, value: true })
    expect(wrapper.html()).toBeTruthy()
    jest.runTimersToTime(12)
    expect(wrapper.html()).toBeFalsy()
  })

  it('should emit input(false) on button click', () => {
    const wrapper = shallowMount(Message)
    wrapper.setProps({ message: message, value: true })
    wrapper.find('v-btn-stub').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[0][0]).toBe(false)
  })

})
