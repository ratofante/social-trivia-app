import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  /**
   *  Event fired on page start loading.
   **/
  nuxtApp.hook("page:start", () => {
    //console.log("onPageStart");
    window.dispatchEvent(new CustomEvent("onPageStart"));
  });

  /**
   *  Event fired on page finish loading.
   **/
  nuxtApp.hook("page:finish", () => {
    //console.log("onPageFinish");
    window.dispatchEvent(new CustomEvent("onPageFinish"));
  });
});
