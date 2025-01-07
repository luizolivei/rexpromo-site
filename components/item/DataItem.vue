<template>
  <div class="card-background p-3">
    <div v-bind:class="{ opacidade: item?.ativo != true }">
      <p class="offer-text">
        Oferecido por
        <a :href="'/site/' + item?.anuncio?.URL + '/'" target="_blank">
            <span class="underline font-bold">
            {{ item?.anuncio?.NomeFantasia }}
          </span>
        </a>
      </p>
      <h1 class="titulo">{{ item?.nome }}</h1>
      <HotsiteAvaliacoes :notas="item?.Rating" :preco="item?.Price"/>
    </div>
    <div class="flex justify-between">
      <h2 v-if="item?.ativo != true" class="warning">
        Item indisponível no momento
      </h2>
      <h2 v-else-if="item?.valor_combinar" class="price">
        A combinar
      </h2>
      <h2 v-else-if="item?.valor_a_partir" class="price">
        A partir de R${{ item?.valor.toFixed(2) }}
      </h2>
      <h2 v-else class="price">R${{ item?.valor.toFixed(2) }}</h2>
      <span v-if="item?.ativo == true" class="mt-2 me-1 fs-14">
          * Consulte preços e disponibilidade
        </span>
    </div>
    <div class="flex pe-3 pe-md-0 pe-lg-0">
      <button
          v-if="!item?.ativo"
          class="itens-disponiveis"
          :href="'/loja/' + item?.anuncio?._idHotSite"
          pill
          rel="nofollow"
      >
        Ver itens disponíveis
      </button>

      <ItemShoppingCartManager
          v-else
          :data="item"
          @click.prevent
      />
    </div>

<!--    Modal de telefone-->
<!--    <ItemTelefone-->
<!--        v-model="modalWhats"-->
<!--        :enderecos="item.Endereco"-->
<!--        :idCliente="idCliente"-->
<!--        :Nome="Nome"-->
<!--    />-->
  </div>
</template>

<script setup>
const modalWhats = ref(false)


const props = defineProps({
  item: {
    type: Object,
  },
  Nome: {
    type: String,
  },
  idCliente: {
    type: String,
  },
});
</script>

<style scoped>
h2.price {
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.offer-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #414042;
}

.text-underlined {
  font-weight: 600;
}

h1.titulo {
  font-size: 22px;
  font-weight: 400;
}

.whatsapp-desktop a,
.whatsapp-desktop i {
  color: #fff !important;
  font-size: 16px !important;
}

.whatsapp-desktop {
  width: 100%;
  background: #11af00;
  border-radius: 5px !important;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.itens-disponiveis {
  width: 100%;
  background: #414042;
  border-radius: 5px !important;
  height: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.warning {
  background-color: #fff1f2;
  color: #892427;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  padding: 20px 0px 20px 15px;
}
</style>
