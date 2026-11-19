<template>
  <div>
    <NuxtLoadingIndicator color="#2DD4BF" :height="3" :duration="2000" :throttle="50" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
if (import.meta.client && typeof window !== 'undefined') {
  if (window.location.hostname === 'glyphvault.conime.id') {
    window.location.replace(
      `https://iconix.conime.id${window.location.pathname}${window.location.search}${window.location.hash}`
    );
  }
}
</script>
