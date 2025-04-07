<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 class="text-xl font-semibold mb-4">Confirmação</h2>
      <p class="mb-6">
        {{ message }}
      </p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('cancel')"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded-[10px] cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm', payload)"
          class="bg-red-600 text-white px-4 py-2 rounded-[10px] cursor-pointer"
          data-testid="confirmation-modal"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  payload: {
    type: [String, Number, Object, null],
    default: null
  }
})

defineEmits(['cancel', 'confirm'])
</script>
