<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6 xl:px-0">
      <h1
        class="text-4xl font-bold text-center mb-8 text-indigo-900 drop-shadow-sm"
      >
        Enhanced Wheel of Life
      </h1>

      <!-- Main Assessment Section -->
      <div class="flex flex-col lg:flex-row gap-10 items-center justify-center">
        <!-- Wheel Visualization -->
        <div
          class="lg:order-2 order-1 relative w-72 h-72 md:w-96 md:h-96 transition-all"
        >
          <div
            class="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm shadow-xl"
          ></div>
          <canvas
            ref="wheelCanvas"
            class="absolute inset-0 w-full h-full drop-shadow-lg z-10"
          ></canvas>

          <Transition name="fade">
            <div
              v-if="showRecommendation"
              class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div
                class="bg-white bg-opacity-95 p-5 rounded-xl shadow-lg max-w-xs text-center backdrop-blur-sm border border-indigo-100"
              >
                <p class="font-semibold text-indigo-700 mb-1">
                  {{ recommendationTitle }}
                </p>
                <p class="text-gray-700">{{ recommendationText }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Controls and Categories -->
        <div class="lg:order-1 order-2 w-full max-w-md">
          <div
            class="bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-800">
                Оцените сферы жизни
              </h2>
              <span
                class="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full"
              >
                1 - 10
              </span>
            </div>

            <div
              v-for="(category, index) in categories"
              :key="index"
              class="mb-5 group"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: category.color }"
                  ></div>
                  <label
                    :for="`category-${index}`"
                    class="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors"
                  >
                    {{ category.name }}
                  </label>
                </div>
                <span
                  class="text-sm font-bold px-2 py-1 rounded-md transition-colors"
                  :class="scoreClass(category.score)"
                >
                  {{ category.score }}/10
                </span>
              </div>
              <div class="relative">
                <input
                  :id="`category-${index}`"
                  v-model.number="category.score"
                  type="range"
                  min="1"
                  max="10"
                  class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300"
                  @input="updateWheel"
                />
                <div
                  class="flex justify-between text-xs text-gray-400 px-1 mt-1"
                >
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3 mt-8">
              <button
                @click="showGoalModal = true"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Set Improvement Goals
              </button>
              <button
                @click="saveResults"
                class="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium py-2 px-4 rounded-lg transition"
              >
                Save Assessment
              </button>
            </div>

            <div
              v-if="lastSaved"
              class="mt-4 text-sm text-gray-500 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Последнее сохранение: {{ lastSaved }}
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Tabs -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Values Alignment Card -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100"
        >
          <div class="bg-indigo-600 p-4 text-white">
            <h3 class="font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              Values Alignment
            </h3>
          </div>
          <div class="p-5">
            <p class="text-gray-600 mb-4">
              Compare what's important to you with your current satisfaction
            </p>
            <div
              v-for="(category, index) in categories"
              :key="`value-${index}`"
              class="mb-4"
            >
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium">{{ category.name }}</span>
                <span class="text-xs text-gray-500">
                  Priority: {{ category.importance }}/5
                </span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full">
                <div
                  class="h-2 rounded-full"
                  :style="{
                    width: `${(category.importance / 5) * 100}%`,
                    backgroundColor: category.color,
                  }"
                ></div>
              </div>
              <div class="mt-2 flex justify-between text-xs text-gray-500">
                <span>Low Priority</span>
                <span>High Priority</span>
              </div>
            </div>
            <button
              @click="showPriorityModal = true"
              class="mt-4 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg text-sm font-medium transition"
            >
              Edit Priorities
            </button>
          </div>
        </div>

        <!-- Energy Mapping Card -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100"
        >
          <div class="bg-emerald-600 p-4 text-white">
            <h3 class="font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Energy Map
            </h3>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-sm mb-2 text-emerald-700">
                  Energizers
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(category, index) in energizingCategories"
                    :key="`energy-${index}`"
                    class="flex items-center gap-2 text-sm"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: category.color }"
                    ></div>
                    {{ category.name }}
                  </li>
                  <li
                    v-if="energizingCategories.length === 0"
                    class="text-sm text-gray-400"
                  >
                    No energizing areas
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-sm mb-2 text-rose-700">Drains</h4>
                <ul class="space-y-2">
                  <li
                    v-for="(category, index) in drainingCategories"
                    :key="`drain-${index}`"
                    class="flex items-center gap-2 text-sm"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: category.color }"
                    ></div>
                    {{ category.name }}
                  </li>
                  <li
                    v-if="drainingCategories.length === 0"
                    class="text-sm text-gray-400"
                  >
                    No draining areas
                  </li>
                </ul>
              </div>
            </div>
            <button
              @click="showEnergyModal = true"
              class="mt-4 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg text-sm font-medium transition"
            >
              Update Energy Ratings
            </button>
          </div>
        </div>

        <!-- Goal Progress Card -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100"
        >
          <div class="bg-amber-600 p-4 text-white">
            <h3 class="font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              My Goals
            </h3>
          </div>
          <div class="p-5">
            <div v-if="userGoals.length > 0" class="space-y-4">
              <div
                v-for="(goal, index) in userGoals"
                :key="`goal-${index}`"
                class="border-l-4 pl-3 py-1"
                :style="{ borderLeftColor: getCategoryColor(goal.category) }"
              >
                <div class="flex justify-between items-start">
                  <h4 class="font-medium">{{ goal.category }}</h4>
                  <span
                    class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                  >
                    {{ goal.targetScore }}/10 target
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ goal.description }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full"
                      :style="{
                        width: `${currentGoalProgress(goal) * 100}%`,
                        backgroundColor: getCategoryColor(goal.category),
                      }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500">
                    {{ Math.round(currentGoalProgress(goal) * 100) }}%
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-4 text-gray-500">
              <p>No goals set yet</p>
              <button
                @click="showGoalModal = true"
                class="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Set your first goal
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations Section -->
      <Transition name="slide-fade">
        <div
          v-if="lowScoreCategories.length > 0"
          class="mt-12 bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
        >
          <div class="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h2 class="text-2xl font-semibold text-indigo-800">
              Рекомендации для улучшения
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(category, index) in lowScoreCategories"
              :key="`rec-${index}`"
              class="bg-gray-50 p-5 rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow"
              :style="{ borderLeftColor: category.color }"
            >
              <div class="flex items-center gap-2 mb-2">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <h3 class="font-medium text-gray-800">{{ category.name }}</h3>
              </div>

              <p class="text-gray-600 mb-4">
                {{ getRecommendationForCategory(category.name) }}
              </p>

              <div class="flex justify-between items-center">
                <span
                  class="text-xs font-medium py-1 px-2 rounded"
                  :class="
                    category.score > 3
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ category.score }}/10
                </span>
                <button
                  @click="
                    setCategoryScore(
                      category.name,
                      Math.min(10, category.score + 1)
                    )
                  "
                  class="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-1 px-3 rounded-full flex items-center gap-1 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Улучшить
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- History Chart Section -->
      <div
        v-if="historyData.length > 1"
        class="mt-12 bg-white rounded-xl shadow-lg p-6 border border-indigo-100"
      >
        <h2 class="text-2xl font-semibold text-indigo-800 mb-6">
          История изменений
        </h2>
        <div class="h-64 w-full">
          <canvas ref="historyCanvas"></canvas>
        </div>
      </div>

      <!-- Modals -->
      <!-- Goal Setting Modal -->
      <Transition name="fade">
        <div
          v-if="showGoalModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              @click="showGoalModal = false"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4 text-indigo-800">
                Set Improvement Goals
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Focus Area
                  </label>
                  <select
                    v-model="newGoal.category"
                    class="w-full rounded-lg border-gray-300"
                  >
                    <option
                      v-for="category in categories"
                      :value="category.name"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Target Score
                  </label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model.number="newGoal.targetScore"
                      type="range"
                      min="1"
                      max="10"
                      class="w-full"
                      @input="updateWheel"
                    />
                    <span class="text-sm font-medium w-8 text-center">
                      {{ newGoal.targetScore }}
                    </span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Specific Goal (optional)
                  </label>
                  <textarea
                    v-model="newGoal.description"
                    rows="3"
                    class="w-full rounded-lg border-gray-300"
                    placeholder="Example: 'Exercise 3 times per week'"
                  ></textarea>
                </div>
              </div>
              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="showGoalModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  @click="addGoal"
                  class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Priority Setting Modal -->
      <Transition name="fade">
        <div
          v-if="showPriorityModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              @click="showPriorityModal = false"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4 text-indigo-800">
                Set Your Priorities
              </h3>
              <p class="text-gray-600 mb-6">
                Rate how important each area is to you (1 = not important, 5 =
                very important)
              </p>
              <div class="space-y-5">
                <div
                  v-for="(category, index) in categories"
                  :key="`priority-${index}`"
                >
                  <div class="flex justify-between items-center mb-2">
                    <label class="font-medium text-gray-800">
                      {{ category.name }}
                    </label>
                    <span class="text-sm font-medium">
                      {{ category.importance }}/5
                    </span>
                  </div>
                  <input
                    v-model.number="category.importance"
                    type="range"
                    min="1"
                    max="5"
                    class="w-full accent-indigo-600"
                  />
                  <div
                    class="flex justify-between text-xs text-gray-400 px-1 mt-1"
                  >
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="showPriorityModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  @click="savePriorities"
                  class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                >
                  Save Priorities
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Energy Rating Modal -->
      <Transition name="fade">
        <div
          v-if="showEnergyModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              @click="showEnergyModal = false"
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-4 text-indigo-800">
                Energy Assessment
              </h3>
              <p class="text-gray-600 mb-6">
                For each area, indicate whether it gives you energy or drains
                your energy
              </p>
              <div class="space-y-4">
                <div
                  v-for="(category, index) in categories"
                  :key="`energy-rate-${index}`"
                  class="p-4 border rounded-lg"
                >
                  <h4 class="font-medium mb-3">{{ category.name }}</h4>
                  <div class="flex gap-4">
                    <button
                      @click="category.energy = 'energizing'"
                      class="flex-1 py-2 px-3 rounded-lg border transition"
                      :class="{
                        'bg-emerald-100 border-emerald-300 text-emerald-800':
                          category.energy === 'energizing',
                        'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100':
                          category.energy !== 'energizing',
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 inline mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Energizing
                    </button>
                    <button
                      @click="category.energy = 'neutral'"
                      class="flex-1 py-2 px-3 rounded-lg border transition"
                      :class="{
                        'bg-gray-100 border-gray-300 text-gray-800':
                          category.energy === 'neutral',
                        'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100':
                          category.energy !== 'neutral',
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 inline mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                      Neutral
                    </button>
                    <button
                      @click="category.energy = 'draining'"
                      class="flex-1 py-2 px-3 rounded-lg border transition"
                      :class="{
                        'bg-rose-100 border-rose-300 text-rose-800':
                          category.energy === 'draining',
                        'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100':
                          category.energy !== 'draining',
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 inline mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      Draining
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="showEnergyModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  @click="saveEnergyRatings"
                  class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                >
                  Save Ratings
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getWheelOfLifeData,
  saveWheelOfLifeData,
} from "../../api/firebase/wheelOfLifeApi";

