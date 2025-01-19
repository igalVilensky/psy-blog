const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-я\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const course2 = {
  id: "course_2",
  slug: "mindfulness-and-stress-relief", // Unique slug for the course
  title: "Осознанность и снятие стресса",
  description:
    "Научитесь техникам осознанности и управления стрессом через 2 урока. Практические упражнения помогут вам обрести внутренний покой и улучшить качество жизни.",
  price: 8900,
  hasPractical: false,
  category: "Саморазвитие",
  image: "mindfulness.webp", // Path to the image
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
