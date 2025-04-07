import { ref } from 'vue'

const message = ref('')

export function useNotification() {
  function notify(msg) {
    message.value = msg
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }

  return { message, notify }
}
