<script setup>
import {useRoute} from "nuxt/app";

const router = useRoute();

const {
  setCart,
  cart,
  toggleCart,
  isCartOpen
} = useCart()

const props = defineProps({
  data: {
    type: Object
  }
});

const {
  _idHotSite,
  anuncio_referencias,
  _id,
  nome,
  preco_por_quilo,
  valor,
  galeria,
  endereco,
  telefone
} = props.data;

let quantity = ref(0);

watchEffect(() => {
  let currentCart = cart.value;

  if (!currentCart.length)
    return quantity.value = 0;

  let itemExistente = currentCart.find(item => item._id === _id);

  if (itemExistente) {
    quantity.value = itemExistente.quantity
  } else {
    quantity.value = 0
  }
});

const {$mobile} = useNuxtApp()
const isMobile = useState(() => $mobile)

const managementCartQuantity = (type) => {
  if (quantity === 0 && !type) return;

  let whats = "";
  if (endereco) {
    whats = endereco[telefone[0]['endereco']]['Telefones'][telefone[0]['telefone']]['TelefoneNumerico']
  }

  quantity.value = type === 0 ? quantity.value - 1 : type === 1 ? quantity.value += 1 : quantity.value = 0;

  const newItem = {
    _id: _id,
    quantity: quantity.value,
    nome: nome,
    preco_por_quilo: preco_por_quilo,
    valor: valor >= 0.1 ? valor : null,
    galeria: galeria[0]['imagem']
  };

  if (cart.value.length > 0) {
    const index = cart.value.findIndex(item => item._id === newItem._id);

    if (index === -1) {
      if (!isCartOpen.value)
        if (!isMobile) {
          toggleCart()
        }
      cart.value.push(newItem);
    } else {
      cart.value[index].quantity = quantity.value;

      if (cart.value[index].quantity === 0) {
        cart.value.splice(index, 1);
      }
    }
    setCart(cart.value);
  } else {
    if (!isCartOpen.value)
      if (!isMobile) {
        toggleCart()
      }
    setCart([newItem]);
  }
}
</script>

<template>
  <button
      v-if="!quantity"
      class="text-white bg-buttons-blue rounded h-[34px] w-full"
      title="Adicionar item em seu carrinho de compras."
      @click="managementCartQuantity(1)"
  >
    <i class="guia-icons guia-icon-cart mx-1"/>
    Adicionar
  </button>

  <div v-else class="flex justify-center border border-main-light-gray font-semibold text-base w-[195px]">
    <button
        class="text-buttons-blue flex justify-center text-2xl rounded w-[32px] h-[32px] items-center"
        @click.prevent="managementCartQuantity(0)"
    >
      -
    </button>
    <span class="p-1">{{ quantity === 1 ? "1 unidade" : `${quantity} unidades` }}</span>
    <button
        class="text-buttons-blue flex justify-center text-2xl rounded w-[32px] h-[32px] items-center"
        @click.prevent="managementCartQuantity(1)"
    >
      +
    </button>
  </div>

  <div v-if="quantity >= 1">
    <p>valor total {{ (quantity * valor).toFixed(2) }}</p>
  </div>
</template>
