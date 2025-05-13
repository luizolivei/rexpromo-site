<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// SEO otimizado
useHead({
  title: 'PromoRex - O melhor grupo de promoções para economizar',
  meta: [
    { name: 'description', content: 'Entre para o PromoRex, o melhor grupo de promoções no WhatsApp e Telegram. Ofertas em tecnologia, móveis, celulares, consoles e mais!' },
    { name: 'keywords', content: 'grupo de promoções, ofertas, descontos, whatsapp, telegram, tecnologia, móveis, celulares, consoles' },
    { property: 'og:title', content: 'PromoRex - Grupo de Promoções' },
    { property: 'og:description', content: 'Entre no melhor grupo de promoções e receba as melhores ofertas em primeira mão!' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://seusite.com' },
    { property: 'og:image', content: 'https://seusite.com/capa.jpg' },
  ]
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <Header />

    <main class="flex-grow container mx-auto px-4 py-16 pt-5">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-green-700 mb-4">
          Bem-vindo ao PromoRex
        </h1>
        <h2 class="text-xl font-medium mb-6">
          O <strong>melhor grupo de promoções</strong> para economizar de verdade 💸
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-5 max-w-lg mx-auto mb-5">
        <a
            href="https://chat.whatsapp.com/JQz4S0sCLguA1jFjgzKWoy"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Entrar no grupo do WhatsApp
        </a>
        <a
            href="https://t.me/rexpromocoes"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-blue-600 transition"
        >
          <Icon icon="logos:telegram" width="23" />
          Entrar no grupo do Telegram
        </a>
      </div>

      <section class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mb-10 text-left">
        <h3 class="text-2xl font-semibold mb-4">Categorias disponíveis:</h3>
        <ul class="space-y-2 text-gray-700 text-base leading-relaxed">
          <li>📦 <strong>Geral:</strong> Promoções variadas de todas as categorias.</li>
          <li>🖥️ <strong>Hardware:</strong> Peças, PCs, notebooks e periféricos.</li>
          <li>🔥 <strong>Promoções Épicas:</strong> Descontos absurdos que somem rápido!</li>
          <li>🪑 <strong>Móveis:</strong> Cadeiras gamers, escrivaninhas e afins.</li>
          <li>🎮 <strong>Consoles:</strong> PS5, Xbox, jogos e acessórios.</li>
          <li>📱 <strong>Celulares e Tablets:</strong> Smartphones, iPads e muito mais.</li>
        </ul>
      </section>
    </main>

    <Footer />
  </div>
</template>