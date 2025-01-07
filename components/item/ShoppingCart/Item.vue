<template>
  <div class="flex my-3">
    <img
        :src="item['galeria']"
        class="img-item me-2"
        alt="itemImage"
    />

    <div class="flex flex-col">
      <b>{{ item.nome }}</b>
      <span class="my-1">{{ item.valor ? "R$" + (item.valor.toFixed(2)) + " por unidade" : "Preço a combinar" }}</span>
      <div v-if="showManager">
      <ItemShoppingCartKgManager v-if="item.preco_por_quilo" :data="item"/>
      <ItemShoppingCartManager v-else :data="item" @click.prevent/>
      </div>
      <span v-else>{{item.quantity}}  {{item.quantity.length > 1 ? "unidades" : "unidade"}}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object
  },
  showManager: {
    type: Boolean,
    default: true
  }
})

const {item} = props

</script>

<style>
.img-item {
  width: 100px;
  height: 100px;
  object-fit: cover;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
