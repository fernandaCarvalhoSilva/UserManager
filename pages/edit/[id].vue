<template>
  <div class="p-6 max-w-xl mx-auto">
    <NuxtLink to="/" class="text-blue-600 underline text-sm mb-4 inline-block">
      ← Voltar para a lista
    </NuxtLink>
    <UserForm v-if="store.user" :selectedUser="store.user" @saved="onSaved" />
    <p v-else class="text-gray-600">Carregando usuário...</p>
  </div>
</template>

<script setup lang="js">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/userStore'
import UserForm from '~/components/UserForm.vue'
import { watchEffect } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const id = parseInt(route.params.id, 10)

store.fetchUser(id)

watchEffect(() => {
  if (!store.user && store.users.length > 0) {
    const found = store.users.find(u => Number(u.id) === id)
    if (found) store.user = found
    else router.push('/')
  }
})

function onSaved() {
  router.push('/')
}
</script>