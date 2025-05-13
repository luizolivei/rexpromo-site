<script setup>
import logo from '@/assets/img/logo-no-bg.png'
</script>

<template>
  <header class="bg-white shadow p-4 flex items-center">
    <NuxtLink to="/" class="flex items-center space-x-2">
      <img :src="logo" alt="Logo" class="h-8 w-auto" />
      <span class="text-xl font-bold text-gray-800">Rexpromo</span>
    </NuxtLink>
  </header>
</template>
