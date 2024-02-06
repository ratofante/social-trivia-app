<template>
  <div class="container__grid">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container__grid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: min-content;
  gap: 2.66vw;
  padding: 0 var(--site-inline-padding-xs);

  @include respond-to("SM") {
    padding: 0 var(--site-inline-padding);
    gap: 1.8vw;
  }

  @include respond-to("MD") {
    gap: 1.04vw;
  }

  &.full-height {
    height: 100%;
  }
}
</style>
