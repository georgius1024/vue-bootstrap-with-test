import App from '@/App'
import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('App.vue', () => {
  it('should run', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    })
    console.log(wrapper.html())
    // expect(wrapper.html()).toContain('Switch drawer (click me)')
    //expect(WRAF).toBe(0)
  })
})
