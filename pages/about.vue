<template>
  <div class="relative w-full bg-[#1A1F35]">
    <!-- Scroll Progress Indicator -->
    <div
      class="fixed top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col items-center gap-2 md:gap-3"
    >
      <button
        v-for="i in totalSections"
        :key="i"
        @click="scrollToSection(i - 1)"
        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer"
        :class="
          currentSection === i - 1
            ? 'bg-[#00E6FF] scale-125'
            : 'bg-slate-600/50'
        "
        :aria-label="`Navigate to section ${i}`"
      />
    </div>

    <!-- Main Scroll Container -->
    <div
      ref="sectionsContainer"
      class="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
    >
      <!-- Section 1: Mission Text -->
      <section
        ref="section1"
        class="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 py-12 md:py-16 px-4 sm:px-6"
      >
        <div class="container mx-auto max-w-6xl">
          <h2
            class="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00E6FF] to-[#70FF94] tracking-tight mb-8 md:mb-12"
          >
            Наша миссия
          </h2>
          <div
            class="backdrop-blur-xl rounded-2xl border border-[#00E6FF]/20 p-6 sm:p-8 md:p-12 hover:shadow-[0_0_20px_5px_rgba(0,230,255,0.3)] transition-all duration-300"
          >
            <div class="text-center">
              <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
                Inner Compass — это платформа осознанного развития,
                вдохновленная древней мудростью Каббалы и современной
                психологией. Наше Древо Себя из 10 Сефирот, организованных в три
                колонны (Огонь, Вода, Воздух), помогает вам пройти Путь
                Целостности — 10-недельное путешествие от высшего Я (Кетер) к
                воплощению (Малхут). Система прогресса отслеживает ежедневные
                достижения, награждает баллами и уровнями, поддерживая баланс
                колонн через Энергию Дня.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Team -->
      <section
        ref="section2"
        class="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-[#1E293B]/60 to-[#1E293B]/80 py-12 md:py-16 px-4 sm:px-6"
      >
        <div class="container mx-auto max-w-6xl">
          <h2
            class="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF4DFF] to-[#FF9E00] tracking-tight mb-8 md:mb-12"
          >
            Наша команда
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <!-- Team Member 1 -->
            <div
              class="group relative bg-[#1E293B]/60 backdrop-blur-xl rounded-xl p-6 border border-[#00E6FF]/20 hover:shadow-[0_0_20px_5px_rgba(0,230,255,0.3)] transition-all duration-300"
            >
              <div
                class="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start"
              >
                <img
                  src="/assets/images/profile.jpg"
                  alt="Team Member"
                  class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg group-hover:-translate-y-2 transition-all duration-500"
                />
                <div class="space-y-3 text-center sm:text-left">
                  <h3 class="text-lg md:text-xl font-semibold text-[#00E6FF]">
                    Анастасия Гельмут
                  </h3>
                  <p class="text-sm text-[#FF4DFF] font-medium">
                    Руководитель по психологии и контенту
                  </p>
                  <p class="text-slate-300 text-sm">
                    Анастасия создает психологическую основу Inner Compass,
                    объединяя современные методики и каббалистическую мудрость.
                  </p>
                  <div class="flex gap-4 justify-center sm:justify-start">
                    <a
                      href="#"
                      class="group relative p-2"
                      target="_blank"
                      aria-label="LinkedIn"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-[#FF4DFF]/20 to-[#00E6FF]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      <i
                        class="fab fa-linkedin text-lg relative z-10 text-[#FF4DFF] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                      ></i>
                    </a>
                    <a
                      href="#"
                      class="group relative p-2"
                      target="_blank"
                      aria-label="Instagram"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-[#FF4DFF]/20 to-[#00E6FF]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      <i
                        class="fab fa-instagram text-lg relative z-10 text-[#FF4DFF] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Team Member 2 -->
            <div
              class="group relative bg-[#1E293B]/60 backdrop-blur-xl rounded-xl p-6 border border-[#FFD700]/20 hover:shadow-[0_0_20px_5px_rgba(255,215,0,0.3)] transition-all duration-300"
            >
              <div
                class="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start"
              >
                <img
                  src="/assets/images/igal.avif"
                  alt="Team Member"
                  class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg group-hover:-translate-y-2 transition-all duration-500"
                />
                <div class="space-y-3 text-center sm:text-left">
                  <h3 class="text-lg md:text-xl font-semibold text-[#FFD700]">
                    Игаль Виленский
                  </h3>
                  <p class="text-sm text-[#FF9E00] font-medium">
                    Технический руководитель
                  </p>
                  <p class="text-slate-300 text-sm">
                    Игаль отвечает за техническую реализацию Inner Compass,
                    включая интерактивное Древо Себя и интеграции.
                  </p>
                  <div class="flex gap-4 justify-center sm:justify-start">
                    <a
                      href="#"
                      class="group relative p-2"
                      target="_blank"
                      aria-label="LinkedIn"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-[#FF9E00]/20 to-[#FFD700]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      <i
                        class="fab fa-linkedin text-lg relative z-10 text-[#FF9E00] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                      ></i>
                    </a>
                    <a
                      href="#"
                      class="group relative p-2"
                      target="_blank"
                      aria-label="GitHub"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-[#FF9E00]/20 to-[#FFD700]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      <i
                        class="fab fa-github text-lg relative z-10 text-[#FF9E00] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Approach -->
      <section
        ref="section3"
        class="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-[#1E293B]/80 to-[#00E6FF]/20 py-16 px-4 sm:px-6"
      >
        <div class="container mx-auto max-w-6xl">
          <h2
            class="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF4DFF] to-[#FF9E00] tracking-tight mb-8 md:mb-12"
          >
            Наш подход: Древо Себя
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Tree Visualization -->
            <div
              class="relative bg-[#1A1F35]/40 backdrop-blur-xl rounded-2xl p-6 border border-[#00E6FF]/20 hover:shadow-[0_0_20px_5px_rgba(0,230,255,0.3)] transition-all duration-300"
            >
              <img
                src="/assets/images/tree.png"
                alt="Древо Себя"
                class="w-full h-48 sm:h-64 md:h-80 object-contain rounded-xl"
              />
              <p class="text-sm text-slate-300 text-center mt-4">
                Интерактивное Древо Себя с тремя колоннами
              </p>
            </div>

            <!-- Approach Details -->
            <div
              class="space-y-6 bg-[#1A1F35]/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF4DFF]/20 hover:shadow-[0_0_20px_5px_rgba(255,77,255,0.3)] transition-all duration-300"
            >
              <div
                v-for="(feature, index) in features"
                :key="feature.title"
                class="flex items-start gap-4"
              >
                <div
                  class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-xl"
                  :class="getFeatureIconClass(index)"
                >
                  <i :class="feature.icon" class="text-base md:text-xl"></i>
                </div>
                <div>
                  <h3
                    class="text-base md:text-lg font-semibold"
                    :class="getFeatureTextClass(index)"
                  >
                    {{ feature.title }}
                  </h3>
                  <p class="text-slate-300 text-sm">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: CTA -->
      <section
        ref="section4"
        class="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-[#1E293B]/90 to-[#70FF94]/10 py-16 px-4 sm:px-6"
      >
        <div class="container mx-auto max-w-4xl text-center">
          <div
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#70FF94]/20 p-6 sm:p-8 md:p-12 hover:shadow-[0_0_20px_5px_rgba(112,255,148,0.3)] transition-all duration-300"
          >
            <h2
              class="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00E6FF] to-[#70FF94] tracking-tight mb-6"
            >
              Начните свое путешествие к целостности
            </h2>
            <p
              class="text-base sm:text-lg text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto"
            >
              Присоединяйтесь к Inner Compass, чтобы открыть свой потенциал
              через Древо Себя и наше поддерживающее сообщество.
            </p>
            <Button
              to="/tree-of-self"
              text="Исследовать Древо Себя"
              iconClass="fas fa-tree"
              gradientStart="#00E6FF"
              gradientEnd="#70FF94"
              textColor="#FFF"
              customClass="bg-gradient-to-r from-[#00E6FF] to-[#70FF94] border-[#FFF] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
              :isLink="true"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Button from "~/components/base/Button.vue";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

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
    icon: "fas fa-path",
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

const currentSection = ref(0);
const totalSections = 4; // Updated to 4 sections
const sectionsContainer = ref(null);
const section1 = ref(null);
const section2 = ref(null);
const section3 = ref(null);
const section4 = ref(null);

const scrollToSection = (index) => {
  if (index >= 0 && index < totalSections) {
    currentSection.value = index;
    const section = [
      section1.value,
      section2.value,
      section3.value,
      section4.value,
    ][index];
    if (section) {
      gsap.to(sectionsContainer.value, {
        duration: 0.8,
        scrollTo: {
          y: section,
          autoKill: false,
          offsetY: 20, // Small offset to account for headers
        },
        ease: "power2.inOut",
      });
    }
  }
};

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
  const container = sectionsContainer.value;

  if (container) {
    // Improved scroll detection with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = [
              section1.value,
              section2.value,
              section3.value,
              section4.value,
            ].indexOf(entry.target);
            if (index !== -1) {
              currentSection.value = index;
            }
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.9],
        root: container,
      }
    );

    [section1.value, section2.value, section3.value, section4.value].forEach(
      (section) => {
        if (section) observer.observe(section);
      }
    );

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(Math.min(currentSection.value + 1, totalSections - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(Math.max(currentSection.value - 1, 0));
      }
    });

    // Handle wheel events for smoother scrolling
    let lastScrollTime = 0;
    const scrollCooldown = 800;

    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime > scrollCooldown) {
          const direction = e.deltaY > 0 ? 1 : -1;
          const newSection = Math.max(
            0,
            Math.min(totalSections - 1, currentSection.value + direction)
          );
          if (newSection !== currentSection.value) {
            scrollToSection(newSection);
            lastScrollTime = now;
          }
        }
      },
      { passive: false }
    );
  }
});
</script>
