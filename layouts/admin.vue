<template>
  <LazyHeaderAdmin/>
  <Transition name="fade">
    <main class="min-h-screen">
      <slot/>
    </main>
  </Transition>
</template>

<script setup>
const { $mobile } = useNuxtApp()
</script>
