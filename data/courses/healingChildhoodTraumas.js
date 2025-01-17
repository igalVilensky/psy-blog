const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-я\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const lessons = [
  {
    title: "Что такое детская травма и как происходит исцеление",
    description:
      "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я. Человек ведет себя так, как от него хотят, и постепенно этот тип поведения начинает определять все его поступки и помыслы.",
    videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
    duration: "33 минуты",
    slug: generateSlug("Что такое детская травма и как происходит исцеление"),
  },
  {
    title: "Перенос",
    description:
      "Перенос — феномен в психодинамической психологии, заключающийся в бессознательном перемещении ранее пережитых (особенно в детстве) чувств и отношений, проявлявшихся к одному лицу, совсем на другое лицо.",
    videoUrl: "https://youtu.be/67tTcO8dr2w",
    duration: "14 минут",
    slug: generateSlug("Перенос"),
  },
  {
    title: "Запреты, которые вам транслировали родители",
    description: "Первый запрет — «Не живи», «не чувствуй».",
    videoUrl: "https://youtu.be/FeF4PsSZVL4",
    duration: "20 минут",
    slug: generateSlug("Запреты, которые вам транслировали родители"),
  },
  {
    title: "Второй запрет — «Не будь ребёнком»",
    description: "Исследование влияния второго запрета на развитие личности.",
    videoUrl: "https://youtu.be/6RHGk8XHOJc",
    duration: "38 минут",
    slug: generateSlug("Второй запрет — «Не будь ребёнком»"),
  },
  {
    title: "Травма Отверженности или «Не бросай меня»",
    description:
      "Исследование травмы отверженности и ее влияния на формирование личности.",
    videoUrl: "https://youtu.be/76HU8Tc-1gE",
    duration: "33 минуты",
    slug: generateSlug("Травма Отверженности или «Не бросай меня»"),
  },
  {
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
    title: "«Я не такой, как все». Травма Изгнания из общества",
    description:
      "Исследование травмы изгнания из общества и ее влияния на социальную адаптацию.",
    videoUrl: "https://youtu.be/CSJSYUTrAV0",
    duration: "28 минут",
    slug: generateSlug("«Я не такой, как все». Травма Изгнания из общества"),
  },
  {
    title: "«Я сам не справлюсь». Травма Зависимости",
    description:
      "Анализ травмы зависимости и ее влияния на формирование самостоятельности.",
    videoUrl: "https://youtu.be/SbQduqTp4wc",
    duration: "35 минут",
    slug: generateSlug("«Я сам не справлюсь». Травма Зависимости"),
  },
  {
    title: "«Вот-вот случится беда». Травма Уязвимости",
    description:
      "Изучение травмы уязвимости и ее влияния на восприятие мира и себя.",
    videoUrl: "https://youtu.be/pl-iEP8Qh_c",
    duration: "31 минута",
    slug: generateSlug("«Вот-вот случится беда». Травма Уязвимости"),
  },
  {
    title: "«Я никуда не гожусь». Травма Неполноценности",
    description:
      "Исследование травмы неполноценности и ее влияния на самооценку и поведение.",
    videoUrl: "https://youtu.be/dDhmDl6i_xo",
    duration: "30 минут",
    slug: generateSlug("«Я никуда не гожусь». Травма Неполноценности"),
  },
  {
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
    title: "«Я всё делаю по-твоему!» Травма Покорности",
    description:
      "Анализ травмы покорности и ее влияния на принятие решений и личные границы.",
    videoUrl: "https://youtu.be/54Vl1Tf1wlE",
    duration: "30 минут",
    slug: generateSlug("«Я всё делаю по-твоему!» Травма Покорности"),
  },
  {
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
    title: "«Я получаю все, что хочу». Травма Избранности",
    description:
      "Изучение травмы избранности и ее влияния на отношения и восприятие реальности.",
    videoUrl: "https://youtu.be/qyZUSPNZ23M",
    duration: "30 минут",
    slug: generateSlug("«Я получаю все, что хочу». Травма Избранности"),
  },
  {
    title: "Практический урок 16",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/YYjhbapjIug",
    duration: "30 минут",
    slug: generateSlug("Практический урок 16"),
  },
  {
    title: "Практический урок 17",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/55cFqXwBArU",
    duration: "30 минут",
    slug: generateSlug("Практический урок 17"),
  },
  {
    title: "Практический урок 18",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/WC2pCSWdFz8",
    duration: "30 минут",
    slug: generateSlug("Практический урок 18"),
  },
  {
    title: "Практический урок 19",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/dvPcKeJFy2Y",
    duration: "30 минут",
    slug: generateSlug("Практический урок 19"),
  },
  {
    title: "Практический урок 20",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/NkRFEwTsd9E",
    duration: "30 минут",
    slug: generateSlug("Практический урок 20"),
  },
  {
    title: "Практический урок 21",
    description:
      "Практические упражнения для закрепления материала и самопознания.",
    videoUrl: "https://youtu.be/E_YTCQ0zQ5U",
    duration: "30 минут",
    slug: generateSlug("Практический урок 21"),
  },
];

// Calculate total duration of the course
const totalMinutes = lessons.reduce((sum, lesson) => {
  // Extract the numeric value from the duration string (e.g., "33 минуты" -> 33)
  const durationValue = parseInt(lesson.duration);
  return sum + durationValue;
}, 0);

// Convert total minutes to hours
const totalHours = Math.round(totalMinutes / 60);

export const course = {
  id: 1,
  slug: "healing-childhood-traumas", // Unique slug for the course
  title: "Исцеление детских травм",
  description:
    "Исследуйте и исцелите свои детские травмы через 21 урок, включая теоретические и практические задания. Узнайте, как травмы влияют на вашу жизнь, и научитесь их преодолевать.",
  image: "loveyourself.webp", // Path to the image
  progress: 75,
  status: "In Progress",
  lessons: lessons.length, // Total number of lessons
  duration: totalHours, // Total duration in hours
  category: "active",
};
