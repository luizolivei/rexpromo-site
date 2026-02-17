<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// SEO otimizado
useHead({
  title: 'RexPromo - O melhor grupo de promoções para economizar',
  meta: [
    { name: 'description', content: 'Entre para o RexPromo, o melhor grupo de promoções no WhatsApp. Ofertas em tecnologia, hardware, celulares, consoles e mais!' },
    { name: 'keywords', content: 'grupo de promoções, ofertas, descontos, whatsapp, tecnologia, hardware, celulares, consoles' },
    { property: 'og:title', content: 'RexPromo - Grupo de Promoções' },
    { property: 'og:description', content: 'Entre no melhor grupo de promoções e receba as melhores ofertas em primeira mão!' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://rexpromo.com' },
    { property: 'og:image', content: 'https://rexpromo.com/rexpromo.png' },
  ]
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <Header />

    <main class="flex-grow container mx-auto px-4 py-16 pt-5">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-green-700 mb-4">
          Bem-vindo ao RexPromo
        </h1>
        <h2 class="text-xl font-medium mb-6">
          O <strong>melhor grupo de promoções</strong> para economizar de verdade 💸
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-5 max-w-lg mx-auto mb-5">
        <a
            href="https://chat.whatsapp.com/BCgevzsOhG3CIssEY4ghMi?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Promoções diversas
        </a>
        <a
            href="https://chat.whatsapp.com/KEPtbdrG7Ju9rsCq8clCHL?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Hardware, Gamer
        </a>
        <a
            href="https://chat.whatsapp.com/G1yCSVkkXKK9v0oPZAa0Eq?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Eletrodomésticos
        </a>
        <a
            href="https://chat.whatsapp.com/HeiK8zzPxKNBy7plmREm9K?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Celulares, Tablets, Relógios
        </a>
        <a
            href="https://chat.whatsapp.com/Kc009AGCqj73jG2dRG1AWT?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Video games, consoles
        </a>
        <a
            href="https://chat.whatsapp.com/BruGdLcui2z6YeBhki6og9?mode=ems_copy_t"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-green-700 transition"
        >
          <Icon icon="logos:whatsapp-icon" width="23" />
          Promoções Épicas (bugs e promoções especiais)
        </a>
        <a
            href="https://t.me/rexpromocoes"
            target="_blank"
            class="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-3 rounded-lg lg:text-lg sm:text-sm font-semibold hover:bg-blue-700 transition"
        >
          <Icon icon="logos:telegram" width="23" />
          Telegram
        </a>
      </div>

      <section class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mb-10 text-left">
        <h3 class="text-2xl font-semibold mb-4">Categorias disponíveis:</h3>
        <ul class="space-y-2 text-gray-700 text-base leading-relaxed">
          <li>📦 <strong>Variados:</strong> Promoções variadas de diversas categorias (menos hardware).</li>
          <li>🖥️ <strong>Hardware:</strong> Peças, PCs, notebooks e periféricos.</li>
          <li>🖥️ <strong>Eletrodomésticos:</strong> Televisões, geladeiras, fornos, fogões, ar condicionados..</li>
          <li>🎮 <strong>Consoles:</strong> PS5, Xbox, jogos e acessórios.</li>
          <li>📱 <strong>Celulares e Tablets:</strong> Smartphones, iPads e muito mais.</li>
          <li>🔥 <strong>Promoções Épicas:</strong> Descontos absurdos que somem rápido!</li>
        </ul>
      </section>
    </main>

    <Footer />
  </div>
</template>
