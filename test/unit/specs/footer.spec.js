import config from  '@/config'
import {
  shallowMount
} from '@vue/test-utils'

import Footer from '@/components/app/footer'

describe('footer.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Footer, {
      propsData: {
        copyright: config.APP_COPYRIGHT,
        application: config.APP_NAME,
        version: config.APP_VERSION
      }
    })
    expect(wrapper.html()).toContain(config.APP_COPYRIGHT)
    expect(wrapper.html()).toContain(config.APP_NAME)
    expect(wrapper.html()).toContain(config.APP_VERSION)
  })

})
