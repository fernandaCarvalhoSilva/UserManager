<template>
    <div class="p-8">
      <div class="flex justify-end mb-4">
        <NuxtLink to="/create" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Criar Usuário
        </NuxtLink>
      </div>
  
      <List
        :title="'Usuários Cadastrados'"
        :items="store.users"
        :fields="[
          { key: 'name', label: 'Nome' },
          { key: 'email', label: 'Email' }
        ]"
        display-field="name"
        @edit="editUser"
        @delete="deleteUser"
      />
    </div>
  </template>
  
  <script setup lang="js">
  import List from '~/components/List.vue'
  import { useUserStore } from '~/stores/userStore'
  import { useRouter } from 'vue-router'
  
  const store = useUserStore()
  const router = useRouter()
  
  await store.fetchUsers()
  
  function deleteUser(user) {
    store.deleteUser(user.id)
  }
  
  function editUser(user) {
    router.push(`/edit/${user.id}`)
  }
  </script>
  