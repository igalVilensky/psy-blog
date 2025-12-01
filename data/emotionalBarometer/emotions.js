export const emotionalQuadrants = [
  {
    id: "red",
    name: "High Energy / Unpleasant",
    label: "Agitation & Stress",
    description: "High arousal states with negative valence. Fight or flight zone.",
    color: "from-red-500 to-orange-500",
    bg: "bg-red-50",
    valenceRange: [-1, 0],
    arousalRange: [0, 1],
    families: [
      {
        id: "anger",
        name: "Гнев",
        nuances: [
          { id: "annoyance", name: "Раздражение", intensity: 3, valence: -0.2, arousal: 0.4 },
          { id: "frustration", name: "Фрустрация", intensity: 5, valence: -0.4, arousal: 0.6 },
          { id: "anger", name: "Злость", intensity: 7, valence: -0.6, arousal: 0.8 },
          { id: "rage", name: "Ярость", intensity: 9, valence: -0.8, arousal: 0.9 },
          { id: "hostility", name: "Враждебность", intensity: 6, valence: -0.5, arousal: 0.7 }
        ]
      },
      {
        id: "fear",
        name: "Страх",
        nuances: [
          { id: "worry", name: "Беспокойство", intensity: 3, valence: -0.3, arousal: 0.5 },
          { id: "anxiety", name: "Тревога", intensity: 6, valence: -0.5, arousal: 0.7 },
          { id: "panic", name: "Паника", intensity: 10, valence: -0.9, arousal: 1.0 },
          { id: "dread", name: "Ужас", intensity: 9, valence: -0.9, arousal: 0.9 },
          { id: "nervousness", name: "Нервозность", intensity: 4, valence: -0.3, arousal: 0.6 }
        ]
      },
      {
        id: "disgust",
        name: "Отвращение",
        nuances: [
          { id: "dislike", name: "Неприязнь", intensity: 3, valence: -0.4, arousal: 0.4 },
          { id: "revulsion", name: "Отвращение", intensity: 7, valence: -0.7, arousal: 0.6 },
          { id: "loathing", name: "Ненависть", intensity: 9, valence: -0.9, arousal: 0.8 }
        ]
      }
    ]
  },
  {
    id: "blue",
    name: "Low Energy / Unpleasant",
    label: "Low Mood & Withdrawal",
    description: "Low arousal states with negative valence. Freeze or withdraw zone.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    valenceRange: [-1, 0],
    arousalRange: [-1, 0],
    families: [
      {
        id: "sadness",
        name: "Грусть",
        nuances: [
          { id: "disappointment", name: "Разочарование", intensity: 4, valence: -0.4, arousal: -0.2 },
          { id: "sadness", name: "Печаль", intensity: 6, valence: -0.6, arousal: -0.4 },
          { id: "grief", name: "Горе", intensity: 9, valence: -0.9, arousal: -0.5 },
          { id: "loneliness", name: "Одиночество", intensity: 5, valence: -0.5, arousal: -0.3 },
          { id: "melancholy", name: "Меланхолия", intensity: 3, valence: -0.3, arousal: -0.2 }
        ]
      },
      {
        id: "shame",
        name: "Стыд",
        nuances: [
          { id: "embarrassment", name: "Смущение", intensity: 3, valence: -0.3, arousal: -0.1 },
          { id: "guilt", name: "Вина", intensity: 6, valence: -0.6, arousal: -0.3 },
          { id: "shame", name: "Стыд", intensity: 8, valence: -0.8, arousal: -0.4 },
          { id: "humiliation", name: "Унижение", intensity: 9, valence: -0.9, arousal: -0.2 }
        ]
      },
      {
        id: "fatigue",
        name: "Усталость",
        nuances: [
          { id: "boredom", name: "Скука", intensity: 2, valence: -0.2, arousal: -0.6 },
          { id: "tiredness", name: "Усталость", intensity: 5, valence: -0.3, arousal: -0.7 },
          { id: "exhaustion", name: "Истощение", intensity: 8, valence: -0.5, arousal: -0.9 },
          { id: "apathy", name: "Апатия", intensity: 6, valence: -0.4, arousal: -0.8 }
        ]
      }
    ]
  },
  {
    id: "green",
    name: "Low Energy / Pleasant",
    label: "Calm & Restoration",
    description: "Low arousal states with positive valence. Rest and digest zone.",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50",
    valenceRange: [0, 1],
    arousalRange: [-1, 0],
    families: [
      {
        id: "calm",
        name: "Спокойствие",
        nuances: [
          { id: "calm", name: "Спокойствие", intensity: 5, valence: 0.5, arousal: -0.5 },
          { id: "relief", name: "Облегчение", intensity: 6, valence: 0.6, arousal: -0.3 },
          { id: "serenity", name: "Безмятежность", intensity: 8, valence: 0.8, arousal: -0.6 },
          { id: "peace", name: "Умиротворение", intensity: 9, valence: 0.9, arousal: -0.7 }
        ]
      },
      {
        id: "acceptance",
        name: "Принятие",
        nuances: [
          { id: "acceptance", name: "Принятие", intensity: 6, valence: 0.6, arousal: -0.2 },
          { id: "trust", name: "Доверие", intensity: 7, valence: 0.7, arousal: -0.3 },
          { id: "gratitude", name: "Благодарность", intensity: 8, valence: 0.8, arousal: -0.4 }
        ]
      }
    ]
  },
  {
    id: "yellow",
    name: "High Energy / Pleasant",
    label: "Energy & Flow",
    description: "High arousal states with positive valence. Engagement zone.",
    color: "from-yellow-400 to-orange-400",
    bg: "bg-yellow-50",
    valenceRange: [0, 1],
    arousalRange: [0, 1],
    families: [
      {
        id: "joy",
        name: "Радость",
        nuances: [
          { id: "happiness", name: "Счастье", intensity: 7, valence: 0.8, arousal: 0.5 },
          { id: "excitement", name: "Волнение", intensity: 8, valence: 0.7, arousal: 0.8 },
          { id: "elation", name: "Ликование", intensity: 9, valence: 0.9, arousal: 0.9 },
          { id: "playfulness", name: "Игривость", intensity: 6, valence: 0.6, arousal: 0.6 }
        ]
      },
      {
        id: "interest",
        name: "Интерес",
        nuances: [
          { id: "curiosity", name: "Любопытство", intensity: 5, valence: 0.5, arousal: 0.4 },
          { id: "inspiration", name: "Вдохновение", intensity: 8, valence: 0.8, arousal: 0.6 },
          { id: "enthusiasm", name: "Энтузиазм", intensity: 7, valence: 0.7, arousal: 0.7 },
          { id: "focus", name: "Сосредоточенность", intensity: 6, valence: 0.4, arousal: 0.3 }
        ]
      },
      {
        id: "pride",
        name: "Гордость",
        nuances: [
          { id: "confidence", name: "Уверенность", intensity: 7, valence: 0.7, arousal: 0.5 },
          { id: "pride", name: "Гордость", intensity: 8, valence: 0.8, arousal: 0.6 },
          { id: "triumph", name: "Триумф", intensity: 9, valence: 0.9, arousal: 0.8 }
        ]
      }
    ]
  }
];

export const getQuadrantByCoordinates = (valence, arousal) => {
  if (valence < 0 && arousal >= 0) return emotionalQuadrants.find(q => q.id === 'red');
  if (valence < 0 && arousal < 0) return emotionalQuadrants.find(q => q.id === 'blue');
  if (valence >= 0 && arousal < 0) return emotionalQuadrants.find(q => q.id === 'green');
  if (valence >= 0 && arousal >= 0) return emotionalQuadrants.find(q => q.id === 'yellow');
  return emotionalQuadrants[0];
};
