# AI Recommendation Engine: Real Examples

## Example 1: Enthusiasm (Mild Positive Excitement)

**Input Data:**
```json
{
  "affect": { "arousal": 0.1367, "valence": 0.3091, "intensity": 3 },
  "emotion": "Интерес",
  "labeling": {
    "primary": "Интерес",
    "secondary": "Энтузиазм",
    "id": "enthusiasm"
  },
  "triggers": ["Work", "Relationship", "Thoughts", "Dreams", "Home"],
  "somatic": { "locations": ["stomach", "chest"] }
}
```

**Processing Logic:**
1.  **Quadrant:** Valence > 0, Arousal > 0 → **YELLOW ZONE (Flow/Engagement)**.
2.  **Goal:** Channel energy (Up-regulate/Focus).
3.  **Tool Selection:**
    *   *Creative Freewrite* (Target: Yellow, Score: 40 + TagMatch)
    *   *Vision Boarding* (Target: Yellow)
4.  **AI Insight (Groq):** "Your enthusiasm is a great fuel. Let's direct it before it scatters."

**Output JSON:**
```json
{
  "analysis": {
    "state": "YELLOW ZONE",
    "emotion": "Интерес",
    "intensity": 3
  },
  "primary": {
    "id": "creative_freewrite",
    "title": "Потоковое письмо",
    "type": "journaling",
    "duration": "5 мин",
    "matchScore": 85,
    "reasoning": "Ваш интерес и энтузиазм — это прекрасное топливо. Потоковое письмо поможет направить эту энергию в конкретные идеи, пока она не рассеялась."
  },
  "secondary": [
    { "id": "vision_boarding", "title": "Визуализация целей", "matchScore": 75 },
    { "id": "savoring_moment", "title": "Смакование момента", "matchScore": 60 }
  ],
  "routine": [
    { "step": 1, "action": "Возьмите лист бумаги и ручку." },
    { "step": 2, "action": "Поставьте таймер на 5 минут." },
    { "step": 3, "action": "Пишите все идеи подряд, не останавливаясь." }
  ]
}
```

---

## Example 2: Anxiety (High Energy Unpleasant)

**Input Data:**
```json
{
  "affect": { "arousal": 0.8, "valence": -0.6, "intensity": 8 },
  "emotion": "Страх",
  "labeling": {
    "primary": "Страх",
    "secondary": "Тревога",
    "id": "anxiety"
  },
  "triggers": ["Deadline", "Health"],
  "somatic": { "locations": ["chest", "throat", "shoulders"] }
}
```

**Processing Logic:**
1.  **Quadrant:** Valence < 0, Arousal > 0 → **RED ZONE (Survival)**.
2.  **Goal:** Down-regulate (Calm Amygdala).
3.  **Tool Selection:**
    *   *Box Breathing* (Target: Red, Type: Breathing, Somatic Match: Yes)
    *   *5-4-3-2-1 Grounding* (Target: Red)
4.  **AI Insight (Groq):** "High intensity detected. We need to signal safety to the vagus nerve immediately."

**Output JSON:**
```json
{
  "analysis": {
    "state": "RED ZONE",
    "emotion": "Страх",
    "intensity": 8
  },
  "primary": {
    "id": "box_breathing",
    "title": "Квадратное дыхание",
    "type": "breathing",
    "duration": "2 мин",
    "matchScore": 95,
    "reasoning": "Вы испытываете сильное напряжение в груди и горле. Квадратное дыхание — самый быстрый способ физиологически переключить нервную систему в режим спокойствия."
  },
  "secondary": [
    { "id": "54321_grounding", "title": "Техника 5-4-3-2-1", "matchScore": 88 },
    { "id": "progressive_muscle_relaxation", "title": "Прогрессивная релаксация", "matchScore": 82 }
  ],
  "routine": [
    { "step": 1, "action": "Сядьте удобно, поставьте стопы на пол." },
    { "step": 2, "action": "Сделайте выдох через рот." },
    { "step": 3, "action": "Начните вдох на 4 счета." }
  ]
}
```
