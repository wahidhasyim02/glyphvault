<template>
  <IndexPage initial-section="guide" />
</template>

<script setup lang="ts">
import IndexPage from './index.vue';

useHead({
  title: 'Style Variants Guide — GlyphVault SVG Icon Studio',
  meta: [
    {
      name: 'description',
      content:
        'Explore the 5 adaptive visual styles of GlyphVault: Linear, Line Duotone, Solid, Dualtone, and Dualtone Linear.',
    },
  ],
});
</script>
