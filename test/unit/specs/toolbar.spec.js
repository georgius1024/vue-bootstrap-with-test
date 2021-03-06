import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import component from '@/components/app/toolbar'

const localVue = createLocalVue()
import router from '@/router'
localVue.use(router)

const el = document.createElement('div')
el.setAttribute('data-app', true)
document.body.appendChild(el)


describe('toolbar.vue', () => {
  const wrapper = mount(component, {
    propsData: {
      title: 'АБЫРВАЛГ',
    },
    localVue,
    router
  })
  it('should render correct contents', () => {

    expect(wrapper.props().title).toBe('АБЫРВАЛГ')
    expect(wrapper.html()).toContain('АБЫРВАЛГ')
    expect(wrapper.html()).toContain('Войти')

    const text = el.innerHTML
    expect(text).not.toContain('Выйти')
    expect(text).not.toContain('Профайл')
    expect(text).not.toContain('Сменить пароль')

  })

  it('should show profile controls', () => {
    wrapper.setProps({ profile: {
      fullName: 'Снегирев'
    }})
    expect(wrapper.html()).not.toContain('Войти')
    expect(wrapper.html()).toContain('Снегирев')

    const text = el.innerHTML
    expect(text).toContain('Выйти')
    expect(text).toContain('Профайл')
    expect(text).toContain('Сменить пароль')

  })

})
/*

describe('toolbar.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(component, {
      propsData: {
        title: 'АБЫРВАЛГ',
      },
      localVue,
      router
    })

    expect(wrapper.props().title).toBe('АБЫРВАЛГ')
    expect(wrapper.html()).toContain('АБЫРВАЛГ')
    expect(wrapper.html()).toContain('Войти')
  })

  it('should show profile controls', (done) => {
    const wrapper = mount(component, {
      propsData: {
        title: 'АБЫРВАЛГ',
        profile: {
          fullName: 'Снегирев'
        }
      },
      localVue,
      router
    })
    expect(wrapper.html()).not.toContain('Войти')
    expect(wrapper.html()).toContain('Снегирев')
  })
})
*/
