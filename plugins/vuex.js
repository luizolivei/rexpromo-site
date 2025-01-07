import store from '~/store'
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
});
