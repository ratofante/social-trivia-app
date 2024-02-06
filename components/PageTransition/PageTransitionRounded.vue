<template>
  <div class="transition__container">
    <div id="transition" ref="transition" class="transition__wrapper">
      <div ref="top" class="rounded-div-wrap top">
        <div class="rounded-div"></div>
      </div>
      <div ref="wrapper" class="wrapper">
        <div class="transition__logo">
          <h5 class="transition__title">{{ path }}</h5>
        </div>
      </div>
      <div ref="bottom" class="rounded-div-wrap bottom">
        <div class="rounded-div"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  components: {},
  data() {
    return {};
  },
  watch: {
    $route(to) {
      this.path = "";
      this.routes.forEach((route) => {
        if (to.path.includes(route.needle)) {
          this.path = route.path;
        }
      });
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
          gsap.set("#transition", { top: "100%" });
          window.lenis.stop();
        },
        onComplete: () => {
          useDispatchEvent("transitionOnLeaveDone");
        },
      });
      tl.to("#transition", {
        top: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
        .fromTo(
          "#transition .top",
          {
            height: 0,
          },
          {
            height: "15vh",
            duration: 0.8,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          "#transition .transition__title",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
          },
          0.45
        );
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
        "#transition",
        {
          top: "-100%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.4
      ).fromTo(
        "#transition .bottom",
        {
          height: "15vh",
        },
        {
          height: "0vh",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            useDispatchEvent("openingAnimation");
          },
        },
        0.4
      );
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
  z-index: 5000;
  pointer-events: none;
  width: 100%;
  height: 100vh;

  .transition__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    will-change: top;
    background-color: #09070b;

    .rounded-div-wrap {
      width: 100%;
      top: 0;
      position: relative;
      height: 10vh;
      overflow: hidden;

      &.top {
        top: 0;
        position: absolute;
        transform: translateY(-99%) scale(1, -1);
        z-index: 2;
        height: 0vh;
        will-change: height;
      }

      &.bottom {
        position: absolute;
        bottom: 0;
        top: unset;
        transform: translateY(99%);
        z-index: 2;
        will-change: height;
      }

      .rounded-div {
        height: 745%;
        width: 150%;
        position: absolute;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -86.666%);
        z-index: 1;
        background-color: #09070b;
      }
    }

    .wrapper {
      width: 260px;
      height: 160px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateX(-50%) translateY(-50%);
      pointer-events: none;

      .transition__logo {
        position: absolute;
        display: flex;
        justify-content: center;
        z-index: 1;

        .transition__title {
          color: #fafafa;
          font-weight: 400;
          white-space: nowrap;
          @include fontResponsive(35px, 75px, 768px, 1920px);
          opacity: 0;
        }
      }
    }
  }
}
</style>
