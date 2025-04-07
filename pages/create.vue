<template>
  <div class="p-6 max-w-xl mx-auto">
    <NuxtLink to="/" class="text-blue-600 underline text-sm mb-4 inline-block">
      ← Voltar para a lista
    </NuxtLink>
    <UserForm @saved="onSaved" />
  </div>
</template>

<script setup lang="js">
import UserForm from '~/components/UserForm.vue'
const router = useRouter()

function onSaved() {
  router.push('/')
}
</script>