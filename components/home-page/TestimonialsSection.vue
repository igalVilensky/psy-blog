<template>
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-white mb-12">Отзывы</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="p-6 bg-gray-800 rounded-xl"
        >
          <p class="text-gray-300 mb-4 italic">"{{ testimonial.text }}"</p>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
            <div>
              <div class="font-semibold text-white">
                {{ testimonial.name }}
              </div>
              <div class="text-sm text-blue-400">
                {{ testimonial.course }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = ref([
  {
    name: "Анна К.",
    course: 'Курс "Эмоциональный интеллект"',
    text: "Этот курс полностью изменил мое понимание эмоций и помог улучшить отношения с близкими.",
  },
  {
    name: "Михаил П.",
    course: 'Тренинг "Личная эффективность"',
    text: "Благодаря курсу я научился правильно ставить цели и достигать их. Мотивация и продуктивность значительно выросли.",
  },
  {
    name: "Елена С.",
    course: "Курс по отношениям",
    text: "Глубокие инсайты и практические техники помогли мне лучше понять себя и построить здоровые отношения.",
  },
]);
</script>
