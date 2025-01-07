<script setup>
import {useRoute} from "nuxt/app";
import {computed} from "vue";

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
  valor,
  galeria,
  preco_por_quilo,
  endereco,
  telefone
} = props.data;

let quantity = ref(0);
const quantityValueG = ref(0)
// const quantityValueKg = ref(0)

const {$mobile} = useNuxtApp()
const isMobile = useState(() => $mobile)

const managementCartQuantity = () => {
  let whats = "";
  if (endereco) {
    whats = endereco[telefone[0]['endereco']]['Telefones'][telefone[0]['telefone']]['TelefoneNumerico']
  }

  // let totalValue = quantityValueKg.value >= 1 ? (quantityValueKg.value * 1000) : 0
  // totalValue = totalValue + quantityValueG.value
  //
  // quantity.value = totalValue >= 0 ? totalValue : 0;

  quantity.value = quantityValueG.value >= 0 ? quantityValueG.value : 0;

  const newItem = {
    _id: _id,
    quantity: quantity.value,
    preco_por_quilo: preco_por_quilo,
    nome: nome,
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

      if (!quantity.value || quantity.value == 0) {
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

watchEffect(() => {
  let currentCart = cart.value;

  if (!currentCart.length)
    return quantity.value = 0;

  let itemExistente = currentCart.find(item => item._id === _id);

  if (itemExistente) {
    quantityValueG.value = itemExistente.quantity
    quantity.value = itemExistente.quantity
    // const thousands = Math.floor(quantity.value / 1000);
    // const belowThousands = quantity.value % 1000;
    // quantityValueKg.value = thousands ?? 0
    // quantityValueG.value = belowThousands ?? 0
  } else {
    quantity.value = 0
  }
});

const quantityMask = computed(() => {
  if (!quantity.value)
    return "0g"

  if (quantity.value < 1000)
    return `${quantity.value}g`

  let thousands = Math.floor(quantity.value / 1000);
  let belowThousands = quantity.value % 1000;

  if (belowThousands) {
    return `${thousands}kg e ${belowThousands}g`
  }

  return `${thousands}kg`;
});
</script>

<template>
  <div class="flex">
    <input
        class="border border-gray-500 mx-1 p-0.5"
        type="number"
        step="100"
        id="grama"
        min="100"
        max="50000"
        v-model="quantityValueG"
        @input="managementCartQuantity()">
    <span class="text-sm mt-1">
      Gramas
    </span>
  </div>

  <div v-if="quantity >= 1">
    <p>quantidade {{ quantityMask }}</p>
    <p>valor total {{ (quantity / 1000 * valor).toFixed(2) }}</p>
  </div>
</template>
