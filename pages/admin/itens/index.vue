<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

import categorias from 'assets/dataCardapio.json'

// const { data: categorias } = await useFetch("api/getAllItensAndAgrupadores");
// console.log("dumped", categorias)
</script>

<template>
  <LayoutContainer class="mt-2">
    <span>Produtos:</span>
    <ClientOnly>
      <div class="mt-4" v-for="(categoria, i) in categorias" :key="i">
        <div class="bg-gray-100 rounded p-2">
          <span>
            {{ categoria.nome }}
          </span>
          <div class="grid grid-cols-10 gap-1">
            <div v-for="(item, key) in categoria.itens" :key="key" class="md:col-span-2 col-span-5">
              <div class="overflow-hidden cursor-pointer w-full max-w-[200px] h-[310px] border rounded-md bg-white relative">
                <img class="w-full h-[130px]" loading="lazy" :src="item.galeria[0].imagem" alt="thumbnail"/>
                <div class="p-2">
                  <div class="text-md line-clamp-2 font-semibold h-[50px]">
                    <h4>{{ item.nome }}</h4>
                  </div>
                  <div class="grid grid-cols-4 gap-4">
                    <div class="col-span-3 font-semibold text-md text-main-gray">
                      <span>{{ item.valor.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL"
                      }) }}</span>
                      <span v-if="item.preco_por_quilo">por quilo</span>
                    </div>
                  </div>
                  <div class="absolute bottom-3 w-full max-w-[90%] flex items-center justify-center">
                    <button class="text-white py-2 px-4 md:px-8 rounded bg-blue-700 hover:bg-blue-900 mx-1">
                      Escolher este
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </LayoutContainer>
</template>