import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import List from '../components/List.vue'

describe('List', () => {
  const users = [
    { id: 1, name: 'Teste', email: 'teste@email.com' },
    { id: 2, name: 'ParaRemover', email: 'x@email.com' }
  ]

  const fields = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' }
  ]

  it('exibe usuários cadastrados', () => {
    const wrapper = mount(List, {
      props: {
        title: 'Usuários Cadastrados',
        items: users,
        fields,
        displayField: 'name'
      },
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    expect(wrapper.text()).toContain('Teste')
    expect(wrapper.text()).toContain('teste@email.com')
    expect(wrapper.text()).toContain('ParaRemover')
    expect(wrapper.text()).toContain('x@email.com')
  })

  it('emite evento de delete após confirmação na modal', async () => {
    const wrapper = mount(List, {
      props: {
        title: 'Usuários Cadastrados',
        items: users,
        fields,
        displayField: 'name'
      },
      global: {
        stubs: {
          NuxtLink: { template: '<a><slot /></a>' }
        }
      }
    })

    await wrapper.findAll('[data-testid="delete-modal-confirmation"]')[0].trigger('click')
    await wrapper.vm.$nextTick()

    await wrapper.findComponent({ name: 'ConfirmationModal' }).vm.$emit('confirm')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0][0]).toEqual(users[0])
  })
})
