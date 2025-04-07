<template>
    <div v-if="message" class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow transition">
      {{ message }}
    </div>
  </template>
  
  <script setup lang="js">
  const { message } = useNotification()
  </script>
  