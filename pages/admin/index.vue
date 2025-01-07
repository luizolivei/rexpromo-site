<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const openModal = ref(false)
const activeCart = ref([])
const valorTotal = ref(0)
const orders = ref([]);

import {io, type Socket} from 'socket.io-client'

const socket = ref<Socket>();
onMounted(() => {
  socket.value = io({
    path: '/api/socket.io'
  })

  socket.value.on('data-retriver', (response) => {
    orders.value = response
  })
});

onBeforeUnmount(() => {
  console.log('Disconnect Block');
  socket.value?.disconnect();
})

async function closeOrder(reqCode: string) {
  valorTotal.value = 0;
  await processOrder(reqCode)

  const order = await useFetch("api/getOrderByReq", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode,
    }),
    headers: {"Content-Type": "application/json"},
  });

  if (!order.data.value)
    return

  activeCart.value = order.data.value

  for (var item of activeCart.value.process) {
    valorTotal.value = valorTotal.value + item.valor
  }

  valorTotal.value = valorTotal.value ? valorTotal.value.toFixed(2) : "A combinar"
  openModal.value = true
  return true
}

async function deleteOrder(reqCode: string) {
  await useFetch("api/deleteOrder", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode,
    }),
    headers: {"Content-Type": "application/json"},
  });

  valorTotal.value = 0
  openModal.value = false
}

async function processOrder(reqCode: string) {
  const oldCart = await useFetch("api/getOrderByReq", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode,
    }),
    headers: {"Content-Type": "application/json"},
  });

  let cart = oldCart.data.value.cart;
  if (!!oldCart.data.value.process) {
    cart.push(...oldCart.data.value.process);
  }

  await useFetch("api/createOrder", {
    method: 'POST',
    body: JSON.stringify({
      reqCode: reqCode,
      cart: [],
      process: cart,
      processed: true,
      nomeCliente: oldCart.data.value.nomeCliente,
      whatsappCliente: oldCart.data.value.whatsappCliente,
      enderecoCliente: oldCart.data.value.enderecoCliente
    }),
    headers: {"Content-Type": "application/json"},
  });

  await useFetch("api/postMessaging", {
    method: 'POST',
    body: JSON.stringify({
      whatsapp: oldCart.data.value.whatsappCliente,
      message: "Seu pedido foi confirmado pelo restaurante! ;)",
    }),
    headers: {"Content-Type": "application/json"},
  });
}


</script>

