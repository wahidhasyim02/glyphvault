<script setup lang="ts">
// Catch-all route for any unmapped paths, triggering the custom error.vue page cleanly
throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
  fatal: true,
});
</script>
