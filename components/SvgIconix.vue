<template>
  <span
    class="inline-flex items-center justify-center shrink-0 select-none"
    aria-hidden="true"
    v-html="markup"
  />
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';
import type { IconSettings, IconStyleVariant } from '~/types/icon';
import { buildStyledSvg } from '~/utils/svgEngine';

interface Props {
  rawSvg: string;
  styleVariant: IconStyleVariant;
  settings: IconSettings;
  overrideSize?: number;
}

const props = defineProps<Props>();

const uid = useId();

const markup = computed(() => {
  return buildStyledSvg(props.rawSvg, props.styleVariant, props.settings, {
    uniqueSuffix: uid.replace(/[:]/g, ''),
    overrideSize: props.overrideSize,
  });
});
</script>
