<template>
  <div class="max-w-4xl mx-auto p-6 font-sans">
    <header class="text-center mb-10">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Bem-vindo ao <span class="text-blue-600">PromoRex</span></h1>
      <p class="text-lg text-gray-600">Sua comunidade de promoções imperdíveis!</p>
    </header>
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Sobre o PromoRex</h2>
      <p class="text-gray-600 mb-4">
        O <span class="font-semibold text-blue-600">PromoRex</span> é uma comunidade dedicada a compartilhar as melhores promoções disponíveis no mercado. Nosso objetivo é mantê-lo informado sobre ofertas incríveis em diversas categorias de produtos, garantindo que você nunca perca uma oportunidade de economizar.
      </p>
      <p class="text-gray-600 mb-4">
        Em breve, lançaremos novas funcionalidades para aprimorar sua experiência:
      </p>
      <ul class="list-disc list-inside text-gray-600 space-y-2">
        <li><strong>Comparador de Preços</strong>: Compare preços de diferentes lojas e encontre a melhor oferta disponível.</li>
        <li><strong>Agendador de Promoções</strong>: Receba alertas via WhatsApp quando o produto desejado atingir o preço ideal.</li>
      </ul>
    </section>
    <section>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Nossos Grupos no WhatsApp</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div v-for="group in groups" :key="group.name" class="border border-gray-200 rounded-lg p-6 text-center shadow-lg transform transition duration-300 hover:scale-105">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ group.name }}</h3>
          <p class="text-gray-600 mb-4">{{ group.description }}</p>
          <a :href="group.link" target="_blank" class="inline-block">
            <button class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Entrar no Grupo</button>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const groups = [
  {
    name: 'Promoções Completas - PromoRex',
    description: 'Todas as promoções, incluindo hardware.',
    link: 'https://chat.whatsapp.com/link-do-grupo-completo'
  },
  {
    name: 'Promoções Diversas - PromoRex',
    description: 'Promoções variadas, exceto hardware.',
    link: 'https://chat.whatsapp.com/link-do-grupo-diversas'
  }
];
</script>
