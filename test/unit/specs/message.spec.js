import Vue from 'vue'
import Vuex from 'vuex'
import config from  '@/config'
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import { hasStored, getStored, putStored, deleteStored, deleteAll } from '@/lib/local-storage'
import {} from '../mocks/local-storage.mock'
import Message from '@/components/message'

const localVue = createLocalVue()

localVue.use(Vuex)


const user = {
  id: 1,
  name: 'Super-user-barabuser'
}
const token = 'token-token-nigger-broken'

describe('message.vue', () => {
  putStored(config.APP_ID + '-' + 'user', user)
  putStored(config.APP_ID + '-' + 'token', token)
  const store = require('@/store').default

  it('should do something', () => {
    const wrapper = shallowMount(Message, { store, localVue })
    expect(wrapper.html()).toContain('v-snackbar-stub')
    console.log(wrapper.html())
  })

})
