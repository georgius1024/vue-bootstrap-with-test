import {} from './mocks/local-storage.mock'

import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.config.warnHandler = (msg, vm, trace) => {
  const currentStack = new Error('').stack;
  const isInVueTestUtils = currentStack.split('\n').some(line => line.startsWith('    at VueWrapper.setProps ('));
  if (isInVueTestUtils) {
    return;
  }
  // console.log(`${msg}${trace}`)
  // if (done) {
  //  done.fail();
  // }

};

window.requestAnimationFrame = function () {}


Vue.config.productionTip = false
