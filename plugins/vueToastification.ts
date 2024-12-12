import { defineNuxtPlugin } from "nuxt/app";
import Toast, { POSITION, useToast } from "vue-toastification";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Toast, {
    shareAppContext: true,
    transition: "Vue-Toastification__bounce",
    position: POSITION.TOP_CENTER,
    maxToasts: 20,
    newestOnTop: true,
  });
  const toast = useToast();
  return {
    provide: {
      toast,
    },
  };
});
