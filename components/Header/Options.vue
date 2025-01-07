<template>
  <div v-if="signed">
    <div class="toggle-action mx-4">
      <i @click="handleClose" class="guia-icons guia-icon-account-circle"/>
    </div>
    <div class="styled-dropdown" v-if="show">
      <li class="sub-nv-2" v-for="({ title, path, icon }, i) in options" :key="i">
        <NuxtLink :href="path">
          <i :class="'guia-icons guia-icon-' + icon"/>
          {{ title }}
        </NuxtLink>
      </li>
      <li @click="logout()" class="border-bottom-none">
        <i class="guia-icons guia-icon-logout"/>
        Sair
      </li>
    </div>
  </div>
  <div v-else class="flex justify-center align-items-center mx-4">
    <NuxtLink href="/auth/conta/login" class="btn-conta">
      <i class="guia-icons guia-icon-account"/>
      Entrar
    </NuxtLink>
  </div>
</template>
<script setup>
import Swall from "sweetalert2";

const { logoutUser } = useLogin();

const show = useState(() => false);

const handleClose = () => {
  show.value = !show.value;
};

const { signed } = useAuthenticated();

const options = useState(() => [
  { title: "Meus dados", icon: "account-cog", path: "/conta/dados" },
  { title: "Editar anúncios", icon: "store-edit", path: "/conta/anuncios" },
  { title: "Meus Comentários", icon: "comment-multiple", path: "/conta/comentarios" }
]);

const logout = () => {
  Swall.fire({
    title: "Gostaria de desconectar a sua conta?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#1ba10a",
    confirmButtonText: "Sair",
    denyButtonText: `Cancelar`
  }).then(async (result) => {
    if ( result.isConfirmed ) {
      logoutUser();
    }
  });
};
</script>
<style lang="scss" scoped>
.styled-dropdown {
  z-index: 999;
  position: fixed;
  background-color: white;
  padding: 15px 20px 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  color: black;
  font-size: 17px;

  li {
    border-bottom: 1px solid #d2cbcb;
    padding-top: 8px;
    padding-bottom: 8px;
    list-style: none;
  }
}

.border-bottom-none {
  border-bottom: transparent !important;
}

.btn-conta {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #414042;
}

.toggle-action {
  height: 100%;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;

  i {
    font-size: 35px;
    color: #17a2b8;
  }

  &::after {
    display: none;
  }
}
</style>
