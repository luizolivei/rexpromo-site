<template>
  <div class="overflow-hidden cursor-pointer w-full max-w-[200px] h-[310px] border rounded-md bg-white relative">
    <img class="w-full h-[130px]" loading="lazy" :src="thumbnail" alt="thumbnail"/>
    <div class="p-2">
      <div class="text-md line-clamp-2 font-semibold h-[50px]">
        <h4>{{ data.nome }}</h4>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 font-semibold text-md text-main-gray">
          <span>{{ price }}</span> <span v-if="data.preco_por_quilo">por quilo</span>
        </div>
      </div>
      <div class="absolute bottom-3 w-full max-w-[90%] flex items-center justify-center">
        <!--                <LazyItemShoppingCartManager :data="data" @click.prevent/>-->
        <button class="text-white py-2 px-4 md:px-8 rounded bg-blue-700 hover:bg-blue-900 mx-1">
          Escolher este
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const openModal = ref(false)

const props = defineProps({
  data: {
    type: Object
  },
  logo: {
    type: String
  },
  admin: {
    type: Boolean
  }
});

const thumbnail = computed(() => {
  if (props.data.galeria[0].imagem.search(/amazonaws/)) {
    return props.data.galeria[0].imagem.replace("https://s3.amazonaws.com/", "https://");
  }
  return props.data.galeria[0].imagem;
})
const price = computed(() => {
  return props.data.valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  })
})
</script>