// Initialize Firebase
const auth = getAuth();
const firestore = getFirestore();

// Categories with enhanced properties
const categories = ref([
  {
    name: "Здоровье",
    score: 5,
    color: "#4F46E5",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Отношения",
    score: 5,
    color: "#10B981",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Карьера",
    score: 5,
    color: "#F59E0B",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Финансы",
    score: 5,
    color: "#EF4444",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Личностный рост",
    score: 5,
    color: "#8B5CF6",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Духовность",
    score: 5,
    color: "#EC4899",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Творчество",
    score: 5,
    color: "#14B8A6",
    importance: 3,
    energy: "neutral",
  },
  {
    name: "Отдых",
    score: 5,
    color: "#F97316",
    importance: 3,
    energy: "neutral",
  },
]);

const wheelCanvas = ref(null);
const historyCanvas = ref(null);
const showRecommendation = ref(false);
const recommendationTitle = ref("");
const recommendationText = ref("");
const lastSaved = ref(null);
const historyData = ref([]);
const showGoalModal = ref(false);
const showPriorityModal = ref(false);
const showEnergyModal = ref(false);
const newGoal = ref({
  category: "Здоровье",
  targetScore: 7,
  description: "",
});
const userGoals = ref([]);

// Computed properties
const lowScoreCategories = computed(() => {
  return categories.value
    .filter((c) => c.score <= 5)
    .sort((a, b) => a.score - b.score);
});

