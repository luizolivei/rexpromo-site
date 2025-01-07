<template>
  <div class="card-background p-3">
    <h2 class="fs-16">
      <b>Descrição</b>
    </h2>
    <p class="Description">
      <b v-if="descricao.length <= 200">{{ descricao }}</b>
      <b v-else>{{ descricao.slice(0, 200) + '...' }}</b>
    </p>
    <p class="hotsite-content   flex flex-row justify-center" v-if="linha">
      <span class="text-guia-default" v-html="linha"/>
    </p>
    <a v-if="descricao.length >= 200"
       href="#sobre"
       class="text-guia-default text-decoration-none">
      <b class="fs-16 text-underlined">Ler tudo</b> <i class="text-guia-default guia-icons guia-icon-chevron-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "DescricaoItem",
  props: {
    linha: String,
    descricao: String,
    nome: String | null,
    TitleClass: [],
  },
  data() {

    return {
      visible: false
    }
  },
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
            'style',
            'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrollY > 100
    }
  }

}
</script>

<style>
.modal-header {
  border-bottom: transparent;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
}
</style>

<style scoped>
.Description {
  font-weight: 200;
  font-size: 16px;
  line-height: 19px;
  color: #414042;
}
</style>
