<template>
    <div class="p-8">
        <div class="flex justify-end mb-4">
            <NuxtLink to="/create" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Criar Usuário
            </NuxtLink>
        </div>
        <UserList @delete="deleteUser" />
    </div>
</template>

<script setup lang="js">
import UserList from '~/components/UserList.vue'
import { useUserStore } from '~/stores/userStore'

const store = useUserStore()
await store.fetchUsers()

function deleteUser(id) {
    store.deleteUser(id)
}
</script>