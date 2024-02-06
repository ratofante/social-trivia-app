<template>
  <div ref="loader" class="loader">
    <div class="wrapper">
      <div v-if="isDesktop" class="columns-rack-desktop">
        <template v-for="n in 5" :key="n">
          <div class="column"></div>
        </template>
      </div>
      <div v-else class="columns-rack-mobile">
        <template v-for="n in 25" :key="n">
          <div class="column"></div>
        </template>
      </div>
      <div class="loader-content">
        <div class="loader-portrait">
          <div class="loader-image">
            <nuxt-img
              src="/img/loader/loader-portrait-321-435.png"
              width="321"
              height="435"
              loading="eager"
            ></nuxt-img>
          </div>
          <h4 class="loader-title">
            <div class="main">
              <template v-for="(char, i) in 'uiPortfolio'" :key="i">
                <span class="char">{{ char }}</span>
              </template>
            </div>
            <div class="author">
              <template v-for="(char, i) in 'by Rodrigo G.W.'" :key="i">
                <span class="char">{{ char === " " ? "&nbsp;" : char }}</span>
              </template>
            </div>
          </h4>
        </div>
        <div class="loading-bar">
          <div class="bar"></div>
        </div>
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
      gsap
        .timeline()
        .to(
          ".loader-portrait",
          {
            clipPath: "polygon(-25% 0%, 125% 0%, 125% 125%, -25% 125%)",
            duration: 1.2,
            ease: "Power2.easeInOut",
          },
          0
        )
        .to(
          ".loading-bar",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.easeInOut",
          },
          0
        )
        .to(
          ".loader-image",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "Power2.easeOut",
          },
          0.15
        )
        .to(
          ".loader-image img",
          {
            opacity: 1,
            duration: 1.77,
            ease: "Power3.easeInOut",
          },
          0.6
        )
        .from(
          ".loader-title .char",
          {
            opacity: 0,
            stagger: 0.03,
            duration: 1.2,
            ease: "Power3.easeIn",
          },
          0.6
        )
        .to(
          ".loading-bar .bar",
          {
            transform: "scaleX(1.0)",
            duration: 1.2,
            ease: "Power1.easeOut",
          },
          1.75
        );
    },
    loaderAnimationOut: function () {
      const tl = gsap
        .timeline({
          onComplete: function () {
            this.loaded = true;
            document.querySelector("#page").classList.remove("locked");
          },
        })
        .to(document.querySelectorAll(".loader-title .char"), {
          opacity: 0,
          yPercent: 10,
          ease: "Power2.easeOut",
          duration: 0.65,
          stagger: 0.04,
        })
        .to(
          document.querySelector(".loading-bar"),
          {
            transform: "scaleX(0)",
            duration: 0.8,
            ease: "Power2.easeInOut",
          },
          0.4
        )
        .to(
          ".loader .loader-portrait",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "Power2.easeIn",
          },
          0.35
        );
      if (this.isDesktop) {
        tl.to(
          ".columns-rack-desktop .column",
          {
            height: "0%",
            backgroundColor: "#d9d9d9",
            ease: "Power2.easeInOut",
            duration: 1.2,
            stagger: {
              from: "edges",
              each: 0.08,
            },
            onStart: () => {
              useDispatchEvent("loaderComplete");
            },
          },
          0.75
        );
      } else {
        tl.to(
          ".columns-rack-mobile .column",
          {
            width: "0%",
            backgroundColor: "#a4b2b2",
            ease: "Power2.easeOut",
            duration: 0.8,
            stagger: 0.023,
            onStart: () => {
              useDispatchEvent("loaderComplete");
            },
          },
          0.35
        );
      }
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
  pointer-events: none;

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);

    .columns-rack-desktop,
    .columns-rack-mobile {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      height: 100%;
      width: 100%;
      align-items: flex-end;

      .column {
        background-color: #171717;
      }
    }
    .columns-rack-desktop .column {
      width: 20%;
      height: 100%;
    }

    .columns-rack-mobile {
      flex-direction: column;

      .column {
        height: 4%;
        width: 100%;
      }
    }
  }

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(80%, 320px);
    height: fit-content;
    .loader-portrait {
      position: relative;
      width: 70%;
      border: 1px solid rgba(var(--blue), 0.45);
      border-radius: 6px;
      clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);

      @include respond-to("SM") {
        width: 80%;
      }

      .loader-image {
        width: 100%;
        height: 100%;
        overflow: hidden;
        clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
        }
      }

      .loader-title {
        position: absolute;
        left: 50%;
        bottom: 6vh;
        transform: translateX(-50%);
        z-index: 1;
        color: rgb(var(--light));
        @include ff-primary(700);
        @include fontResponsive(83px, 100px, 390px, 1280px);
        letter-spacing: 0px;
        line-height: 0.8;
        text-align: center;

        .author {
          position: absolute;
          @include ff-primary(500);
          font-size: 22px;
          width: 100%;
          margin-top: 0.5em;
        }
      }
    }

    .loading-bar {
      margin: 2vh auto 0 auto;
      height: 5px;
      width: 60%;
      border: 1px solid rgba(var(--blue), 0.45);
      border-radius: 6px;
      opacity: 0;
      clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);

      .bar {
        width: 100%;
        height: 100%;
        transform: scaleX(0);
        transform-origin: left;
        background-color: rgba(var(--light), 0.9);
      }
    }
  }
}
</style>
