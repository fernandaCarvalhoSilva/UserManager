import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserList from '../components/UserList.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../stores/userStore'

describe('UserList', () => {
  it('exibe usuários cadastrados', async () => {
    const wrapper = mount(UserList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            user: {
              users: [
                { id: 1, name: 'Teste', email: 'teste@email.com' }
              ]
            }
          }
        })],
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    expect(wrapper.text()).toContain('Teste')
    expect(wrapper.text()).toContain('teste@email.com')
  })

  it('Exclui usuário via modal de confirmação', async () => {
    const wrapper = mount(UserList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: {
                users: [
                  { id: 2, name: 'ParaRemover', email: 'x@email.com' }
                ]
              }
            }
          })
        ],
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })
  
    const store = useUserStore()
  
    vi.spyOn(store, 'deleteUser').mockImplementation((id) => {
      store.users = store.users.filter(u => u.id !== id)
      return Promise.resolve()
    })
  
    await wrapper.find('[data-testid="delete-modal-confirmation"]').trigger('click')
    await wrapper.vm.$nextTick()
  
    await wrapper.find('[data-testid="confirmation-modal"]').trigger('click')
  
    expect(store.users.length).toBe(0)
  })
  
})