const energizingCategories = computed(() => {
  return categories.value.filter((c) => c.energy === "energizing");
});

const drainingCategories = computed(() => {
  return categories.value.filter((c) => c.energy === "draining");
});

const scoreClass = (score) => {
  if (score > 7) return "bg-green-100 text-green-800";
  if (score > 4) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getCategoryColor = (name) => {
  const category = categories.value.find((c) => c.name === name);
  return category ? category.color : "#6B7280";
};

const currentGoalProgress = (goal) => {
  const category = categories.value.find((c) => c.name === goal.category);
  if (!category) return 0;

  const current = category.score;
  const target = goal.targetScore;
  const min = Math.min(current, target);

  return (min - 1) / (target - 1); // Normalized progress
};

// Recommendations
const recommendations = {
  Здоровье: [
    "Составьте план правильного питания на неделю с упором на свежие продукты",
    "Добавьте 30-минутную прогулку в ежедневный распорядок",
    "Создайте ритуал для улучшения сна: отключите экраны за час до сна",
    "Запишитесь на профилактический осмотр к врачу в этом месяце",
    "Установите напоминание пить воду каждые 2 часа",
  ],
  Отношения: [
    "Запланируйте еженедельное 'свидание' с партнером без гаджетов",
    "Напишите письмо благодарности близкому человеку",
    "Инициируйте глубокий разговор о целях и мечтах с партнером",
    "Организуйте встречу с другом, с которым давно не виделись",
    "Начните практиковать активное слушание в разговорах с близкими",
  ],
  Карьера: [
    "Запишите 3 конкретные профессиональные цели на ближайшие 3 месяца",
    "Посвятите 1 час в день изучению нового навыка, полезного для карьеры",
    "Найдите ментора в вашей области и запланируйте регулярные встречи",
    "Создайте портфолио ваших профессиональных достижений",
    "Пройдите онлайн-курс для повышения квалификации",
  ],
  Финансы: [
    "Создайте детальный бюджет на следующий месяц с конкретными категориями",
    "Автоматизируйте ежемесячные сбережения через банковский счет",
    "Изучите основы инвестирования и выберите инструмент для начала",
    "Пересмотрите свои подписки и откажитесь от неиспользуемых сервисов",
    "Составьте финансовый план на год с учетом крупных расходов",
  ],
  "Личностный рост": [
    "Начните вести дневник рефлексии с ежедневными записями",
    "Выделите 20 минут в день на чтение книг по саморазвитию",
    "Поставьте себе вызов выйти из зоны комфорта в течение недели",
    "Пройдите онлайн-тест на определение личностных качеств и сильных сторон",
    "Составьте план персонального развития на ближайшие 6 месяцев",
  ],
  Духовность: [
    "Начните день с 10-минутной медитации, используя приложение-гид",
    "Выделите время на прогулку на природе без гаджетов",
    "Исследуйте практики осознанности и внедрите одну в ежедневный распорядок",
    "Записывайте моменты благодарности каждый вечер",
    "Прочитайте книгу о философии или духовных практиках",
  ],
  Творчество: [
    "Выделите 'творческий час' в своем еженедельном расписании",
    "Запишитесь на мастер-класс по новому творческому навыку",
    "Создайте коллекцию вдохновляющих идей и образов",
    "Начните творческий проект, который вы давно откладывали",
    "Установите еженедельную цель по созданию чего-то нового",
  ],
  Отдых: [
    "Блокируйте в календаре 'время для себя' как обязательные встречи",
    "Создайте список дел, которые вас по-настоящему расслабляют",
    "Запланируйте мини-путешествие на выходные",
    "Внедрите вечерний ритуал расслабления перед сном",
    "Практикуйте технику 'цифрового детокса' на один день в неделю",
  ],
};

const getRecommendationForCategory = (categoryName) => {
  const categoryRecs = recommendations[categoryName] || [];
  if (categoryRecs.length === 0) return "Нет рекомендаций";

  const category = categories.value.find((c) => c.name === categoryName);
  if (!category) return categoryRecs[0];

  const index = Math.min(
    Math.floor((10 - category.score) / 2),
    categoryRecs.length - 1
  );

  return categoryRecs[index];
};

// Draw animated wheel
const drawWheel = (animated = false) => {
  const canvas = wheelCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const segmentCount = categories.value.length;
  const segmentAngle = (2 * Math.PI) / segmentCount;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 2;
  ctx.stroke();

  categories.value.forEach((category, index) => {
    const startAngle = index * segmentAngle - Math.PI / 2;
    const endAngle = (index + 1) * segmentAngle - Math.PI / 2;

    for (let i = 1; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 10) * i, 0, 2 * Math.PI);
      ctx.strokeStyle = i % 2 === 0 ? "#e5e7eb" : "#f3f4f6";
      ctx.lineWidth = i % 5 === 0 ? 1 : 0.5;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = `${category.color}10`;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(startAngle) * radius,
      centerY + Math.sin(startAngle) * radius
    );
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();

    let scoreToRender = category.score;
    if (animated) {
      scoreToRender = 1;
      const animateScore = () => {
        if (scoreToRender < category.score) {
          scoreToRender += 0.1;
          drawSegmentScore(
            category,
            index,
            scoreToRender,
            centerX,
            centerY,
            radius,
            segmentAngle,
            ctx
          );
          requestAnimationFrame(animateScore);
        } else {
          drawSegmentScore(
            category,
            index,
            category.score,
            centerX,
            centerY,
            radius,
            segmentAngle,
            ctx
          );
        }
      };
      setTimeout(() => {
        animateScore();
      }, index * 100);
    } else {
      drawSegmentScore(
        category,
        index,
        scoreToRender,
        centerX,
        centerY,
        radius,
        segmentAngle,
        ctx
      );
    }

    const textAngle = startAngle + segmentAngle / 2;
    const textRadius = radius + 30;
    const textX = centerX + Math.cos(textAngle) * textRadius;
    const textY = centerY + Math.sin(textAngle) * textRadius;

    ctx.save();
    ctx.translate(textX, textY);
    let rotation = textAngle;
    if (textAngle > Math.PI / 2 && textAngle < (3 * Math.PI) / 2) {
      rotation += Math.PI;
    }
    ctx.rotate(rotation);
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#374151";
    ctx.fillText(category.name, 0, 0);
    ctx.restore();
  });

  showRecommendation.value = lowScoreCategories.value.length > 0;
  if (lowScoreCategories.value.length > 0) {
    const lowestCategory = lowScoreCategories.value[0];
    recommendationTitle.value = `Совет для "${lowestCategory.name}"`;
    recommendationText.value = getRecommendationForCategory(
      lowestCategory.name
    );
  }
};

