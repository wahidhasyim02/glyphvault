<template>
  <div class="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
    <div class="space-y-2 border-b border-slate-200 dark:border-[#1D222B] pb-6">
      <h1 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
        Four Adaptive Icon Variants from One Source
      </h1>
      <p class="text-sm text-slate-600 dark:text-[#94A3B8] max-w-2xl leading-relaxed">
        Every glyph stored in
        <code class="font-mono text-teal-700 dark:text-[#2DD4BF]">icons.json</code> renders
        dynamically across four coordinated styles, responding live to size, stroke width, primary color, secondary color, and tone opacity.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="card in STYLE_CARDS"
        :key="card.id"
        class="p-6 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] flex flex-col justify-between gap-6"
      >
        <div class="space-y-2">
          <div class="flex items-baseline justify-between gap-2">
            <h2 class="font-display text-lg font-semibold text-slate-900 dark:text-[#F1F5F9]">
              {{ card.title }}
            </h2>
            <span class="text-xs text-slate-500 dark:text-[#64748B]">{{ card.spec }}</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            {{ card.description }}
          </p>
        </div>

        <div class="grid grid-cols-4 gap-3 py-4 px-4 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#181D26]">
          <div
            v-for="item in previewSet"
            :key="`${card.id}-${item.name}`"
            class="flex flex-col items-center justify-center gap-1.5 py-2"
          >
            <SvgGlyph
              :raw-svg="item.svg"
              :style-variant="card.id"
              :settings="settings"
              :override-size="28"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            @click="$emit('select-style-and-browse', card.id)"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#151A23] border border-slate-200 dark:border-[#252E3D] text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] hover:border-teal-500/60 dark:hover:border-[#2DD4BF]/50 hover:text-teal-700 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
          >
            <span>Open {{ card.title }} in Browser</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';
import SvgGlyph from '~/components/SvgGlyph.vue';

interface Props {
  sampleIcons: IconEntry[];
  settings: IconSettings;
}

const props = defineProps<Props>();

defineEmits<{
  'select-style-and-browse': [style: IconStyleVariant];
}>();

const STYLE_CARDS: {
  id: IconStyleVariant;
  title: string;
  description: string;
  spec: string;
}[] = [
  {
    id: 'linear',
    title: 'Linear',
    description:
      'Crisp single-weight geometric outlines with adjustable stroke thickness and round end-caps for clean technical interfaces.',
    spec: 'Stroke-driven · Adjustable stroke width',
  },
  {
    id: 'solid',
    title: 'Solid',
    description:
      'High-contrast filled silhouettes with negative-space cutouts carved via SVG masks for instant recognition at small sizes.',
    spec: 'Fill-driven · True negative-space cutouts',
  },
  {
    id: 'duotone',
    title: 'Dualtone',
    description:
      'Layered primary accents paired with a translucent secondary tone base, controlled directly by the Opacity and Color pickers.',
    spec: 'Two-tone fill · Adjustable tone opacity',
  },
  {
    id: 'duotone-linear',
    title: 'Dualtone Linear',
    description:
      'Combines sharp outer stroke geometry with a soft tinted interior fill so icons carry depth without losing wireframe clarity.',
    spec: 'Stroke + translucent fill · Dual controls',
  },
];

const previewSet = computed(() => props.sampleIcons.slice(0, 8));
</script>
