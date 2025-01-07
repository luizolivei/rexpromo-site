<script setup>
import {ref, onMounted} from 'vue';

const loadImg = ref(true);
const timer = ref(0);
const imageSrc = ref('https://s3.amazonaws.com/images.guiafacil.com/qrs/assadao-sabores-da-carne/whats-login.png');

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

onMounted(() => {
  setInterval(() => {
    loadImg.value = true;
    timer.value++;
    if (timer.value === 60) {
      timer.value = 0;
      loadImg.value = false;
    }
  }, 1000);
});
</script>

<template>
  <LayoutContainer class="mt-2">
    <div class="p-2">
      <span class="text-2xl">Como escanear um código QR do WhatsApp</span>
      <ol>
        <li>Toque em Configurações.</li>
        <li>Dispositivos conectados.</li>
        <li>Conectar dispositivo.</li>
        <li>Leia o QR code e deixe o dispositivo salvo.</li>
      </ol>
    </div>

    <div class="flex justify-center lg:justify-normal">
      <div class="w-[340px] h-[360px] border p-2 mt-2">
        <img v-if="loadImg" :src="imageSrc" alt="QR Code">
        <span class="flex justify-center">Validade: <b>{{ 60 - timer }} segundos</b></span>
      </div>
    </div>
  </LayoutContainer>
</template>