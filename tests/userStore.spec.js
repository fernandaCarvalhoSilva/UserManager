
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { ofetch } from 'ofetch'

vi.mock('ofetch', () => {
  return {
    ofetch: vi.fn()
  }
})

const mockOfetch = ofetch

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockOfetch.mockReset()
  })

  it('adiciona um novo usuário', async () => {
    const store = useUserStore()

    mockOfetch.mockResolvedValueOnce({}) 

    vi.spyOn(store, 'fetchUsers').mockImplementation(() => {
      store.users = [{ id: 1, name: 'Teste', email: 'teste@email.com' }]
      return Promise.resolve()
    })

    await store.addUser({ name: 'Teste', email: 'teste@email.com', password: '1234' })

    expect(store.users.length).toBe(1)
    expect(store.users[0].name).toBe('Teste')
  })

  it('atualiza um usuário existente', async () => {
    const store = useUserStore()
    store.users = [
      { id: 1, name: 'Teste', email: 'teste@email.com', password: 'abc' }
    ]

    mockOfetch.mockResolvedValueOnce({})

    vi.spyOn(store, 'fetchUsers').mockImplementation(() => {
      store.users = [
        { id: 1, name: 'Atualizado', email: 'teste@email.com' }
      ]
      return Promise.resolve()
    })

    await store.updateUser(1, { name: 'Atualizado', email: 'teste@email.com' })

    expect(store.users[0].name).toBe('Atualizado')
  })

  it('remove um usuário', async () => {
    const store = useUserStore()
    store.users = [
      { id: 2, name: 'ParaRemover', email: 'x@email.com', password: '123' }
    ]

    mockOfetch.mockResolvedValueOnce({})

    vi.spyOn(store, 'fetchUsers').mockImplementation(() => {
      store.users = []
      return Promise.resolve()
    })

    await store.deleteUser(2)

    expect(store.users.length).toBe(0)
  })
})