<template>
<!--  <BModal ref="my-modal-telefone-item" id="my-modal-telefone-item" centered hide-footer-->
<!--          :title="'Entre em contato com ' + Nome"-->
<!--          header-class="text-left" class="text-center">-->
<!--    <div class="subtitle">-->
<!--      <small class="ms-lg-0 ms-md-0 ms-3">Lembre de falar que encontrou no guiafacil.com</small>-->
<!--    </div>-->
<!--    <Container>-->
<!--      <div v-for="(dados, index) in enderecos" :key="index">-->
<!--        <div class="col-12 mt-4">-->
<!--          <b>{{ dados.Bairro }}, {{ dados.Cidade }}, {{ dados.Estado }}</b>-->
<!--        </div>-->
<!--        <div class="col-lg-12">-->
<!--          <small v-if="dados.Telefones[0].Responsavel != null">-->
<!--            Fale com {{ dados.Telefones[0].Responsavel }}:-->
<!--          </small>-->
<!--        </div>-->
<!--        <BCol class="mt-lg-2 mt-md-2 mt-sm-1" v-if="dados.Telefones[0].Whatsapp">-->
<!--          <button-->
<!--              class="button-whats-default mt-2"-->
<!--              variant="success"-->
<!--              @click.once="eventReportCall(dados.Telefones[0].TelefoneNumerico, true)"-->
<!--              :href="webWhats+dados.Telefones[0].TelefoneNumerico+getTextoWhatsApp(dados.Telefones[0].Responsavel)"-->
<!--              :key="index"-->
<!--              v-if="dados.Telefones[0].Whatsapp"-->
<!--              target="_blank"-->
<!--              block-->
<!--              rel="nofollow">-->
<!--              <span :data-phone="dados.Telefones[0].TelefoneNumerico"-->
<!--                    class="call-whats"-->
<!--                    data-label="1711918"><i class="guia-icons guia-icon-whatsapp"></i> WhatsApp-->
<!--              </span>-->
<!--          </button>-->
<!--        </BCol>-->
<!--      </div>-->
<!--    </Container>-->
<!--  </BModal>-->
</template>

<script setup>
const props = defineProps({
  enderecos: {
    type: Array,
  },
  Nome: {
    type: String,
  },
  idCliente: {
    type: String | Number,
  },
});

let textwhats = ref("&text=Ol%C3%A1!%0AEncontrei%20sua%20empresa%20no%20Guia%20Fácil%20e%20gostaria%20de%20um%20orçamento.")
let textCustom = ref("&text=Ol%C3%A1!%0AGostaria%20de%20falar%20com%20{nome}.%20Encontrei%20sua%20empresa%20no%20Guia%20Fácil%20e%20gostaria%20de%20um%20orçamento.")
let webWhats = "https://api.whatsapp.com/send?phone=55"

function getTextoWhatsApp(responsavel) {
  if (!!responsavel) {
    return textCustom.value.replace('{nome}', responsavel)
  }
  return textwhats
}

async function eventReportCall(tel, whats = false) {
  const data = {
    phone: tel,
    whats: whats
  };
  this.$emit('openReport', data);
}
</script>

<style scoped>
.guia-icon-whatsapp {
  color: white;
}

.call-whats {
  color: white;
}

.subtitle {
  position: absolute;
  top: -18px;
}
</style>
