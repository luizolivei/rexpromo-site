<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<template>
  <div class="max-h-[900px] w-[370px] md:w-[622px] p-5 border grid grid-cols-12 gap-3">
    <div class="col-span-12 flex justify-center">
      <img
          :src="item.galeria[0].imagem"
          class="h-[282px] w-[282px] rounded me-2"
          alt="itemImage"
      />
    </div>

    <div class="col-span-12 border-b-2">
      <p class="text-2xl font-bold">{{ item.nome }}</p>
    </div>

    <div class="col-span-5 border-r-2">
      <p class="text-xl">{{ item.descricao }}</p>
    </div>

    <div class="col-span-7">
      <p class="text-md md:text-2xl">R${{ item.valor }}
        <span v-if="item.preco_por_quilo">por quilo</span>
        <span v-else>por unidade</span>
      </p>
      <ItemShoppingCartKgManager v-if="item.preco_por_quilo" :data="item"/>
      <ItemShoppingCartManager v-else :data="item"/>
    </div>
  </div>
</template>