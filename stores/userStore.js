import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: null,
  }),
  actions: {
    async fetchUsers() {
      if (process.client) {
        this.users = await ofetch('/api/users').then(res => res.users)
      }
    },
    async fetchUser(id) {
      const res = await ofetch('/api/users')
      const found = res.users.find((u) => Number(u.id) === id)
      this.user = found || null
    },
    async addUser(user) {
      await ofetch('/api/users', { method: 'POST', body: user })
      this.fetchUsers()
    },
    async updateUser(id, user) {
      await ofetch(`/api/users/${id}`, { method: 'PUT', body: user })
      this.fetchUsers()
    },
    async deleteUser(id) {
      await ofetch(`/api/users/${id}`, { method: 'DELETE' })
      this.fetchUsers()
    },
  },
})
