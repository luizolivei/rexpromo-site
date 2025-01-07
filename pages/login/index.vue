<template>
  <div class="flex justify-center">
    <div class="lg:w-[420px] lg:h-[64vh] lg:mt-[5%] my-[20%] lg:my-[5%] mx-3">
      <div class="flex justify-center mb-4">
                <span class="text-2xl">
          Faça login para <b>continuar!</b>
        </span>
      </div>

      <form>
        <span>E-mail</span>
        <input
            v-model="user.username"
            type="text"
            id="email"
            class="h-[44px] appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-2 w-full"
            required
        >

        <span>Senha</span>
        <input
            v-model="user.password"
            type="password"
            id="password"
            class="h-[44px] appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-2 w-full"
            required
        >

        <div class="flex flex-wrap justify-center mt-3">
          <button
              :disabled="loading"
              type="submit"
              class="bg-buttons-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full h-[45px] mb-1"
              @click="login()"
          >
            <span class="text-white" v-if="loading">Carregando...</span>
            <span class="text-white" v-else>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts" setup>
import Swall from "sweetalert2";

const loading = ref(false)

const user = reactive({
  username: '',
  password: '',
});

const login = async () => {
  loading.value = true

  let adminAuth = useCookie("adminAuth");
  const loginReturn = await useFetch("api/login", {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {"Content-Type": "application/json"},
  });

  if (loginReturn.data.value) {
    adminAuth.value = loginReturn.data.value
    const auth = await useAuthenticated()
    await auth.verifyLogin()
    navigateTo("/admin")
    return
  }

  loading.value = false

  await Swall.fire("Tente realizar o login novamente", "Usuario e senha invalido", "error");
};
</script>