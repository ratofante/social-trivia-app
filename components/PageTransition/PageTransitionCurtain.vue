<template>
  <div class="transition__container">
    <div ref="transition" class="transition__wrapper">
      <div ref="wrapper" class="wrapper">
        <div class="transition__logo">
          <h5 class="transition__title">Page Transition</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  watch: {
    $route(to, from) {
      console.log(`__Route Changed -- from: ${from.path} -- to: ${to.path}`);
    },
  },
  mounted() {
    gsap.set(this.$refs.transition, {
      top: "100%",
    });
    window.addEventListener("transitionOnLeaveStart", this.onLeave);
    window.addEventListener("transitionOnAfterEnterStart", this.onAfterEnter);
  },
  methods: {
    onLeave() {
      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          gsap.set(this.$refs.transition, { top: "100%" });
          window.lenis.stop();
        },
        onComplete: () => {
          useDispatchEvent("transitionOnLeaveDone");
        },
      });
      tl.to(this.$refs.transition, {
        top: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
      tl.play();
    },
    onAfterEnter() {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          window.lenis.start();
        },
      });
      tl.to(
        this.$refs.transition,
        {
          top: "-100%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.4
      ).call(useDispatchEvent("startOpeningAnimation"), 0.65);
      tl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.transition__container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9990;
  pointer-events: none;
  width: 100%;
  height: 100vh;

  .transition__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    will-change: top;
    background-color: #000;
  }
}
</style>
