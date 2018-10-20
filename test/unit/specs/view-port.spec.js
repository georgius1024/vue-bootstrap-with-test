import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Component from '@/components/app/view-port'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()


describe('view-port.vue', () => {

  it('should render correct way', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      router
    })
    expect(wrapper).toMatchSnapshot();
  })

})
