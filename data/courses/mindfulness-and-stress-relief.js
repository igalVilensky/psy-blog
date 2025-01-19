const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-я\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const course = {
  id: "course_2",
  slug: "mindfulness-and-stress-relief", // Unique slug for the course
  title: "Осознанность и снятие стресса",
  description:
    "Научитесь техникам осознанности и управления стрессом через 2 урока. Практические упражнения помогут вам обрести внутренний покой и улучшить качество жизни.",
  price: 8900,
  hasPractical: false,
  category: "Саморазвитие",
  image: "loveyourself.webp", // Path to the image
  // Lessons are now nested inside the course object
  lessons: [
    {
      number: 1,
      title: "Введение в осознанность",
      description:
        "Осознанность — это практика присутствия в текущем моменте. Узнайте, как она помогает снизить стресс и улучшить концентрацию.",
      videoUrl: "https://youtu.be/ZToicYcHIOU",
      duration: "20 минут",
      slug: generateSlug("Введение в осознанность"),
    },
    {
      number: 2,
      title: "Техники снятия стресса",
      description:
        "Практические упражнения для снятия стресса, включая дыхательные техники и медитацию.",
      videoUrl: "https://youtu.be/86m4RC_ADEY",
      duration: "25 минут",
      slug: generateSlug("Техники снятия стресса"),
    },
  ],
  modules: [
    {
      id: 1,
      title: "Основы и теория",
      description:
        "Базовые концепции детских травм и их влияние на развитие личности",
      icon: "fas fa-book",
    },
    {
      id: 2,
      title: "Типы травм",
      description:
        "Исследование различных видов травм и их специфических проявлений",
      icon: "fas fa-brain",
    },
    {
      id: 3,
      title: "Практика исцеления",
      description: "Техники и методики для проработки и исцеления травм",
      icon: "fas fa-heart",
    },
    {
      id: 4,
      title: "Интеграция",
      description: "Применение полученных знаний в повседневной жизни",
      icon: "fas fa-puzzle-piece",
    },
    {
      id: 5,
      title: "Отношения",
      description: "Влияние травм на построение здоровых отношений",
      icon: "fas fa-users",
    },
    {
      id: 6,
      title: "Самоподдержка",
      description: "Инструменты для поддержания долгосрочных результатов",
      icon: "fas fa-seedling",
    },
  ],

  // Calculate total duration of the course
  get duration() {
    const totalMinutes = this.lessons.reduce((sum, lesson) => {
      const durationValue = parseInt(lesson.duration);
      return sum + durationValue;
    }, 0);
    return Math.round(totalMinutes / 60); // Convert total minutes to hours
  },

  // Total number of lessons
  get lessonsCount() {
    return this.lessons.length;
  },
};
