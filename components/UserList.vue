<template>
  <div class="bg-white p-8 rounded-4xl shadow max-w-3xl mx-auto font-poppins-light">
    <h2 class="text-xl font-bold mb-8">Usuários Cadastrados</h2>

    <table class="w-full table-auto hidden md:table">
      <thead>
        <tr class="text-gray-400">
          <th class="text-left p-2">Nome</th>
          <th class="text-left p-2">Email</th>
          <th class="text-left p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in store.users" :key="user.id" class="border-t border-gray-300">
          <td class="py-4 px-2">{{ user.name }}</td>
          <td class="py-4 px-2">{{ user.email }}</td>
          <td class="py-4 px-2">
            <NuxtLink :to="`/edit/${user.id}`" class="bg-green-600 text-white px-4 py-2 cursor-pointer rounded mr-4">
              Editar
            </NuxtLink>
            <button @click="openDeleteModal(user)" class="bg-red-600 text-white px-4 py-2 cursor-pointer rounded"
              data-testid="delete-modal-confirmation">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="md:hidden space-y-4">
      <div v-for="user in store.users" :key="user.id" class="border border-gray-300 rounded-[10px] p-4 shadow-sm">
        <p class="mb-2"><strong>Nome:</strong> {{ user.name }}</p>
        <p class="mb-4"><strong>Email:</strong> {{ user.email }}</p>
        <div class="flex justify-end space-x-2">
          <NuxtLink :to="`/edit/${user.id}`" class="bg-green-600 text-white px-4 py-2 cursor-pointer rounded">
            Editar
          </NuxtLink>
          <button @click="openDeleteModal(user)" class="bg-red-600 text-white px-4 py-2 cursor-pointer rounded">
            Excluir
          </button>
        </div>
      </div>
    </div>

    <ConfirmationModal :show="isModalOpen" :message="`Tem certeza que deseja excluir o usuário ${userToDelete?.name}?`"
      confirm-text="Excluir" :payload="userToDelete?.id" @cancel="isModalOpen = false" @confirm="confirmDelete" />

  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { useUserStore } from '~/stores/userStore'
import ConfirmationModal from './ConfirmationModal.vue'

const isModalOpen = ref(false)
const userToDelete = ref(null)

function openDeleteModal(user) {
  userToDelete.value = user
  isModalOpen.value = true
}

function confirmDelete(userId) {
  isModalOpen.value = false
  store.deleteUser(userId)
}

const store = useUserStore()
</script>
