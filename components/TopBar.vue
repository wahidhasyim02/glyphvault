<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 dark:border-[#1D222B] bg-white/95 dark:bg-[#090B0E]/95 backdrop-blur-md transition-colors">
    <div class="h-14 px-4 lg:px-6 flex items-center justify-between gap-4">
      <!-- Zone 1: Brand Title with New Dual-Theme Logo -->
      <button
        type="button"
        @click="handleBrandClick"
        class="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-[#2DD4BF] rounded-md cursor-pointer group"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          class="shrink-0 transition-transform group-hover:scale-105"
        >
          <circle cx="31.7715" cy="12.5714" r="9.37143" class="fill-slate-800 dark:fill-[#D9D9D9]" />
          <path d="M60.4082 29.6528C59.3713 29.3372 58.2564 29.1648 57.0951 29.1648C51.5755 29.1649 47.1012 33.0429 47.1011 37.8262C47.1012 42.6095 51.5755 46.487 57.0951 46.4871C58.2156 46.4871 59.293 46.3276 60.2987 46.0328L50.1953 60.8C40.1557 56.8102 33.1823 48.0243 33.1823 37.8262C33.1823 27.605 40.187 18.8016 50.2633 14.8245L60.4082 29.6528Z" fill="#0D9488"/>
          <path d="M13.2815 14.8675C23.3002 18.8646 30.2556 27.6413 30.2556 37.8262C30.2556 47.9881 23.3316 56.7479 13.3495 60.7575L3.30741 46.0803C4.26472 46.3444 5.28449 46.4871 6.3428 46.4871C11.8624 46.4871 16.3367 42.6096 16.3368 37.8262C16.3367 33.0429 11.8624 29.1649 6.3428 29.1648C5.24487 29.1648 4.18826 29.3184 3.20001 29.6018L13.2815 14.8675Z" fill="#0D9488"/>
        </svg>
        <span class="font-display text-base font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
          Iconix
        </span>
      </button>

      <!-- Zone 2: Desktop Navigation Links -->
      <nav
        aria-label="Primary navigation"
        class="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium"
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
          @click="$emit('change-section', 'docs')"
          class="py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer"
          :class="activeSection === 'docs'
            ? 'border-teal-600 dark:border-[#2DD4BF] text-slate-900 dark:text-[#F1F5F9]'
            : 'border-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9]'"
        >
          Documentation
        </button>
      </nav>

      <!-- Zone 3: Global Actions (Theme Toggle, Embed button & Mobile Hamburger) -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <!-- Discreet SVG Live Lab / Tester (For testing newly designed SVGs) -->
        <button
          type="button"
          @click="$emit('open-json-studio', 'add')"
          title="SVG Live Lab / Tester"
          aria-label="SVG Live Lab / Tester"
          class="p-2 rounded-lg bg-slate-100 dark:bg-[#11141A] border border-slate-200 dark:border-[#1D222B] text-slate-500 dark:text-[#94A3B8] hover:text-teal-600 dark:hover:text-[#2DD4BF] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors shrink-0 cursor-pointer"
        >
          <FlaskConical class="w-4 h-4" />
        </button>

        <!-- Global Theme Toggle (Always visible in Header) -->
        <button
          type="button"
          @click="$emit('toggle-theme')"
          :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :aria-label="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          class="p-2 rounded-lg bg-slate-100 dark:bg-[#11141A] border border-slate-200 dark:border-[#1D222B] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors shrink-0 cursor-pointer"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-700" />
        </button>

        <!-- Use <ix-icon> button (Desktop & Tablet) -->
        <button
          type="button"
          @click="$emit('change-section', 'docs')"
          class="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#090B0E]"
        >
          <Code2 class="w-3.5 h-3.5 shrink-0" />
          <span>Use &lt;ix-icon&gt;</span>
        </button>

        <!-- Mobile Navigation Hamburger Button (Shown only on mobile < md) -->
        <button
          type="button"
          @click="mobileNavOpen = !mobileNavOpen"
          :aria-expanded="mobileNavOpen"
          aria-label="Toggle navigation menu"
          class="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-[#11141A] border border-slate-200 dark:border-[#1D222B] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] transition-colors shrink-0 cursor-pointer"
        >
          <X v-if="mobileNavOpen" class="w-4 h-4" />
          <Menu v-else class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Navigation Menu (< md) -->
    <div
      v-if="mobileNavOpen"
      class="md:hidden border-t border-slate-200 dark:border-[#1D222B] bg-slate-50/98 dark:bg-[#0B0E13]/98 px-4 py-3 space-y-1.5 shadow-lg backdrop-blur-md"
    >
      <button
        type="button"
        @click="handleNavClick('browse')"
        class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        :class="activeSection === 'browse'
          ? 'bg-white dark:bg-[#151C24] text-teal-700 dark:text-[#2DD4BF] ring-1 ring-teal-500/30'
          : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
      >
        <span>Explore Icons</span>
        <span class="text-xs font-mono text-slate-400">Library</span>
      </button>

      <button
        type="button"
        @click="handleNavClick('guide')"
        class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        :class="activeSection === 'guide'
          ? 'bg-white dark:bg-[#151C24] text-teal-700 dark:text-[#2DD4BF] ring-1 ring-teal-500/30'
          : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
      >
        <span>Style Variants</span>
        <span class="text-xs font-mono text-slate-400">Guide</span>
      </button>

      <button
        type="button"
        @click="handleNavClick('docs')"
        class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        :class="activeSection === 'docs'
          ? 'bg-white dark:bg-[#151C24] text-teal-700 dark:text-[#2DD4BF] ring-1 ring-teal-500/30'
          : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
      >
        <span>Documentation</span>
        <span class="text-xs font-mono text-slate-400">Integration</span>
      </button>

      <div class="my-1.5 border-t border-slate-200 dark:border-[#1D222B]/70" />

      <button
        type="button"
        @click="handleJsonClick('add')"
        class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#13171E] transition-colors cursor-pointer"
      >
        <span>SVG Live Lab / Tester</span>
        <FlaskConical class="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Code2, Sun, Moon, Menu, X, FlaskConical } from 'lucide-vue-next';

interface Props {
  activeSection: 'browse' | 'guide' | 'docs';
  theme: 'dark' | 'light';
}

defineProps<Props>();

const emit = defineEmits<{
  'change-section': [section: 'browse' | 'guide' | 'docs'];
  'open-json-studio': [tab?: 'guide' | 'import' | 'add' | 'embed'];
  'reset-all': [];
  'toggle-theme': [];
}>();

const mobileNavOpen = ref(false);

const handleBrandClick = () => {
  mobileNavOpen.value = false;
  emit('change-section', 'browse');
  emit('reset-all');
};

const handleNavClick = (section: 'browse' | 'guide' | 'docs') => {
  mobileNavOpen.value = false;
  emit('change-section', section);
};

const handleJsonClick = (tab: 'guide' | 'import' | 'add' | 'embed') => {
  mobileNavOpen.value = false;
  emit('open-json-studio', tab);
};
</script>
