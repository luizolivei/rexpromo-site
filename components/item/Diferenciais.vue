<template>
  <div class="card-background p-3">
    <h4><b class="fs-16">Diferencaiais</b></h4>
    <BRow>
      <BCol sm="auto" lg="auto" v-for="(diferencial, index) in diferenciais" :key="index">
        <div v-if="index <= 5">
          <i class="guia-icons guia-icon-check-bold"/>
          <span class="text-muted cor-diferencial"> {{ diferencial }}</span>
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  name: "Diferenciais",
  props: {
    diferenciais: Array,
    nome: String | null,
  },
};
</script>

<style scoped>
.card {
  border-color: transparent !important;
}
</style>
