<template>
  <div class="w-full max-w-6xl mb-12 relative">
    <!-- Connection Lines (unchanged) -->
    <div class="absolute inset-0 z-0 hidden md:block">
      <div
        class="absolute top-1/2 left-1/2 h-full w-0.5 bg-gradient-to-b from-[#0EA5E9]/50 to-[#E879F9]/50 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute top-[50%] left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9]/30 to-[#E879F9]/30"
      ></div>
      <div
        class="absolute top-[85%] left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9]/30 to-[#E879F9]/30"
      ></div>
    </div>

    <!-- Tree of Life Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      <!-- Adam Kadmon (Crown) - Essence -->
      <div class="md:col-start-2 md:col-span-1">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- User Avatar (only for Essence) -->

          <!-- Sphere Card -->
          <SphereCard
            title="Сущность"
            subtitle="Адам Кадмон"
            icon-class="fas fa-crown"
            description="Ваша истинная природа, основа всего, потенциал души."
            gradient-start="#7B68EE"
            gradient-end="#E879F9"
            icon-color="#7B68EE"
            :loading="loadingBio"
            :data="bioData"
            button-text="Редактировать"
            button-to="/profile/edit"
            button-icon="fas fa-pen"
            :progress="calculateEssenceProgress()"
          >
            <template #data-content>
              <div class="flex-shrink-0 flex justify-center items-center mb-4">
                <UserAvatar
                  :avatar-url="avatarUrl"
                  :loading="loadingBio"
                  :user-initial="userInitial"
                  :size="100"
                  :no-upload="true"
                />
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Профессия:</span>
                <span class="text-white font-medium">{{
                  bioData.profession || "Не указано"
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Возраст:</span>
                <span class="text-white font-medium">{{
                  bioData.age || "Не указано"
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300">Пол:</span>
                <span class="text-white font-medium">{{
                  bioData.gender || "Не указано"
                }}</span>
              </div>
            </template>
          </SphereCard>
        </div>
      </div>

      <!-- Empty cell for grid spacing -->
      <div class="hidden md:block"></div>
      <div class="hidden md:block"></div>

      <!-- Atzilut (Wisdom) - Insight -->
      <div class="md:col-start-1 md:col-span-1">
        <SphereCard
          title="Прозрение"
          subtitle="Ацилут"
          icon-class="fas fa-lightbulb"
          description="Интеллектуальное понимание, сфера мудрости и осознания."
          gradient-start="#0EA5E9"
          gradient-end="#9333EA"
          icon-color="#0EA5E9"
          :loading="loadingAssessments"
          :data="insightData"
          button-text="Исследовать архетипы"
          button-to="/courses"
          button-icon="fas fa-arrow-right"
          :progress="Math.min(insightData.archetypeScores.length * 20, 100)"
        >
          <template #data-content>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Пройдено архетипов:</span>
              <span class="text-white font-medium">{{
                insightData.archetypeScores.length
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Основной архетип:</span>
              <span class="text-white font-medium">{{
                insightData.topArchetype
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Курсы:</span>
              <span class="text-white font-medium">{{
                insightData.coursesProgress.length
              }}</span>
            </div>
          </template>
        </SphereCard>
      </div>

      <!-- Beriah (Understanding) - Inner Realm -->
      <div class="md:col-start-3 md:col-span-1">
        <SphereCard
          title="Внутренний Мир"
          subtitle="Брия"
          icon-class="fas fa-heart"
          description="Эмоциональный мир, глубина чувств и переживаний."
          gradient-start="#EC4899"
          gradient-end="#E879F9"
          icon-color="#EC4899"
          :loading="loadingEmotionBarometer"
          :data="emotionData"
          button-text="Эмоциональный компас"
          button-to="/awareness-tools/emotional-compass"
          button-icon="fas fa-compass"
          :progress="Math.min(emotionData.totalEntries * 10, 100)"
        >
          <template #data-content v-if="emotionData.totalEntries > 0">
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Записей:</span>
              <span class="text-white font-medium">{{
                emotionData.totalEntries
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Основная эмоция:</span>
              <span class="text-white font-medium">{{
                emotionData.mostCommonEmotion
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Интенсивность:</span>
              <span class="text-white font-medium">{{
                emotionData.averageIntensity.toFixed(1)
              }}</span>
            </div>
          </template>
          <template #no-data>
            <i class="fas fa-wind text-[#EC4899] text-2xl opacity-50"></i>
            <p class="text-center text-slate-400">Нет данных об эмоциях</p>
            <NuxtLink
              to="/awareness-tools/emotional-compass"
              class="text-[#EC4899] hover:underline text-sm"
            >
              Начать исследование
            </NuxtLink>
          </template>
        </SphereCard>
      </div>

      <!-- Yetzirah (Formation) - Evolution -->
      <div class="md:col-start-1 md:col-span-1">
        <SphereCard
          title="Эволюция"
          subtitle="Йецира"
          icon-class="fas fa-arrow-up"
          description="Личностный рост, формирование и преобразование."
          gradient-start="#10B981"
          gradient-end="#3B82F6"
          icon-color="#10B981"
          :loading="loading"
          :data="growthData"
          button-text="Добавить инсайт"
          button-to="/growth-tools"
          button-icon="fas fa-plus"
          :progress="Math.min(growthData.entries.length * 20, 100)"
        >
          <template #data-content v-if="growthData.entries.length > 0">
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Инсайтов:</span>
              <span class="text-white font-medium">{{
                growthData.entries.length
              }}</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-slate-300 whitespace-nowrap">Последний:</span>
              <span class="text-white font-medium truncate">{{
                growthData.entries[0].insight || "Н/Д"
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Очки:</span>
              <span class="text-white font-medium">{{
                growthData.points
              }}</span>
            </div>
          </template>
          <template #no-data>
            <i class="fas fa-lightbulb text-[#10B981] text-2xl opacity-50"></i>
            <p class="text-center text-slate-400">Нет данных о росте</p>
            <NuxtLink
              to="/growth-tools"
              class="text-[#10B981] hover:underline text-sm"
            >
              Начать путь роста
            </NuxtLink>
          </template>
        </SphereCard>
      </div>

      <!-- Assiyah (Action) - Action -->
      <div class="md:col-start-3 md:col-span-1">
        <SphereCard
          title="Действие"
          subtitle="Асия"
          icon-class="fas fa-running"
          description="Материальный план, поведение и конкретные действия."
          gradient-start="#F59E0B"
          gradient-end="#EF4444"
          icon-color="#F59E0B"
          :loading="loadingEmotionBarometer"
          :data="actionData"
          button-text="Все инструменты"
          button-to="/awareness-tools"
          button-icon="fas fa-tools"
          :progress="
            Math.min(
              actionData.emotionBarometerStats.totalEntries * 10 +
                actionData.archetypeScores.length * 10,
              100
            )
          "
        >
          <template
            #data-content
            v-if="
              actionData.emotionBarometerStats.totalEntries > 0 ||
              actionData.archetypeScores.length > 0
            "
          >
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Использований компаса:</span>
              <span class="text-white font-medium">{{
                actionData.emotionBarometerStats.totalEntries
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-300">Пройдено тестов:</span>
              <span class="text-white font-medium">{{
                actionData.archetypeScores.length
              }}</span>
            </div>
          </template>
          <template #no-data>
            <i
              class="fas fa-shoe-prints text-[#F59E0B] text-2xl opacity-50"
            ></i>
            <p class="text-center text-slate-400">Нет данных о поведении</p>
            <NuxtLink
              to="/awareness-tools"
              class="text-[#F59E0B] hover:underline text-sm"
            >
              Исследовать инструменты
            </NuxtLink>
          </template>
        </SphereCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import SphereCard from "~/components/profile/SphereCard.vue";
import UserAvatar from "~/components/profile/UserAvatar.vue"; // Import UserAvatar here

defineProps({
  loading: { type: Boolean, required: true },
  loadingBio: { type: Boolean, required: true },
  loadingEmotionBarometer: { type: Boolean, required: true },
  loadingAssessments: { type: Boolean, required: true },
  bioData: { type: Object, required: true },
  emotionData: { type: Object, required: true },
  insightData: { type: Object, required: true },
  growthData: { type: Object, required: true },
  actionData: { type: Object, required: true },
  calculateEssenceProgress: { type: Function, required: true },
  avatarUrl: { type: String, default: null }, // Add avatarUrl prop
  userInitial: { type: String, default: "" }, // Add userInitial prop
});
</script>