<template>
  <LayoutCustomModal @update="openModal = false" :isOpen="openModal">
    <div class="max-h-[660px] p-5 border overflow-y-scroll">
      <div class="border p-2 my-5">
        <p>Pedido #{{ activeCart.reqCode }}</p>
        <p class="mb-2">O total do pedido ficou em: <b>R${{ valorTotal }}</b></p>
        <hr class="my-2">
        <div class="flex flex-col" v-if="!!activeCart.enderecoCliente">
          <small><strong>Nome:</strong> {{ activeCart.nomeCliente }}</small>
          <small><strong>Whatsapp:</strong> {{ activeCart.whatsappCliente }}</small>
          <small><strong>Bairro:</strong> {{ activeCart.enderecoCliente.bairro }}</small>
          <small><strong>Rua:</strong> {{ activeCart.enderecoCliente.rua }}</small>
          <small><strong>Número:</strong> {{ activeCart.enderecoCliente.numero }}</small>
        </div>
        <hr class="my-2">
        <button class="text-white py-2 px-4 rounded bg-green-700 hover:bg-green-900 w-full text-2xl"
                @click="deleteOrder(activeCart.reqCode)"> Arquivar pedido
        </button>
      </div>
      <ul v-for="item in activeCart.process">
        <li class="flex my-2">
          <img
              :src="item.galeria"
              class="w-[65x] h-[65px] me-2"
              alt="itemImage"
          />
          <div>
            <p class="text-lg">{{ item.nome }}</p>
            <p>Preço unitario: R${{ item.valor }}</p>
            <p>Quantidade: {{ item.quantity }}</p>
          </div>
        </li>
        <hr class="my-2">
      </ul>
    </div>
  </LayoutCustomModal>

  <LayoutContainer class="mt-2">
    <div class="p-2 border-2 min-h-[165px]">
      Alertas:
      <div class="flex flex-wrap">
        <div v-for="(order, i) in orders" :key="i">
          <a
              class="order-item border rounded h-[60px] lg:h-[100px] px-1 m-1 flex justify-center items-center alert"
              v-if="!order.processed"
              :href="`#location-${order.reqCode}`"
          >
            <span class="lg:text-5xl text-2xl">{{ order.reqCode }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="w-full border-b-2 py-3">
      <span class="text-3xl font-bold">Pedidos:</span>
    </div>

    <div class="mt-4" v-for="(order, i) in orders" :key="i">
      <span :id="`location-${order.reqCode}`" class="text-lg">Pedido <b>#{{ order.reqCode }}</b>:</span>
      <div class="bg-gray-100 rounded p-2">
        <span>Dados do cliente:</span>
        <div class="flex flex-col" v-if="!!order.enderecoCliente">
          <small><strong>Nome:</strong> {{ order.nomeCliente }}</small>
          <small><strong>Whatsapp:</strong> {{ order.whatsappCliente }}</small>
          <small><strong>Bairro:</strong> {{ order.enderecoCliente.bairro }}</small>
          <small><strong>Rua:</strong> {{ order.enderecoCliente.rua }}</small>
          <small><strong>Número:</strong> {{ order.enderecoCliente.numero }}</small>
        </div>
        <hr class="my-2">
        <div class="grid grid-cols-2">
          <div class="col-span-2 md:col-span-1 min-h-[150px]" v-if="order.cart && order.cart.length > 0">
            <span>Aguardando aceite</span>
            <admin-item-list :itens="order.cart">
              <template v-slot:button>
                <button class="text-white py-2 px-4 rounded bg-green-700 hover:bg-green-900 mx-1"
                        @click="processOrder(order.reqCode)"> Aprovar pedido
                </button>
              </template>
            </admin-item-list>
          </div>

          <div class="col-span-2 md:col-span-1 min-h-[150px]" v-if="order.process && order.process.length > 0">
            <span>Pedido confirmado</span>
            <admin-item-list :itens="order.process">
              <template v-slot:button>
                <button class="text-white py-2 px-4 rounded bg-red-700 hover:bg-red-900 mx-1"
                        @click="closeOrder(order.reqCode)">
                  Finalizar atendimento
                </button>
              </template>
            </admin-item-list>
          </div>
        </div>
      </div>
      <hr>
    </div>
  </LayoutContainer>
</template>

<style lang="scss">
.swiper-wrapper {
  padding: 3px 0;
}

.swiper-slide {
  max-width: 200px;
}

.swiper-button-next,
.swiper-button-prev {
  z-index: 999;
  transition: all 0.3s;
  background: #ffffff;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-button-next::after {
  content: "";
  width: 100%;
  height: 100%;
  background: url("~/assets/img/Vector.png");
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-button-prev::after {
  content: "";
  width: 100%;
  height: 100%;
  background: url("~/assets/img/Vector.png");
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(-180deg);
}

@media (max-width: 991px) {
  .bg-mobile {
    background-color: white;
  }

  .name-filter {
    border-radius: 30px;
    height: 34px;
    width: 245px;
    text-align: center;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }

  .bt-filter {
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    color: black;
    width: 88px;
    height: 34px;
    text-decoration: none;
    line-height: normal;
  }
}

.brating {
  max-width: 75px !important;
}

.content-card-item .b-rating .b-rating-star,
.b-rating .b-rating-value {
  padding: 0 0em;
}

.rating-card-view > span > span > svg {
  width: 11px !important;
  height: 11px !important;
}

.head {
  left: 0px;
  top: 0;
  height: 41px;
  position: absolute;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #414042;
}

.catalogos {
  margin-left: 24px;
  width: 926px;
  max-width: 926px;
}

.card-title {
  font-weight: 400;
  padding-left: 6px;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  width: 100%;
}

@media (max-width: 926px) {
  .catalogos {
    width: 100%;
    max-width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }

  .main-block {
    width: 100%;
    justify-content: center !important;
  }
}

.catalogo-titulo {
  background: #f7f7f7;
  border-radius: 3px;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #414042;
}

.order-item.new {
  animation: slide-in 0.5s ease-in-out forwards;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert {
  background: red;
}
</style>