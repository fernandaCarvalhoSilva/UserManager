<template>
  <div class="bg-white p-8 rounded-4xl shadow max-w-3xl mx-auto font-poppins-light">
    <h2 class="text-xl font-bold mb-8">{{ title }}</h2>

    <table class="w-full table-auto hidden md:table">
      <thead>
        <tr class="text-gray-400">
          <th v-for="field in fields" :key="field.key" class="text-left p-2">
            {{ field.label }}
          </th>
          <th class="text-left p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t border-gray-300">
          <td v-for="field in fields" :key="field.key" class="py-4 px-2">
            {{ item[field.key] }}
          </td>
          <td class="py-4 px-2">
            <button @click="$emit('edit', item)" class="bg-green-600 text-white px-4 py-2 cursor-pointer rounded mr-4">
              Editar
            </button>
            <button @click="openDeleteModal(item)" class="bg-red-600 text-white px-4 py-2 cursor-pointer rounded">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="md:hidden space-y-4">
      <div v-for="item in items" :key="item.id" class="border border-gray-300 rounded-[10px] p-4 shadow-sm">
        <div v-for="field in fields" :key="field.key" class="mb-2">
          <strong>{{ field.label }}:</strong> {{ item[field.key] }}
        </div>
        <div class="flex justify-end space-x-2 mt-2">
          <button @click="$emit('edit', item)" class="bg-green-600 text-white px-4 py-2 cursor-pointer rounded">
            Editar
          </button>
          <button @click="openDeleteModal(item)" class="bg-red-600 text-white px-4 py-2 cursor-pointer rounded" data-testid="delete-modal-confirmation">
            Excluir
          </button>
        </div>
      </div>
    </div>

    <ConfirmationModal
      :show="isModalOpen"
      :message="`Tem certeza que deseja excluir ${itemToDelete?.[displayField]}?`"
      confirm-text="Excluir"
      :payload="itemToDelete?.id"
      @cancel="isModalOpen = false"
      @confirm="confirmDelete(itemToDelete)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConfirmationModal from './ConfirmationModal.vue'

const props = defineProps({
  items: { type: Array, required: true },
  fields: { type: Array, required: true },
  title: { type: String, default: 'Itens Cadastrados' },
  displayField: { type: String, default: 'name' },
})
const emit = defineEmits(['edit', 'delete'])
const isModalOpen = ref(false)
const itemToDelete = ref(null)

function openDeleteModal(item) {
  itemToDelete.value = item
  isModalOpen.value = true
}

function confirmDelete(item) {
  isModalOpen.value = false
  emit('delete', item)
}
</script>
