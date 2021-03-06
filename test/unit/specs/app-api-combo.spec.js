// TODO DELETE THIS TEST
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

const localVue = createLocalVue()
localVue.use(store)
localVue.use(router)


import App from '@/App'


describe('App.vue', () => {
  it('should run', async() => {
    const wrapper = shallowMount(App, {
      localVue,
      router,
      store
    })
  })
  it('can call own methods without error', () => {
    let errorCnt = 0
    const wrapper = shallowMount(App, {
      localVue,
      router,
      store
    })

    try {
      wrapper.vm.timedOut()
      expect(wrapper.vm.message).toBe('Процесс завершился тайм-аутом')
      wrapper.vm.messageAction()
      wrapper.vm.errorAction()
      wrapper.vm.waitAction()
      wrapper.vm.loginAction()
      wrapper.vm.logoutAction()
    } catch (error) {
      // console.error(error)
      errorCnt += 1
    }
    expect(errorCnt).toBe(0)
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
