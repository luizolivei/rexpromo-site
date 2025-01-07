<template>
  <div v-if="gallery" class="grid grid-cols-12 gap-1">
    <div class="col-span-2 hidden md:block">
      <swiper
          class="w-full h-[420px]"
          :dynamicBullets="false"
          :navigation="false"
          :direction="'vertical'"
          :pagination="{
          type: 'none',
          clickable: true,
        }"
          :slidesPerView="3.8"
      >
        <swiper-slide v-for="(image, index) in gallery" :key="index">
          <button @click="imageMove(index)">
            <img
                :index="index"
                :src="image?.imagem"
                :alt="'Comprar ' + itemNome + ' em ' + itemLocalizacao"
            />
          </button>
        </swiper-slide>
      </swiper>
    </div>

    <div class="col-span-12 md:col-span-10">
      <swiper
          ref="items"
          :dynamicBullets="false"
          :navigation="false"
          :pagination="{
          type: 'none',
          clickable: true,
        }"
          :slidesPerView="1"
      >
        <swiper-slide v-for="(image, index) in gallery" :key="index" class="max-w-fit">
          <div class="flex justify-center">
            <img
                class=""
                :src="image?.imagem"
                :alt="'Comprar ' + itemNome + ' em ' + itemLocalizacao"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";

const modules = [Navigation, Pagination];

const props = defineProps({
  gallery: {type: Array},
  itemNome: {type: String},
  itemLocalizacao: {type: String},
});

function imageMove(index) {
  const swiper = new Swiper(".swiper");
  swiper[1].slideTo(index);
}
</script>