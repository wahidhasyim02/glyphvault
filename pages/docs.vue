<template>
  <IndexPage initial-section="docs" />
</template>

<script setup lang="ts">
import IndexPage from './index.vue';

useHead({
  title: 'Documentation — Iconix SVG Icon Studio',
  meta: [
    {
      name: 'description',
      content:
        'Official documentation, Web Component <iconix-icon> API, Nuxt UI & @nuxt/icon integration recipes, and CDN endpoints.',
    },
  ],
});
</script>
