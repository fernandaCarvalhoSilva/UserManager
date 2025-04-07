<template>
  <form @submit.prevent="onSubmit"
    class="bg-white p-8 rounded-4xl shadow max-w-3xl mx-auto font-poppins-light flex flex-col items-center justify-center">
    <h2 class="text-xl font-bold mb-4">
      {{ user?.id ? 'Editar Usuário' : 'Cadastrar Novo Usuário' }}
    </h2>

    <div class="mb-4">
      <label class="block mb-1">Nome</label>
      <input v-model="form.name" type="text" class="w-full border border-gray-300 rounded-[10px] p-2"
        :class="{ 'border-red-500': errors.name }" />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
    </div>

    <div class="mb-4">
      <label class="block mb-1">Email</label>
      <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-[10px] p-2"
        :class="{ 'border-red-500': errors.email }" />
      <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
    </div>

    <div class="mb-4" v-if="!user?.id">
      <label class="block mb-1">Senha</label>
      <input v-model="form.password" type="password" class="w-full border border-gray-300 rounded-[10px] p-2"
        :class="{ 'border-red-500': errors.password }" />
      <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
    </div>

    <div class="flex items-center w-full px-4 py-2" :class="user?.id ? 'justify-between' : 'justify-center'">
      <button type="button" v-if="user" @click="$emit('saved')" class="text-gray-500">
        Cancelar
      </button>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ user?.id ? 'Atualizar' : 'Cadastrar' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="js">
import { ref, watch } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { useNotification } from '~/composables/useNotification'

const props = defineProps({
  selectedUser: Object
})

const emit = defineEmits(['saved'])

const store = useUserStore()
const { notify } = useNotification()

const user = ref(props.selectedUser || null)
const form = ref({ name: '', email: '', password: '' })

const errors = ref({})

watch(
  () => props.selectedUser,
  (newVal) => {
    if (newVal) {
      user.value = newVal
      form.value = {
        name: newVal.name,
        email: newVal.email,
        password: '',
      }
    }
  },
  { immediate: true, deep: true }
)

function validate() {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Nome é obrigatório.'
  if (!form.value.email) {
    errors.value.email = 'Email é obrigatório.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Formato de e-mail inválido.'
  }
  if (!user.value?.id && !form.value.password)
    errors.value.password = 'Senha é obrigatória.'
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  if (!validate()) return

  if (user.value?.id) {
    await store.updateUser(user.value.id, form.value)
    notify('Usuário atualizado com sucesso!')
  } else {
    await store.addUser(form.value)
    notify('Usuário cadastrado com sucesso!')
  }

  emit('saved')
  form.value = { name: '', email: '', password: '' }
}
</script>
