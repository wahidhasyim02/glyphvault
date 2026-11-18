<template>
  <div class="rounded-xl border border-slate-200 dark:border-[#1E2532] bg-slate-900 text-slate-100 overflow-hidden text-xs font-mono shadow-sm">
    <!-- Header with Language Badge & Copy Button -->
    <div class="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px]">
      <span class="font-semibold uppercase tracking-wider text-teal-400">
        {{ lang || 'code' }}
      </span>

      <button
        type="button"
        @click="copy"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-colors cursor-pointer"
        :class="copied
          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60'"
        :title="copied ? 'Copied to clipboard!' : 'Copy to clipboard'"
      >
        <Check v-if="copied" class="w-3.5 h-3.5 text-teal-400" />
        <Copy v-else class="w-3.5 h-3.5" />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Preformatted Code Block -->
    <pre class="p-4 overflow-x-auto text-xs leading-relaxed font-mono text-slate-200 selection:bg-teal-500/30 selection:text-teal-200"><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Check } from 'lucide-vue-next';

interface Props {
  code: string;
  lang?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'copied': [];
}>();

const copied = ref(false);

const copy = async () => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.code);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = props.code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    copied.value = true;
    emit('copied');
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};
</script>
