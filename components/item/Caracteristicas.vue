<template>
  <div class="card-background p-3">
    <h4 class="fs-16 font-bold">Características</h4>
    <div class="grid grid-cols-1 gap-1">
      <div class="col-span-1" v-for="(caracteristicas, index) in caracteristicas" :key="index">
        <i class="guia-icons guia-icon-check-bold"/>
        <span class="text-muted cor-diferencial">{{ caracteristicas.nome }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  caracteristicas: {
    type: Array,
  },
  nome: {
    type: String,
  },
});
</script>
