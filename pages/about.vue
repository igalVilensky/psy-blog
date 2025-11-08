<template>
  <!-- About Page with Professional Layout, no scroll effect -->
  <div class="max-w-6xl mx-auto min-h-screen text-white">
    <!-- Animated Header Banner -->
    <header class="relative overflow-hidden pt-16 sm:pt-24">
      <div class="container mx-auto px-6 sm:px-0 relative z-10">
        <section ref="missionSection" class="mb-24">
          <div class="relative">
            <div
              class="relative bg-[#1E293B]/70 backdrop-blur-xl rounded-2xl border border-[#00E6FF]/20 p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,230,255,0.2)]"
            >
              <div class="max-w-4xl mx-auto text-center">
                <h1
                  ref="mainTitle"
                  class="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00E6FF] to-[#70FF94] mb-6"
                >
                  mindQlab
                </h1>
              </div>
              <p
                class="text-lg text-slate-300 max-w-6xl mx-auto leading-relaxed"
              >
                mindQlab — это платформа осознанного развития, вдохновленная
                древней мудростью Каббалы и современной психологией. Наше Древо
                Себя из 10 Сефирот, организованных в три колонны (Огонь, Вода,
                Воздух), помогает вам пройти Путь Целостности — 10-недельное
                путешествие от высшего Я (Кетер) к воплощению (Малхут). Система
                прогресса отслеживает ежедневные достижения, награждает баллами
                и уровнями, поддерживая баланс колонн через Энергию Дня.
              </p>
            </div>
          </div>
        </section>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 pb-24">
      <!-- Mission Section -->

      <!-- Approach Section with Tree Visualization -->
      <section ref="approachSection" class="mb-24">
        <h2
          class="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF4DFF] to-[#FF9E00] mb-12"
        >
          Наш подход: Древо Себя
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Tree Visualization -->
          <div class="lg:col-span-2 order-2 lg:order-1">
            <div
              ref="treeCard"
              class="relative bg-[#1A1F35]/60 backdrop-blur-xl rounded-2xl p-6 border border-[#00E6FF]/20 h-full flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,230,255,0.3)]"
            >
              <div class="aspect-square w-full max-w-md mx-auto">
                <img
                  src="/assets/images/tree.png"
                  alt="Древо Себя"
                  class="w-full h-full object-contain rounded-xl"
                />
              </div>
              <p class="text-sm text-slate-300 text-center">
                Интерактивное Древо Себя с тремя колоннами
              </p>
            </div>
          </div>

          <!-- Approach Features -->
          <div class="lg:col-span-3 order-1 lg:order-2">
            <div
              ref="featuresCard"
              class="bg-[#1A1F35]/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF4DFF]/20 h-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,255,0.3)]"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div
                  v-for="(feature, index) in features"
                  :key="index"
                  ref="featureItems"
                  class="relative"
                >
                  <div class="flex gap-4 items-start">
                    <div
                      class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"
                      :class="getFeatureIconClass(index)"
                    >
                      <i :class="feature.icon" class="text-xl"></i>
                    </div>
                    <div>
                      <h3
                        class="text-lg font-semibold mb-2"
                        :class="getFeatureTextClass(index)"
                      >
                        {{ feature.title }}
                      </h3>
                      <p class="text-slate-300">
                        {{ feature.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section ref="teamSection" class="mb-24">
        <h2
          class="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF4DFF] to-[#FF9E00] mb-12"
        >
          Наша команда
        </h2>

        <div ref="teamCards" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Team Member 1 -->
          <div
            class="group bg-[#1E293B]/60 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,230,255,0.3)] border border-[#00E6FF]/20"
          >
            <div class="relative h-44 overflow-hidden">
              <div class="absolute bottom-0 left-6">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Анастасия Гельмут"
                  class="w-32 h-32 z-20 rounded-full border-4 border-[#1E293B] object-cover shadow-lg transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-semibold text-[#00E6FF] mb-1">
                Анастасия Гельмут
              </h3>
              <p class="text-sm text-[#FF4DFF] font-medium mb-4">
                Руководитель по психологии и контенту
              </p>
              <p class="text-slate-300 mb-6">
                Анастасия создает психологическую основу Inner Compass,
                объединяя современные методики и каббалистическую мудрость.
              </p>
              <div class="flex gap-4">
                <a
                  href="#"
                  class="group relative p-2 rounded-lg hover:bg-[#FF4DFF]/10 transition-all duration-300"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <i
                    class="fab fa-linkedin text-lg text-[#FF4DFF] group-hover:scale-110 transition-all duration-300"
                  ></i>
                </a>
                <a
                  href="#"
                  class="group relative p-2 rounded-lg hover:bg-[#FF4DFF]/10 transition-all duration-300"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <i
                    class="fab fa-instagram text-lg text-[#FF4DFF] group-hover:scale-110 transition-all duration-300"
                  ></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div
            class="group bg-[#1E293B]/60 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] border border-[#FFD700]/20"
          >
            <div class="relative h-44 overflow-hidden">
              <div class="absolute bottom-0 left-6">
                <img
                  src="/assets/images/igal.avif"
                  alt="Игаль Виленский"
                  class="w-32 h-32 rounded-full border-4 border-[#1E293B] object-cover shadow-lg transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-semibold text-[#FFD700] mb-1">
                Игаль Виленский
              </h3>
              <p class="text-sm text-[#FF9E00] font-medium mb-4">
                Технический руководитель
              </p>
              <p class="text-slate-300 mb-6">
                Игаль отвечает за техническую реализацию Inner Compass, включая
                интерактивное Древо Себя и интеграции.
              </p>
              <div class="flex gap-4">
                <a
                  href="#"
                  class="group relative p-2 rounded-lg hover:bg-[#FF9E00]/10 transition-all duration-300"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <i
                    class="fab fa-linkedin text-lg text-[#FF9E00] group-hover:scale-110 transition-all duration-300"
                  ></i>
                </a>
                <a
                  href="#"
                  class="group relative p-2 rounded-lg hover:bg-[#FF9E00]/10 transition-all duration-300"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <i
                    class="fab fa-github text-lg text-[#FF9E00] group-hover:scale-110 transition-all duration-300"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section ref="ctaSection">
        <div class="relative max-w-4xl mx-auto">
          <div
            class="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-[#00E6FF]/10 to-[#70FF94]/10 rounded-2xl blur-lg"
          ></div>
          <div
            class="relative bg-gradient-to-b from-[#1A1F35]/80 to-[#1E293B]/80 backdrop-blur-xl rounded-2xl border border-[#70FF94]/20 p-10 sm:p-12 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(112,255,148,0.3)]"
          >
            <h2
              class="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00E6FF] to-[#70FF94] mb-6"
            >
              Начните свое путешествие к целостности
            </h2>
            <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к Inner Compass, чтобы открыть свой потенциал
              через Древо Себя и наше поддерживающее сообщество.
            </p>
            <Button
              to="/"
              text="Исследовать Древо Себя"
              iconClass="fas fa-tree"
              gradientStart="#00E6FF"
              gradientEnd="#70FF94"
              textColor="#FFF"
              customClass="bg-gradient-to-r from-[#00E6FF] to-[#70FF94] hover:shadow-lg hover:shadow-[#00E6FF]/20 border-[#FFF] px-6 py-3 text-base"
              :isLink="true"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import Button from "~/components/base/Button.vue";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const features = [
  {
    title: "Три колонны",
    description:
      "Древо Себя делит 10 Сефирот на три колонны: Огонь (Действие), Вода (Рефлексия), Воздух (Гармония).",
    icon: "fas fa-columns",
  },
  {
    title: "Путь Целостности",
    description:
      "10-недельное путешествие от Кетер (Высшее Я) к Малхут (Воплощение).",
    icon: "fas fa-road",
  },
  {
    title: "Динамический прогресс",
    description:
      "Отслеживайте ежедневные достижения, зарабатывайте баллы, повышайте уровни.",
    icon: "fas fa-chart-line",
  },
  {
    title: "Геймификация",
    description:
      "Выбирайте Энергию Дня, получайте значки за уровни и соревнуйтесь.",
    icon: "fas fa-trophy",
  },
];

// Refs for animations
const headerGlow = ref(null);
const mainTitle = ref(null);
const missionSection = ref(null);
const approachSection = ref(null);
const treeCard = ref(null);
const featuresCard = ref(null);
const featureItems = ref([]);
const teamSection = ref(null);
const teamCards = ref(null);
const ctaSection = ref(null);

const getFeatureIconClass = (index) => {
  const classes = [
    "bg-[#00E6FF]/10 text-[#00E6FF]",
    "bg-[#FF4DFF]/10 text-[#FF4DFF]",
    "bg-[#FF9E00]/10 text-[#FF9E00]",
    "bg-[#70FF94]/10 text-[#70FF94]",
  ];
  return classes[index % 4];
};

const getFeatureTextClass = (index) => {
  const classes = [
    "text-[#00E6FF]",
    "text-[#FF4DFF]",
    "text-[#FF9E00]",
    "text-[#70FF94]",
  ];
  return classes[index % 4];
};

onMounted(() => {
  // Subtle header glow animation
  gsap.to(headerGlow.value, {
    x: "10%",
    y: "5%",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Title animation
  gsap.from(mainTitle.value, {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Scroll-triggered animations using GSAP
  const createScrollTrigger = (elements, animationProps) => {
    if (!elements) return;

    const isArray = Array.isArray(elements);
    const targets = isArray ? elements : [elements];

    targets.forEach((target, index) => {
      if (!target) return;

      gsap.from(target, {
        ...animationProps,
        delay: isArray ? index * 0.1 : 0,
        scrollTrigger: {
          trigger: target,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none none",
        },
      });
    });
  };

  // Mission section animation
  createScrollTrigger(missionSection.value, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Approach section animations
  createScrollTrigger(treeCard.value, {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  createScrollTrigger(featuresCard.value, {
    x: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  createScrollTrigger(featureItems.value, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  });

  // Team section animation
  createScrollTrigger(teamCards.value && teamCards.value.children, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.2)",
  });

  // CTA section animation
  createScrollTrigger(ctaSection.value, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
