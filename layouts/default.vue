<template>
  <div>
    <slot />
    <Cursor v-if="isDesktop" />
    <NoiseGrain />
  </div>
</template>

<script>
export default {
  data() {
    const { isDesktop } = useDevice();
    return { isDesktop };
  },
};
</script>
