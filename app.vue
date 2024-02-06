<template>
  <div id="page" class="locked">
    <Loader />
    <PageTransitionCurtain />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { useDebounceFn } from "@vueuse/core";

export default {
  components: {},
  data() {
    const loaded = ref(false);
    return {
      loaded,
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, CustomEase, Flip);
    /**
     * Initial settings for scroll position.
     */
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    /**
     * Loader: Animation In.
     */
    gsap.delayedCall(0.5, function () {
      useDispatchEvent("triggerLoaderAnimationIn");
    });

    /**
     * Bowser setup.
     */
    useBowser();

    /**
     * Fonts to load.
     */

    /**
     * Font Loader. Promise Array.
     */
    useFontLoader([]);

    /**
     * Image Loader.
     */
    useImageLoader('img:not([loading="lazy"])');
    /**
     * Loader Minimum Delay
     */
    useMinDelay(4000);

    /**
     * Loading Event Listeners.
     */
    const fontsLoaded = new Promise(function (resolve) {
      window.addEventListener("fontsLoaded", resolve, false);
    });

    const imagesLoaded = new Promise(function (resolve) {
      window.addEventListener("imagesLoaded", resolve, false);
    });

    const minDelayCompleted = new Promise(function (resolve) {
      window.addEventListener("minDelayCompleted", resolve, false);
    });

    /**
     * Loader: Everything is ready.
     */
    Promise.all([fontsLoaded, imagesLoaded, minDelayCompleted]).then(
      function () {
        /**
         * Loader: Animation Out.
         */
        gsap.delayedCall(0.5, function () {
          useDispatchEvent("triggerLoaderAnimationOut");
        });

        /**
         * Start SmoothScroll
         */
        window.lenis = new Lenis();
        window.lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          window.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
        window.lenis.scrollTo("top", { immediate: true });
        window.lenis.stop();
        useDispatchEvent("lenisReady");
      }
    );

    window.addEventListener("resize", this.debounceResize);
  },
  methods: {
    onResize() {
      ScrollTrigger.update();
      ScrollTrigger.refresh();
    },
    debounceResize() {
      useDebounceFn(() => {
        this.onResize();
      }, 1000);
    },
  },
};
</script>

<style lang="scss"></style>
