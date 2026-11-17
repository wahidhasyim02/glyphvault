<template>
  <header class="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-[#1D222B] bg-white/95 dark:bg-[#090B0E]/95 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-8 transition-colors">
    <!-- Zone 1: Brand Title -->
    <button
      type="button"
      @click="handleBrandClick"
      class="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-[#2DD4BF] rounded-md cursor-pointer"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        class="shrink-0"
      >
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5"
          fill="#14B8A6"
          fill-opacity="0.16"
          stroke="#0D9488"
          stroke-width="1.75"
        />
        <path d="M8.5 8.5H15.5V11.5H11.5V15.5H8.5V8.5Z" fill="#0D9488" />
        <circle cx="15" cy="15" r="2" class="fill-slate-900 dark:fill-[#F1F5F9]" />
      </svg>
      <span class="font-display text-base font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
        GlyphVault
      </span>
    </button>

    <!-- Zone 2: Navigation Links -->
    <nav
      aria-label="Primary navigation"
      class="hidden md:flex items-center gap-7 text-sm font-medium"
    >
      <button
        type="button"
        @click="$emit('change-section', 'browse')"
        class="py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer"
        :class="activeSection === 'browse'
          ? 'border-teal-600 dark:border-[#2DD4BF] text-slate-900 dark:text-[#F1F5F9]'
          : 'border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9]'"
      >
        Explore Icons
      </button>
      <button
        type="button"
        @click="$emit('change-section', 'guide')"
        class="py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer"
        :class="activeSection === 'guide'
          ? 'border-teal-600 dark:border-[#2DD4BF] text-slate-900 dark:text-[#F1F5F9]'
          : 'border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9]'"
      >
        Style Variants
      </button>
      <button
        type="button"
        @click="$emit('open-json-studio', 'guide')"
        class="py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors cursor-pointer"
      >
        JSON Schema
      </button>
      <button
        type="button"
        @click="$emit('open-json-studio', 'import')"
        class="py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors cursor-pointer"
      >
        Maintainer Studio
      </button>
    </nav>

    <!-- Zone 3: Visitor Primary Action -->
    <div class="flex items-center gap-3 shrink-0">
      <button
        type="button"
        @click="$emit('open-json-studio', 'embed')"
        class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#090B0E]"
      >
        <Code2 class="w-3.5 h-3.5 shrink-0" />
        <span>Use &lt;gv-icon&gt;</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Code2 } from 'lucide-vue-next';

interface Props {
  activeSection: 'browse' | 'guide';
}

defineProps<Props>();

const emit = defineEmits<{
  'change-section': [section: 'browse' | 'guide'];
  'open-json-studio': [tab?: 'guide' | 'import' | 'add' | 'embed'];
  'reset-all': [];
}>();

const handleBrandClick = () => {
  emit('change-section', 'browse');
  emit('reset-all');
};
</script>