const drawSegmentScore = (
  category,
  index,
  score,
  centerX,
  centerY,
  radius,
  segmentAngle,
  ctx
) => {
  const startAngle = index * segmentAngle - Math.PI / 2;
  const endAngle = (index + 1) * segmentAngle - Math.PI / 2;
  const scoreRadius = radius * (score / 10);

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, scoreRadius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = category.color;
  ctx.fill();

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    scoreRadius
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, scoreRadius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
};

// Draw history chart
const drawHistoryChart = () => {
  if (historyData.value.length <= 1 || !historyCanvas.value) return;

  const canvas = historyCanvas.value;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;
  ctx.stroke();

  for (let i = 0; i <= 10; i += 2) {
    const y = canvas.height - padding - (i / 10) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding - 5, y);
    ctx.lineTo(padding, y);
    ctx.strokeStyle = "#9ca3af";
    ctx.stroke();
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(i.toString(), padding - 10, y);
  }

  const entryCount = historyData.value.length;
  const xStep = chartWidth / (entryCount - 1);

  categories.value.forEach((category) => {
    ctx.beginPath();
    historyData.value.forEach((entry, index) => {
      const categoryData = entry.categories.find(
        (c) => c.name === category.name
      );
      if (!categoryData) return;
      const x = padding + index * xStep;
      const y =
        canvas.height - padding - (categoryData.score / 10) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = category.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    historyData.value.forEach((entry, index) => {
      const categoryData = entry.categories.find(
        (c) => c.name === category.name
      );
      if (!categoryData) return;
      const x = padding + index * xStep;
      const y =
        canvas.height - padding - (categoryData.score / 10) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = category.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  });

  historyData.value.forEach((entry, index) => {
    const x = padding + index * xStep;
    ctx.beginPath();
    ctx.moveTo(x, canvas.height - padding);
    ctx.lineTo(x, canvas.height - padding + 5);
    ctx.strokeStyle = "#9ca3af";
    ctx.stroke();
    const date = new Date(entry.timestamp);
    const dateLabel = `${date.getDate()}.${date.getMonth() + 1}`;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(dateLabel, x, canvas.height - padding + 10);
  });

  const legendY = padding / 2;
  let legendX = padding;
  categories.value.forEach((category) => {
    ctx.fillStyle = category.color;
    ctx.fillRect(legendX, legendY - 5, 10, 10);
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4b5563";
    ctx.fillText(category.name, legendX + 15, legendY);
    legendX += ctx.measureText(category.name).width + 30;
  });
};

// Update wheel visualization
const updateWheel = () => {
  drawWheel();
};

// Set score for specific category
const setCategoryScore = (name, score) => {
  const category = categories.value.find((c) => c.name === name);
  if (category) {
    category.score = Math.max(1, Math.min(10, score));
    updateWheel();
  }
};

// Add goal and save to Firebase
const addGoal = async () => {
  if (!newGoal.value.category || newGoal.value.targetScore < 1) return;

  userGoals.value.push({
    ...newGoal.value,
    id: Date.now(),
  });

  newGoal.value = {
    category: "Здоровье",
    targetScore: 7,
    description: "",
  };

  showGoalModal.value = false;
  await saveToFirebase();
};

// Save priorities and update Firebase
const savePriorities = async () => {
  showPriorityModal.value = false;
  await saveToFirebase();
};

// Save energy ratings and update Firebase
const saveEnergyRatings = async () => {
  showEnergyModal.value = false;
  await saveToFirebase();
};

// Save results to Firebase with history tracking
const saveResults = async () => {
  const now = new Date();
  lastSaved.value = now.toLocaleString();

  const historyEntry = {
    timestamp: now.getTime(),
    categories: JSON.parse(JSON.stringify(categories.value)),
    dateFormatted: lastSaved.value,
  };

  historyData.value.push(historyEntry);
  if (historyData.value.length > 10) {
    historyData.value = historyData.value.slice(-10);
  }

  const result = await saveWheelOfLifeData(
    firestore,
    auth.currentUser?.uid,
    categories.value,
    userGoals.value,
    historyData.value,
    (message, type) => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: type,
        title: message,
      });
    }
  );

  if (result && result.success) {
    drawHistoryChart();
  } else {
    console.error(
      "Failed to save results:",
      result?.message || "No result returned"
    );
  }
};

