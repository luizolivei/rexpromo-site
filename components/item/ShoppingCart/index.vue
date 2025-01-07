<script setup>
import useCart from "~/composables/useCart";
import Swall from "sweetalert2";

const route = useRoute();

let {
  getCart,
  getReqCode,
  setReqCode,
  limparCarrinho,
  toggleCart,
  setCart,
  cart,
  totalPrice,
  isCartOpen
} = useCart();

onMounted(() => {
  if (route.query && route.query.reqCode) {
    setReqCode(route.query.reqCode)
  }
});

let loading = ref(false)
let modalCadastro = ref(false)
const form = reactive({
  name: "",
  whats: "",
  endereco: {
    rua: "",
    numero: "",
    bairro: ""
  },
});

async function finalizarCompra() {
  modalCadastro.value = false;
  loading.value = true;
  const reqCode = getReqCode()

  const regex = /\D+/;
  let digits = form.whats.split(regex).join("");
  if (digits.length === 11) {
    digits = digits.slice(0, 2) + digits.slice(3);
  }

  await useFetch("api/createProfile", {
    method: 'POST',
    body: JSON.stringify({
      name: form.name,
      whats: digits,
      endereco: form.endereco
    }),
    headers: {"Content-Type": "application/json"},
  });

  const oldCart = await useFetch("api/getOrderByReq", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode,
    }),
    headers: {"Content-Type": "application/json"},
  });

  let cart = getCart();
  let process = [];
  if (!!oldCart.data.value) {
    if (!!oldCart.data.value.cart) {
      cart.push(...oldCart.data.value.cart);
    }
    if (!!oldCart.data.value.process) {
      process = oldCart.data.value.process
    }
  }

  await useFetch("api/createOrder", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode.toString(),
      cart: cart,
      process: process,
      nomeCliente: form.name,
      whatsappCliente: digits,
      enderecoCliente: form.endereco,
      processed: false
    }),
    headers: {"Content-Type": "application/json"},
  });

  await useFetch("api/postMessaging", {
    method: 'POST',
    body: JSON.stringify({
      whatsapp: digits,
      message: "Seu pedido foi realizado! Agora é só aguardar novidades aqui no seu WhatsApp",
    }),
    headers: {"Content-Type": "application/json"},
  });

  limparCarrinho()

  loading.value = false;
  toggleCart()

  await Swall.fire("Pedido realizado com sucesso!", "Agora é só aguardar", "success");
}

const removeItem = (itemId) => {
  if (cart.value.length > 0) {
    const index = cart.value.findIndex(item => item._id === itemId);

    cart.value.splice(index, 1);
    setCart(cart.value);
  }
};
</script>

<template>
  <ItemShoppingCartModalProfileUpdate
      :form="form"
      :modalCadastro="modalCadastro"
      :finalizarCompra="finalizarCompra"
  />

  <div v-if="isCartOpen"
       style="z-index: 999"
       class="fixed right-0 bottom-0 lg:bottom-0 h-[100%] lg:h-screen w-full md:w-1/4 bg-white shadow-xl flex flex-col border-4"
       :class="[{ visible: isCartOpen }]" id="cart-open">
    <button
        @click="toggleCart()"
        class="rounded-full border border-main-light-gray text-main-gray h-6 w-6 absolute top-2 right-2 z-30"
    >
      <i class="guia-icons guia-icon-close s-22px"/>
    </button>

    <div class="h-screen text-sm">
      <div v-if="!cart.length" class="w-full h-full flex justify-center items-center">
        <div class="grid grid-cols-1 gap-1 text-center">
          <b>
            Escolha itens do cardápio
          </b>
        </div>
      </div>

      <div v-else class="h-full p-2 md:p-4">
        <span class="font-bold text-2xl">Pedido #{{ getReqCode() }}</span>
        <br/>
        <ul class="h-[75%] 2xl:h-[80%] overflow-y-scroll mt-2" v-if="!loading">
          <li v-for="item in cart" :key="item._id" class="flex justify-between">
            <ItemShoppingCartItem :item="item"/>
            <button type="button" @click="removeItem(item._id)">
              <i class="guia-icons guia-icon-bin s-16px mx-2"/>
            </button>
          </li>
        </ul>
        <hr class="text-black mb-2"/>
        <div class="flex justify-between my-2">
          <span class="fs-18 ">Total: <b>R$ {{ totalPrice.toFixed(2) }}</b></span>
        </div>
        <div class="w-full flex justify-center mt-1">
          <button
              @click="limparCarrinho()"
              type="button"
              class="mx-1 checkout-button border border-main-light-gray rounded-md 2xl:px-8 2xl:py-3 px-6 py-2 font-semibold text-sm text-main-gray"
          >
            <i class="guia-icons guia-icon-close-circle"/>
            Esvaziar pedido
          </button>
          <button
              type="button"
              @click="modalCadastro = true"
              class="mx-1 border border-main-light-gray rounded-md 2xl:px-8 2xl:py-3 px-6 py-2  font-semibold text-white text-sm bg-green-700"
          >
            <i class="guia-icons guia-icon-cart-arrow-right text-white"/>
            Realizar pedido
          </button>
        </div>
      </div>
    </div>
  </div>

  <button @click="toggleCart()">
    <i class="guia-icons guia-icon-cart text-4xl text-black"/>
    <span v-if="cart.length">{{ cart.length }}</span>
  </button>
</template>