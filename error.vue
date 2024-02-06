<template>
  <div class="error__page">
    <LayoutGrid class="grid">
      <div class="box__text">
        <div class="tag">{{ error.message }}</div>
        <h4>Algo salió mal</h4>
        <h6>Pero no es nada grave</h6>
        <p class="copy">
          ¡Ups! Parece que te has perdido, pero no te preocupes, los errores son
          solo oportunidades para aprender y mejorar. A veces, el camino
          correcto no siempre está claro, pero cada error es un paso más hacia
          el éxito. ¡Vamos a intentarlo de nuevo!
        </p>
        <div class="box__cta">
          <LinkUnderlinedRush label="Al inicio" href="/" theme="dark" />
        </div>
      </div>
    </LayoutGrid>
    <div class="background">
      <div class="box__image">
        <UseWindowSize v-slot="{ width }">
          <NuxtImg
            v-if="width < 992"
            src="/img/error/error__m.jpg"
            width="1080"
            height="1260"
            loading="lazy"
            placeholder
            format="webp"
          />
          <NuxtImg
            v-else
            src="/img/error/error__d.jpg"
            width="1920"
            height="1080"
            loading="lazy"
            placeholder
            format="webp"
          />
        </UseWindowSize>
      </div>
    </div>
  </div>
</template>

<script>
import { UseWindowSize } from "@vueuse/components";
export default {
  components: { UseWindowSize },
  props: {
    error: {
      type: Object,
      default: () => {
        return { message: "something went wrong" };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.error__page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--sections-padding-xs) 0;

  @include respond-to("SM") {
    padding: var(--sections-padding-sm) 0;
  }
  @include respond-to("LG") {
    padding: var(--sections-padding-lg) 0;
  }
}
.grid {
  position: relative;
  z-index: 2;
}
.background {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .box__image,
  .box__image img {
    width: 100%;
    height: 100%;
  }
  .box__image img {
    object-fit: cover;
    object-position: right;
    opacity: 0.25;
  }
}
.box__text {
  grid-column: 2 / 12;
}
.tag {
  @include ff-primary(600);
  color: rgba(var(--blue), 0.6);
  text-transform: uppercase;
  @include fontResponsive(18px, 28px, 375px, 1920px);
  margin-bottom: 2vh;
}
h4,
h6 {
  color: rgba(var(--light), 1);
  margin-bottom: 0.5rem;
}
h4 {
  @include ff-primary(800);
  @include fontResponsive(65px, 120px, 375px, 1920px);
  margin-bottom: 0.5rem;
}
h6 {
  @include ff-primary(600);
  @include fontResponsive(32px, 76px, 375px, 1920px);
}
.copy {
  margin-top: 2vh;
  color: rgba(var(--light), 0.8);
  max-width: max(420px, 40vw);
}
.box__cta {
  font-size: 30px;
  margin-top: 4vh;
}
</style>