// Load saved data from Firebase
const loadSavedData = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const result = await getWheelOfLifeData(firestore, userId);
  if (result.success) {
    const {
      categories: savedCategories,
      lastSaved: savedLastSaved,
      goals,
      history,
    } = result.data;

    savedCategories?.forEach((savedCategory) => {
      const category = categories.value.find(
        (c) => c.name === savedCategory.name
      );
      if (category) {
        category.score = savedCategory.score ?? 5;
        category.importance = savedCategory.importance ?? 3;
        category.energy = savedCategory.energy ?? "neutral";
      }
    });

    lastSaved.value = savedLastSaved;
    userGoals.value = goals || [];
    historyData.value = history || [];
  }
};

// Save to Firebase
const saveToFirebase = async () => {
  const result = await saveWheelOfLifeData(
    firestore,
    auth.currentUser?.uid,
    categories.value,
    userGoals.value,
    historyData.value,
    (message, type) => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: type,
        title: message,
      });
    }
  );
  if (result.success) {
    lastSaved.value = new Date().toLocaleString();
  }
};

// Watch for recommendation changes
watch(
  () => lowScoreCategories.value,
  (newVal) => {
    showRecommendation.value = newVal.length > 0;
    if (newVal.length > 0) {
      const lowestCategory = newVal[0];
      recommendationTitle.value = `Совет для "${lowestCategory.name}"`;
      recommendationText.value = getRecommendationForCategory(
        lowestCategory.name
      );
    }
  },
  { deep: true }
);

// Initialize
onMounted(async () => {
  if (typeof window !== "undefined" && !window.Swal) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);
  }

  const canvas = wheelCanvas.value;
  if (canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  const histCanvas = historyCanvas.value;
  if (histCanvas) {
    histCanvas.width = histCanvas.offsetWidth;
    histCanvas.height = histCanvas.offsetHeight;
  }

  await loadSavedData();
  drawWheel(true);
  setTimeout(() => {
    drawHistoryChart();
  }, 500);

  window.addEventListener("resize", () => {
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawWheel();
    }
    if (histCanvas) {
      histCanvas.width = histCanvas.offsetWidth;
      histCanvas.height = histCanvas.offsetHeight;
      drawHistoryChart();
    }
  });
});
</script>

<style scoped>
/* Custom range slider */
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #4f46e5;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #4f46e5;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
