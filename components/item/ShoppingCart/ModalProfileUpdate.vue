<script setup>
import {vMaska} from "maska";

const props = defineProps({
  modalCadastro: Boolean,
  finalizarCompra: Function,
  form: {
    name: String,
    whats: String,
    endereco: {
      rua: String,
      numero: String,
      bairro: String
    },
  }
});

async function searchProfile() {
  const regex = /\D+/;
  let digits = props.form.whats.split(regex).join("");
  if (digits.length === 11) {
    digits = digits.slice(0, 2) + digits.slice(3);
  }

  const oldProfile = await useFetch("api/getProfile", {
    method: 'POST', //TODO isso pode ser um get
    body: JSON.stringify({
      whats: digits,
    }),
    headers: {"Content-Type": "application/json"},
  });

  if (!!oldProfile.data.value) {
    props.form.name = oldProfile.data.value.name
    props.form.endereco = oldProfile.data.value.endereco
  }
}
</script>

<template>
  <LayoutCustomModal @update="modalCadastro = false" :isOpen="modalCadastro">
    <div class="max-h-[700px] w-[422px] p-5 border">
      <form @submit.prevent="finalizarCompra">
        <b>Antes de finalizar o pedidos iremos precisar de alguns dados:</b>
        <hr class="my-2">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            WhatsApp
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.whats" id="whatsapp" placeholder="(##) #####-####"
              v-maska data-maska="(##)#####-####" type="tel" required @focusout="searchProfile()">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Seu nome
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.name" id="nome" type="text" placeholder="####" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Endereço
          </label>
          <div class="border p-3">
            <small class="block text-gray-700 text-sm font-bold mb-2">
              Bairro
            </small>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.endereco.bairro" id="endereco" type="text" placeholder="####" required>
            <small class="block text-gray-700 text-sm font-bold mb-2">
              Rua
            </small>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.endereco.rua" id="endereco" type="text" placeholder="####" required>
            <small class="block text-gray-700 text-sm font-bold mb-2">
              Numero
            </small>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.endereco.numero" id="endereco" type="text" placeholder="####" required>
          </div>

        </div>

        <button class="text-white py-2 px-4 rounded bg-green-700 hover:bg-green-900 mt-2" type="submit">
          Confirmar dados
        </button>
      </form>
    </div>
  </LayoutCustomModal>
</template>