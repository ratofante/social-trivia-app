<template>
  <div ref="loader" class="loader">
    <div class="wrapper">
      <h1 class="title">
        <div class="line">Welcome</div>
        <div class="line">to the front</div>
      </h1>
      <div class="loading__bar">
        <div ref="bar" class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  components: {},
  data() {
    const { isDesktop } = useDevice();
    const ctx = "";
    const { transitionState } = usePageTransition();
    return { transitionState, ctx, isDesktop };
  },
  mounted() {
    window.addEventListener("triggerLoaderAnimationIn", this.loaderAnimationIn);
    window.addEventListener(
      "triggerLoaderAnimationOut",
      this.loaderAnimationOut
    );
  },
  methods: {
    loaderAnimationIn() {
      gsap.to(this.$refs.bar, {
        width: "100%",
        ease: "power2.out",
        duration: 1.5,
        onComplete: () => {
          this.loaderAnimationOut();
        },
      });
    },
    loaderAnimationOut: function () {
      gsap
        .timeline({
          onComplete: function () {
            this.loaded = true;
            document.querySelector("#page").classList.remove("locked");
          },
        })
        .to(this.$refs.loader, {
          opacity: 0,
          ease: "power2.out",
          duration: 1,
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  //pointer-events: none;
  display: grid;
  background-color: rgba(var(--dark));

  .wrapper {
    place-self: center;
  }

  .title {
    font-size: 45px;
    color: rgb(var(--light));
    text-align: center;
  }
  .loading__bar {
    margin-top: 1rem;
    width: 140px;
    height: 6px;
    border: 2px solid rgba(var(--light-gray), 0.3);
    border-radius: 8px;
    margin: 1rem auto 0 auto;
  }

  .bar {
    width: 0%;
    height: 100%;
    background-color: rgba(var(--light), 0.6);
  }
}
</style>
