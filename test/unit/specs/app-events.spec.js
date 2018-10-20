import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import router from '@/router'
import store from '@/store'

// import Api from '@/api'
// import mockAxios from '../mocks/axios.mock'
import eventBus from  '@/event-bus'

const localVue = createLocalVue()
localVue.use(store)
localVue.use(router)


import App from '@/App'


describe('App.vue', () => {
  const wrapper = shallowMount(App, {
    localVue,
    router,
    store
  })
  it('should be mounted without errors', () => {
    expect(wrapper).toBeTruthy()
  })

  it('event hanlers works as expected', () => {
    // Методы отрабатываю, как надо
    eventBus.emit(eventBus.events.message, 'message')
    expect(wrapper.vm.message).toBe('message')
    expect(wrapper.vm.level).toBe('')

    eventBus.emit(eventBus.events.error, 'error')
    expect(wrapper.vm.message).toBe('error')
    expect(wrapper.vm.level).toBe('error')

    eventBus.emit(eventBus.events.busy)
    expect(wrapper.vm.spinner).toBeTruthy()

    eventBus.emit(eventBus.events.idle)
    expect(wrapper.vm.spinner).toBeFalsy()
  })

  it('should listen events', () => {
    const raiseMessage = jest.fn()
    const raiseError = jest.fn()
    const startSpinner = jest.fn()
    const stopSpinner = jest.fn()
    wrapper.setMethods({
      raiseMessage,
      raiseError,
      startSpinner,
      stopSpinner
    })
    // Методы были вызваны
    eventBus.emit(eventBus.events.message, 'message')
    expect(raiseMessage).toBeCalled()
    expect(raiseMessage).toBeCalledWith('message')

    eventBus.emit(eventBus.events.error, 'error')
    expect(raiseError).toBeCalled()
    expect(raiseError).toBeCalledWith('error')

    eventBus.emit(eventBus.events.busy)
    expect(startSpinner).toBeCalled()

    eventBus.emit(eventBus.events.idle)
    expect(stopSpinner).toBeCalled()

  })
})

/*
describe('App.vue', () => {
  Api.http = mockAxios

  it('should run', async() => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    const raiseMessage = jest.fn()
    const raiseError = jest.fn()
    const startSpinner = jest.fn()
    const stopSpinner = jest.fn()

    wrapper.setMethods({
      raiseMessage,
      raiseError,
      startSpinner,
      stopSpinner
    })

    mockAxios.mockResponse = {
      data: {
        message,
      },
      status: 200
    }
    await Api.get('users')
    expect(startSpinner).toHaveBeenCalledTimes(1)
    expect(stopSpinner).toHaveBeenCalledTimes(1)
    expect(raiseMessage).toHaveBeenCalledTimes(1)
    expect(raiseMessage).toHaveBeenCalledWith(message)

    mockAxios.mockError = {
      response: {
        status: 500
      },
      message: 101
    }
    try {
      await Api.get('users')
    } catch(err) {
      // console.log(error)
    }

    expect(startSpinner).toHaveBeenCalledTimes(2)
    expect(stopSpinner).toHaveBeenCalledTimes(2)
    expect(raiseError).toHaveBeenCalledTimes(1)
    expect(raiseError).toHaveBeenCalledWith(101)

    // console.log(wrapper.html())
    // expect(wrapper.html()).toContain('Switch drawer (click me)')
    //expect(WRAF).toBe(0)
  })
})
*/
