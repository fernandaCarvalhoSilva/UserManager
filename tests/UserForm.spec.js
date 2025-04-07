import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '~/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import UserForm from '../components/UserForm.vue'
import EditPage from '~/pages/edit/[id].vue'

describe('UserForm', () => {
  const routes = [{ path: '/edit/:id', component: EditPage }]
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  it('valida campos obrigatórios', async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { selectedUser: null },
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.html()).toContain('Nome é obrigatório')
    expect(wrapper.html()).toContain('Email é obrigatório')
    expect(wrapper.html()).toContain('Senha é obrigatória')
  })

  it('emite evento ao cadastrar usuário válido', async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: { selectedUser: null },
    })

    await wrapper.find('input[type="text"]').setValue('Teste')
    await wrapper.find('input[type="email"]').setValue('teste@email.com')
    await wrapper.find('input[type="password"]').setValue('1234')
    await wrapper.find('form').trigger('submit.prevent')

    await new Promise((r) => setTimeout(r, 50))

    expect(wrapper.emitted('saved')).toBeTruthy()
  })

  it('atualiza o usuário com sucesso e redireciona', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const store = useUserStore()

    const fetchUserMock = vi.spyOn(store, 'fetchUser').mockImplementation(async (id) => {
      store.user = { id, name: 'Teste', email: 'teste@email.com' }
    })

    const updateUserMock = vi.spyOn(store, 'updateUser').mockResolvedValue()

    const pushMock = vi.fn()
    router.push = pushMock
    await router.replace('/edit/5')
    await router.isReady()

    const wrapper = mount(EditPage, {
      global: {
        plugins: [pinia, router],
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    await flushPromises()

    await wrapper.find('input[type="text"]').setValue('Teste Editado')
    await wrapper.find('input[type="email"]').setValue('editado@email.com')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(updateUserMock).toHaveBeenCalledWith(5, {
      name: 'Teste Editado',
      email: 'editado@email.com',
      password: ''
    })

    expect(pushMock).toHaveBeenCalledWith('/')
  }, 10000)
})