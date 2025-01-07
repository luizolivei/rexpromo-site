<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  cart: {
    type: Object,
  },
});

function quantityMask(quantity, kilo) {
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
  <div class="grid md:grid-cols-12 grid-cols-3">
    <div v-for="item in cart"
         class="flex flex-col justify-center align-middle items-center p-2 m-2 border rounded">
      <img
          :src="item.galeria"
          class="h-[82px] w-[82px] rounded me-2"
          alt="itemImage"
      />
      <div>
        <p class="text-xs">{{ item.nome }}</p>
        <p class="text-xs">Quantidade: {{ quantityMask(item.quantity, item.preco_por_quilo) }}</p>
      </div>
    </div>
  </div>
</template>