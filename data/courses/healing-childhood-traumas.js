const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-я\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const course = {
  id: "course_1",
  slug: "healing-childhood-traumas", // Unique slug for the course
  title: "Исцеление детских травм",
  description:
    "Исследуйте и исцелите свои детские травмы через 21 урок, включая теоретические и практические задания. Узнайте, как травмы влияют на вашу жизнь, и научитесь их преодолевать.",
  price: 4900,
  hasPractical: true,
  category: "Саморазвитие",
  image: "loveyourself.webp", // Path to the image
  // Lessons are now nested inside the course object
  lessons: [
    {
      number: 1,
      title: "Что такое детская травма и как происходит исцеление",
      description:
        "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я. Человек ведет себя так, как от него хотят, и постепенно этот тип поведения начинает определять все его поступки и помыслы.",
      videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
      duration: "33 минуты",
      slug: generateSlug("Что такое детская травма и как происходит исцеление"),
    },
    {
      number: 2,
      title: "Перенос",
      description:
        "Перенос — феномен в психодинамической психологии, заключающийся в бессознательном перемещении ранее пережитых (особенно в детстве) чувств и отношений, проявлявшихся к одному лицу, совсем на другое лицо.",
      videoUrl: "https://youtu.be/67tTcO8dr2w",
      duration: "14 минут",
      slug: generateSlug("Перенос"),
    },
    {
      number: 3,
      title: "Запреты, которые вам транслировали родители",
      description: "Первый запрет — «Не живи», «не чувствуй».",
      videoUrl: "https://youtu.be/FeF4PsSZVL4",
      duration: "20 минут",
      slug: generateSlug("Запреты, которые вам транслировали родители"),
    },
    {
      number: 4,
      title: "Второй запрет — «Не будь ребёнком»",
      description: "Исследование влияния второго запрета на развитие личности.",
      videoUrl: "https://youtu.be/6RHGk8XHOJc",
      duration: "38 минут",
      slug: generateSlug("Второй запрет — «Не будь ребёнком»"),
    },
    {
      number: 5,
      title: "Травма Отверженности или «Не бросай меня»",
      description:
        "Исследование травмы отверженности и ее влияния на формирование личности.",
      videoUrl: "https://youtu.be/76HU8Tc-1gE",
      duration: "33 минуты",
      slug: generateSlug("Травма Отверженности или «Не бросай меня»"),
    },
    {
      number: 6,
      title: "Травма недоверия и жестокого обращения «Я тебе не доверяю»",
      description:
        "Анализ травмы недоверия и ее последствий для межличностных отношений.",
      videoUrl: "https://youtu.be/dDD_O_Fmgpo",
      duration: "39 минут",
      slug: generateSlug(
        "Травма недоверия и жестокого обращения «Я тебе не доверяю»"
      ),
    },
    {
      number: 7,
      title: "Травма Эмоциональной депривации, «Меня никогда не полюбят»",
      description:
        "Изучение травмы эмоциональной депривации и ее влияния на самооценку и отношения.",
      videoUrl: "https://youtu.be/_1T6zCGxfEs",
      duration: "33 минуты",
      slug: generateSlug(
        "Травма Эмоциональной депривации, «Меня никогда не полюбят»"
      ),
    },
    {
      number: 8,
      title: "«Я не такой, как все». Травма Изгнания из общества",
      description:
        "Исследование травмы изгнания из общества и ее влияния на социальную адаптацию.",
      videoUrl: "https://youtu.be/CSJSYUTrAV0",
      duration: "28 минут",
      slug: generateSlug("«Я не такой, как все». Травма Изгнания из общества"),
    },
    {
      number: 9,
      title: "«Я сам не справлюсь». Травма Зависимости",
      description:
        "Анализ травмы зависимости и ее влияния на формирование самостоятельности.",
      videoUrl: "https://youtu.be/SbQduqTp4wc",
      duration: "35 минут",
      slug: generateSlug("«Я сам не справлюсь». Травма Зависимости"),
    },
    {
      number: 10,
      title: "«Вот-вот случится беда». Травма Уязвимости",
      description:
        "Изучение травмы уязвимости и ее влияния на восприятие мира и себя.",
      videoUrl: "https://youtu.be/pl-iEP8Qh_c",
      duration: "31 минута",
      slug: generateSlug("«Вот-вот случится беда». Травма Уязвимости"),
    },
    {
      number: 11,
      title: "«Я никуда не гожусь». Травма Неполноценности",
      description:
        "Исследование травмы неполноценности и ее влияния на самооценку и поведение.",
      videoUrl: "https://youtu.be/dDhmDl6i_xo",
      duration: "30 минут",
      slug: generateSlug("«Я никуда не гожусь». Травма Неполноценности"),
    },
    {
      number: 12,
      title: "«Я чувствую себя неудачником». Травма Несостоятельности",
      description:
        "Изучение травмы несостоятельности и ее влияния на мотивацию и достижения.",
      videoUrl: "https://youtu.be/7YdoSq4a8l0",
      duration: "30 минут",
      slug: generateSlug(
        "«Я чувствую себя неудачником». Травма Несостоятельности"
      ),
    },
    {
      number: 13,
      title: "«Я всё делаю по-твоему!» Травма Покорности",
      description:
        "Анализ травмы покорности и ее влияния на принятие решений и личные границы.",
      videoUrl: "https://youtu.be/54Vl1Tf1wlE",
      duration: "30 минут",
      slug: generateSlug("«Я всё делаю по-твоему!» Травма Покорности"),
    },
    {
      number: 14,
      title: "«Всегда можно сделать еще лучше». Травма Завышенных Стандартов",
      description:
        "Исследование травмы завышенных стандартов и ее влияния на перфекционизм и самооценку.",
      videoUrl: "https://youtu.be/Ur-SC8vcvKE",
      duration: "30 минут",
      slug: generateSlug(
        "«Всегда можно сделать еще лучше». Травма Завышенных Стандартов"
      ),
    },
    {
      number: 15,
      title: "«Я получаю все, что хочу». Травма Избранности",
      description:
        "Изучение травмы избранности и ее влияния на отношения и восприятие реальности.",
      videoUrl: "https://youtu.be/qyZUSPNZ23M",
      duration: "30 минут",
      slug: generateSlug("«Я получаю все, что хочу». Травма Избранности"),
    },
    {
      number: 16,
      title: "Практический урок 16",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/YYjhbapjIug",
      duration: "30 минут",
      slug: generateSlug("Практический урок 16"),
    },
    {
      number: 17,
      title: "Практический урок 17",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/55cFqXwBArU",
      duration: "30 минут",
      slug: generateSlug("Практический урок 17"),
    },
    {
      number: 18,
      title: "Практический урок 18",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/WC2pCSWdFz8",
      duration: "30 минут",
      slug: generateSlug("Практический урок 18"),
    },
    {
      number: 19,
      title: "Практический урок 19",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/dvPcKeJFy2Y",
      duration: "30 минут",
      slug: generateSlug("Практический урок 19"),
    },
    {
      number: 20,
      title: "Практический урок 20",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/NkRFEwTsd9E",
      duration: "30 минут",
      slug: generateSlug("Практический урок 20"),
    },
    {
      number: 21,
      title: "Практический урок 21",
      description:
        "Практические упражнения для закрепления материала и самопознания.",
      videoUrl: "https://youtu.be/E_YTCQ0zQ5U",
      duration: "30 минут",
      slug: generateSlug("Практический урок 21"),
    },
  ],

  // Course modules
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
