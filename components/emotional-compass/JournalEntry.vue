<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <div class="space-y-2">
      <label class="block text-sm font-mono text-cyan-700 dark:text-cyan-300">СИТУАЦИЯ</label>
      <textarea :value="journalEntry" @input="$emit('update:journalEntry', $event.target.value)" rows="3"
        class="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none placeholder-slate-400 dark:placeholder-slate-600 resize-none"
        placeholder="Что произошло? Опишите факты..."></textarea>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-mono text-purple-700 dark:text-purple-300">МЫСЛИ И ВОСПРИЯТИЕ</label>
      <textarea :value="perceptionEntry" @input="$emit('update:perceptionEntry', $event.target.value)" rows="3"
        class="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none placeholder-slate-400 dark:placeholder-slate-600 resize-none"
        placeholder="О чем вы подумали? Как вы это восприняли?"></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="block text-sm font-mono text-emerald-700 dark:text-emerald-300">РЕАКЦИЯ ТЕЛА</label>
        <textarea :value="copingEntry" @input="$emit('update:copingEntry', $event.target.value)" rows="3"
          class="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none placeholder-slate-400 dark:placeholder-slate-600 resize-none"
          placeholder="Что вы почувствовали в теле? Как справились?"></textarea>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-mono text-orange-700 dark:text-orange-300">ДЕЙСТВИЯ</label>
        <textarea :value="actionEntry" @input="$emit('update:actionEntry', $event.target.value)" rows="3"
          class="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-400 dark:placeholder-slate-600 resize-none"
          placeholder="Что вы сделали или захотели сделать?"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  journalEntry: String,
  perceptionEntry: String,
  copingEntry: String,
  actionEntry: String,
});

defineEmits([
  "update:journalEntry",
  "update:perceptionEntry",
  "update:copingEntry",
  "update:actionEntry",
]);
</script>
