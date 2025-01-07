<script setup lang="ts">
const props = defineProps({
  itens: {type: Object, default: false}
})

function quantityMask(quantity: number, kilo: boolean) {
  if (!kilo)
    return quantity

  if (!quantity)
    return "0g"

  if (quantity < 1000)
    return `${quantity}g`

  let thousands = Math.floor(quantity / 1000);
  let belowThousands = quantity % 1000;

  if (belowThousands) {
    return `${thousands}kg e ${belowThousands}g`
  }

  return `${thousands}kg`;
};
</script>

<template>
  <div>
    <div class="mt-4" v-for="(item, i) in itens" :key="i">
      <div class="flex">
        <img
            :src="item.galeria"
            class="w-[75px] h-[75px] me-2"
            alt="itemImage"
        />
        <div>
          <p class="text-xl">{{ item.nome }}</p>
          <p>Preço unitario: R${{ item.valor }}</p>
          <p>Quantidade: {{ quantityMask(item.quantity, item.preco_por_quilo) }}</p>
        </div>
      </div>
      <hr class="my-2">
    </div>

    <slot name="button"/>
  </div>
</template>