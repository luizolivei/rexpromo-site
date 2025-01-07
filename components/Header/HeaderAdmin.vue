<template>
  <div class="lg:h-[103px]">
    <div
        style="z-index: 999"
        class="w-full flex items-center justify-around bg-white border lg:h-[103px] text-main-gray min-h-[60px]"
    >
      <NuxtLink to="/">
        <img
            class="w-[100px] h-[36px] md:w-[151px] md:h-[56px]"
            src="https://images.guiafacil.com/gallery/logo-gf.webp"
            alt="Guia Fácil"
            sizes="sm:100vw"
        />
      </NuxtLink>
      <div class="flex space-x-2">
        <NuxtLink to="/admin" class="router-link">Pedidos</NuxtLink>
        <NuxtLink to="/admin/itens" class="router-link">Meus produtos</NuxtLink>
        <NuxtLink to="/admin/chatbot" class="router-link">Chatbot</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.router-link {
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px
}

@media (max-width: 375px) {
  .router-link {
    font-size: 11px;
  }
}

.router-link:hover {
  background-color: #d0d0d0;
}
</style>