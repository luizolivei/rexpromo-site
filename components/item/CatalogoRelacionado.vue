<template>
  <div class="card-background lg:p-2 mt-5 order-5">
    <p class="title">{{ titulo }}</p>
    <swiper
      :modules="modules"
      :slides-per-view="1.8"
      :space-between="0"
      navigation
      :breakpoints="{
        1025: {
          slidesPerView: 6.5,
          spaceBetween: 1,
        },
        860: {
          slidesPerView: 4.8,
          spaceBetween: 1,
        },
      }"
    >
      <swiper-slide v-for="(item, index) in catalogo" :key="index">
        <a :href="`/item/${item.nome_url}/${item.cliente_id}/${item._id}/`" target="_blank" class="cardLink">
          <ItemCard
            :logo="item?.anuncio_referencias?.logo"
            :company="item?.anuncio_referencias?.nome_fantasia"
            :data="item"
          />
        </a>
      </swiper-slide>
    </swiper>

    <slot name="bottom-button" />
  </div>
</template>

<script setup>
import { Navigation, Pagination } from "swiper";

const modules = [Navigation, Pagination];

const props = defineProps({
  catalogo: Array,
  idhotsite: String,
  titulo: String,
});
</script>
