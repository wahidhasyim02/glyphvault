<template>
  <div class="sticky top-14 z-20 bg-white/95 dark:bg-[#090B0E]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1D222B] px-4 lg:px-6 py-3.5 space-y-3 transition-colors">
    <!-- Row 1: Search Bar + Style Variant Segmented Control -->
    <div class="flex flex-col xl:flex-row xl:items-center gap-3">
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <button
          type="button"
          @click="$emit('open-mobile-categories')"
          class="lg:hidden inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-[#11141A] border border-slate-200 dark:border-[#1D222B] text-xs font-medium text-slate-800 dark:text-[#E2E8F0] hover:border-slate-300 dark:hover:border-[#2E3645] shrink-0"
        >
          <SlidersHorizontal class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
          <span class="max-w-[90px] truncate">{{ selectedCategory }}</span>
        </button>

        <div class="relative flex-1 min-w-0">
          <Search class="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref="searchInputRef"
            type="text"
            :value="searchQuery"
            @input="$emit('search-change', ($event.target as HTMLInputElement).value)"
            placeholder="Search icons by name or tag (e.g. arrow, bell, security, cloud)..."
            aria-label="Search icons by name or tag"
            class="w-full h-10 pl-10 pr-28 rounded-lg bg-slate-50 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-sm text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#64748B] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70 focus:ring-1 focus:ring-teal-500/30 dark:focus:ring-[#2DD4BF]/30 transition-colors"
          />
          <div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              v-if="searchQuery"
              type="button"
              @click="$emit('search-change', '')"
              aria-label="Clear search"
              class="p-1 rounded text-slate-400 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-200 dark:hover:bg-[#1A202A] cursor-pointer"
            >
              <X class="w-3.5 h-3.5" />
            </button>
            <span class="font-mono text-xs tabular-nums text-slate-500 dark:text-[#64748B] select-none">
              {{ matchedCount }}/{{ totalCount }}
            </span>
            <kbd class="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-[#64748B] bg-white dark:bg-[#161B23] border border-slate-200 dark:border-[#242B37] rounded">
              /
            </kbd>
          </div>
        </div>
      </div>

      <!-- 4-Style Variant Switcher -->
      <div
        role="tablist"
        aria-label="Icon style variant"
        class="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] overflow-x-auto shrink-0"
      >
        <button
          v-for="opt in STYLE_OPTIONS"
          :key="opt.id"
          role="tab"
          :aria-selected="styleVariant === opt.id"
          type="button"
          @click="$emit('style-change', opt.id)"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          :class="styleVariant === opt.id
            ? 'bg-white dark:bg-[#1A222D] text-slate-900 dark:text-[#F1F5F9] ring-1 ring-teal-600/35 dark:ring-[#2DD4BF]/40 shadow-xs dark:shadow-none'
            : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] hover:bg-white/60 dark:hover:bg-[#151A22]'"
        >
          <SvgGlyph
            :raw-svg="SAMPLE_GLYPH_SVG"
            :style-variant="opt.id"
            :settings="{
              ...settings,
              size: 16,
              strokeWidth: 1.75,
              primaryColor: styleVariant === opt.id ? (theme === 'dark' ? '#2DD4BF' : '#0D9488') : (theme === 'dark' ? '#94A3B8' : '#64748B'),
              secondaryColor: styleVariant === opt.id ? (theme === 'dark' ? '#2DD4BF' : '#0D9488') : (theme === 'dark' ? '#94A3B8' : '#64748B'),
              duotoneOpacity: 0.38,
            }"
          />
          <span>{{ opt.label }}</span>
        </button>
      </div>
    </div>

    <!-- Row 2: Live Studio Controls (Size, Stroke, Opacity, Primary & Tone Colors, Grid Zoom, Click-to-Copy, Theme) -->
    <div class="flex flex-wrap items-center justify-between gap-x-5 gap-y-2.5 pt-1 text-xs">
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <!-- Icon Size -->
        <label class="flex items-center gap-2 whitespace-nowrap">
          <span class="text-slate-600 dark:text-[#94A3B8]">Size</span>
          <input
            type="range"
            min="16"
            max="64"
            step="2"
            :value="settings.size"
            @input="$emit('update-settings', { size: Number(($event.target as HTMLInputElement).value) })"
            class="studio-slider w-20 sm:w-22"
          />
          <span class="font-mono tabular-nums text-slate-800 dark:text-[#E2E8F0] w-9 text-right">
            {{ settings.size }}px
          </span>
        </label>

        <!-- Stroke Width -->
        <label
          class="flex items-center gap-2 whitespace-nowrap transition-opacity"
          :class="isStrokeApplicable ? 'opacity-100' : 'opacity-45'"
          title="Adjust stroke width (Linear, Dualtone Linear, open paths)"
        >
          <span class="text-slate-600 dark:text-[#94A3B8]">Stroke</span>
          <input
            type="range"
            min="0.75"
            max="3"
            step="0.25"
            :value="settings.strokeWidth"
            @input="$emit('update-settings', { strokeWidth: Number(($event.target as HTMLInputElement).value) })"
            class="studio-slider w-20 sm:w-22"
          />
          <span class="font-mono tabular-nums text-slate-800 dark:text-[#E2E8F0] w-9 text-right">
            {{ settings.strokeWidth.toFixed(2) }}
          </span>
        </label>

        <!-- Dualtone Opacity -->
        <label
          class="flex items-center gap-2 whitespace-nowrap transition-opacity"
          :class="isDuotoneMode ? 'opacity-100' : 'opacity-45'"
          title="Adjust secondary tone opacity (Dualtone & Dualtone Linear)"
        >
          <span class="text-slate-600 dark:text-[#94A3B8]">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            :value="settings.duotoneOpacity"
            @input="$emit('update-settings', { duotoneOpacity: Number(($event.target as HTMLInputElement).value) })"
            class="studio-slider w-20 sm:w-22"
          />
          <span class="font-mono tabular-nums text-slate-800 dark:text-[#E2E8F0] w-9 text-right">
            {{ settings.duotoneOpacity.toFixed(2) }}
          </span>
        </label>

        <!-- Dual Color Pickers: Primary + Tone -->
        <div class="flex items-center gap-2.5 whitespace-nowrap">
          <label class="inline-flex items-center gap-1.5 cursor-pointer" :title="`Primary / Stroke color: ${settings.primaryColor}`">
            <span class="text-slate-600 dark:text-[#94A3B8]">Primary</span>
            <span
              class="relative w-5 h-5 rounded-full border border-slate-300 dark:border-[#2C3442] overflow-hidden shrink-0 shadow-2xs"
              :style="{ backgroundColor: settings.primaryColor }"
            >
              <input
                type="color"
                :value="settings.primaryColor"
                @input="$emit('update-settings', { primaryColor: ($event.target as HTMLInputElement).value })"
                aria-label="Primary icon color"
                class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </span>
          </label>

          <label
            class="inline-flex items-center gap-1.5 cursor-pointer transition-opacity"
            :class="isDuotoneMode ? 'opacity-100' : 'opacity-45'"
            :title="`Dualtone / Base tone color: ${settings.secondaryColor}`"
          >
            <span class="text-slate-600 dark:text-[#94A3B8]">Tone</span>
            <span
              class="relative w-5 h-5 rounded-full border border-slate-300 dark:border-[#2C3442] overflow-hidden shrink-0 shadow-2xs"
              :style="{ backgroundColor: settings.secondaryColor }"
            >
              <input
                type="color"
                :value="settings.secondaryColor"
                @input="$emit('update-settings', { secondaryColor: ($event.target as HTMLInputElement).value })"
                aria-label="Secondary dualtone color"
                class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </span>
          </label>

          <div class="hidden sm:flex items-center gap-1 pl-1.5 border-l border-slate-200 dark:border-[#1D222B]">
            <button
              v-for="preset in colorPresets"
              :key="preset.label"
              type="button"
              @click="$emit('update-settings', { primaryColor: preset.primary, secondaryColor: preset.secondary })"
              :title="preset.label"
              class="w-4 h-4 rounded-full border border-slate-300 dark:border-white/15 hover:scale-115 transition-transform cursor-pointer"
              :style="{
                background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.secondary} 50%)`,
              }"
            />
          </div>
        </div>
      </div>

      <!-- Right Controls: Grid Zoom + Click-to-Copy + Theme Toggle + Reset -->
      <div class="flex items-center gap-2.5 ml-auto">
        <label class="flex items-center gap-2 whitespace-nowrap" title="Zoom icon grid">
          <ZoomIn class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
          <span class="text-slate-600 dark:text-[#94A3B8] hidden sm:inline">Zoom</span>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            :value="gridZoom"
            @input="$emit('grid-zoom-change', Number(($event.target as HTMLInputElement).value))"
            class="studio-slider w-16"
          />
          <span class="font-mono tabular-nums text-slate-800 dark:text-[#E2E8F0] w-5 text-right">
            {{ gridZoom }}x
          </span>
        </label>

        <button
          type="button"
          @click="$emit('toggle-click-to-copy')"
          title="When active, clicking an icon copies its SVG code immediately and opens the preview panel"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          :class="clickToCopy
            ? 'bg-teal-50 dark:bg-[#2DD4BF]/10 border-teal-500/40 dark:border-[#2DD4BF]/40 text-teal-800 dark:text-[#5EEAD4]'
            : 'bg-slate-100 dark:bg-[#101319] border-slate-200 dark:border-[#1D222B] text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0]'"
        >
          <CopyCheck class="w-3.5 h-3.5" />
          <span>Click to Copy</span>
        </button>

        <button
          type="button"
          @click="$emit('toggle-theme')"
          :title="theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'"
          :aria-label="theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sun v-if="theme === 'dark'" class="w-3.5 h-3.5 text-amber-400" />
          <Moon v-else class="w-3.5 h-3.5 text-slate-700" />
          <span class="hidden md:inline">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>

        <button
          type="button"
          @click="$emit('reset-settings')"
          title="Reset size, stroke, opacity, and colors"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  CopyCheck,
  Moon,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sun,
  X,
  ZoomIn,
} from 'lucide-vue-next';
import type { IconSettings, IconStyleVariant } from '~/types/icon';
import SvgGlyph from '~/components/SvgGlyph.vue';

interface Props {
  theme: 'dark' | 'light';
  searchQuery: string;
  matchedCount: number;
  totalCount: number;
  styleVariant: IconStyleVariant;
  settings: IconSettings;
  gridZoom: number;
  clickToCopy: boolean;
  selectedCategory: string;
}

const props = defineProps<Props>();

defineEmits<{
  'toggle-theme': [];
  'search-change': [query: string];
  'style-change': [variant: IconStyleVariant];
  'update-settings': [patch: Partial<IconSettings>];
  'reset-settings': [];
  'grid-zoom-change': [zoom: number];
  'toggle-click-to-copy': [];
  'open-mobile-categories': [];
}>();

const searchInputRef = ref<HTMLInputElement | null>(null);

const SAMPLE_GLYPH_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle data-duotone="base" cx="12" cy="12" r="9"/><path data-duotone="accent" data-cutout="true" d="M8.5 12.5L11 15L15.5 9.5"/></svg>';

const STYLE_OPTIONS: { id: IconStyleVariant; label: string }[] = [
  { id: 'linear', label: 'Linear' },
  { id: 'solid', label: 'Solid' },
  { id: 'duotone', label: 'Dualtone' },
  { id: 'duotone-linear', label: 'Dualtone Linear' },
];

const isDuotoneMode = computed(
  () => props.styleVariant === 'duotone' || props.styleVariant === 'duotone-linear'
);
const isStrokeApplicable = computed(() => props.styleVariant !== 'solid');

const colorPresets = computed(() =>
  props.theme === 'dark'
    ? [
        { label: 'Alabaster + Teal', primary: '#F1F5F9', secondary: '#2DD4BF' },
        { label: 'Teal + Sky', primary: '#2DD4BF', secondary: '#0EA5E9' },
        { label: 'Sky + Indigo', primary: '#38BDF8', secondary: '#818CF8' },
        { label: 'Amber + Orange', primary: '#FBBF24', secondary: '#F97316' },
        { label: 'Rose + Crimson', primary: '#FB7185', secondary: '#F43F5E' },
      ]
    : [
        { label: 'Slate Ink + Teal', primary: '#0F172A', secondary: '#0D9488' },
        { label: 'Teal + Cyan', primary: '#0F766E', secondary: '#0284C7' },
        { label: 'Indigo + Violet', primary: '#1E293B', secondary: '#6366F1' },
        { label: 'Amber + Terracotta', primary: '#B45309', secondary: '#F59E0B' },
        { label: 'Rose + Berry', primary: '#BE123C', secondary: '#FB7185' },
      ]
);

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInputRef.value?.focus();
  } else if (
    e.key === '/' &&
    document.activeElement?.tagName !== 'INPUT' &&
    document.activeElement?.tagName !== 'TEXTAREA'
  ) {
    e.preventDefault();
    searchInputRef.value?.focus();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
