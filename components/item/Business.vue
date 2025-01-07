<template>
  <div class="grid grid-cols-12 gap-1 p-3 card-background">
    <div class="lg:col-span-2 col-span-4 flex justify-center">
      <img class="logo" :src="defineUrlImage(item.anuncio.SelecaoLogo)">
    </div>
    <div class="lg:col-span-10 col-span-8 flex justify-center flex-col">
      <p>
        Oferecido por
        <a :href="'/site/' + item.anuncio?.URL + '/'">
          <span class="text-underlined">{{ item.anuncio?.NomeFantasia }}</span>
        </a>
      </p>
      <div v-if="item.anuncio?.Rating" class="flex content-center">
        <small class="mt-1">{{ item.anuncio?.Rating?.soma }}</small>
        <StarRating
            disableClick
            :rating="item.anuncio?.Rating?.soma"
            :size="20"
        />
        <small class="mt-1">
          {{ item.anuncio?.Rating?.votos > 1 ? '(' + item.anuncio?.Rating?.votos + ')' : '' }}
        </small>
      </div>
<!--      <div v-else>-->
<!--        <p class="first-avaliation my-1">Seja o primeiro a avaliar.</p>-->
<!--      </div>-->
      <div>
        <a class="go-to-offers" :href="'/site/' + item.anuncio?.URL + '/'" target="_blank">
          Ir para {{ item.anuncio?.NomeFantasia }}
          <i class="guia-icons guia-icon-chevron-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
});

function defineUrlImage(url) {
  if (!!url)
    return url

  return "https://images.guiafacil.com/gallery/logo-padrao.webp"
}
</script>

<style scoped>
#rating-inline {
  background: none !important;
  border: none !important;
  width: 105px;
  height: 19px;
  padding: 0 !important;
}

.rating-text {
  font-size: 14px
}

.first-avaliation {
  line-height: 18px;
  color: black;
}

.logo {
  border-radius: 10px;
  width: 90px;
  height: 90px;
}

.offer-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #414042;
}

.brating {
  max-width: 125px !important;
}

.text-underlined {
  font-weight: 600 !important;
}

.go-to-offers {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
  color: #414042;
}
</style>
