<template>
    <div
        class="flow-card group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
        <!-- Header -->
        <div class="mb-3 flex items-start justify-between">
            <div class="flex-1 min-w-0">
                <h3 class="truncate text-lg font-bold text-slate-900 dark:text-white">
                    {{ flow.name }}
                </h3>
                <p v-if="flow.description" class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                    {{ flow.description }}
                </p>
            </div>
        </div>

        <!-- Badges -->
        <div class="mb-3 flex flex-wrap gap-2">
            <span
                class="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
                {{ flowTypes[flow.type] }}
            </span>
            <span
                class="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {{ flowCategories[flow.category] }}
            </span>
        </div>

        <!-- Tags -->
        <div v-if="flow.tags && flow.tags.length > 0" class="mb-3 flex flex-wrap gap-1.5">
            <span v-for="tag in flow.tags.slice(0, 3)" :key="tag"
                class="inline-flex items-center rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                #{{ tag }}
            </span>
            <span v-if="flow.tags.length > 3"
                class="inline-flex items-center rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                +{{ flow.tags.length - 3 }}
            </span>
        </div>

        <!-- Stats -->
        <div class="mb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-1">
                <i class="fas fa-puzzle-piece"></i>
                <span>{{ flow.modules?.length || 0 }} модулей</span>
            </div>
            <div v-if="flow.estimatedDuration" class="flex items-center gap-1">
                <i class="fas fa-clock"></i>
                <span>~{{ flow.estimatedDuration }} мин</span>
            </div>
            <div v-if="flow.timesUsed > 0" class="flex items-center gap-1">
                <i class="fas fa-play-circle"></i>
                <span>{{ flow.timesUsed }}x</span>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
            <button @click="$emit('edit', flow)"
                class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                <i class="fas fa-edit mr-1"></i>
                Редактировать
            </button>
            <button @click="$emit('duplicate', flow)"
                class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                title="Дублировать">
                <i class="fas fa-copy"></i>
            </button>
            <button @click="$emit('delete', flow.id)"
                class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                title="Удалить">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    flow: any
    flowTypes: Record<string, string>
    flowCategories: Record<string, string>
}>()

defineEmits<{
    edit: [flow: any]
    duplicate: [flow: any]
    delete: [flowId: string]
}>()
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
