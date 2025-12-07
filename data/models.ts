
export interface Model {
    id: number;
    title: string;
    explanation: string;
    visualization: string;
    example: string;
    application: string;
    relatedExercises: string;
    relatedTests: string;
    relatedGoals: string;
}

export const models: Model[] = [
    {
        id: 1,
        title: "Working Memory",
        explanation: "Кратковременная память для текущих задач",
        visualization: "Блок-схема: Вход → RAM → Output",
        example: "Запомнить 7 цифр",
        application: "Тренировка повторением",
        relatedExercises: "N-Back Lite, Sequence Recall",
        relatedTests: "Memory Tests",
        relatedGoals: "Память"
    },
    {
        id: 2,
        title: "Chunking",
        explanation: "Объединение элементов в блоки для лёгкого запоминания",
        visualization: "Графика: 1,2,3 → (123)",
        example: "Телефонный номер",
        application: "Составлять блоки информации",
        relatedExercises: "Grid Memory, Object Memory",
        relatedTests: "Memory Tests",
        relatedGoals: "Память"
    },
    {
        id: 3,
        title: "Spaced Repetition",
        explanation: "Повторение через интервалы",
        visualization: "График повторений",
        example: "Учить слова",
        application: "Повторять по плану",
        relatedExercises: "Word Pairing",
        relatedTests: "Memory Tests",
        relatedGoals: "Память"
    },
    {
        id: 4,
        title: "Feynman Technique",
        explanation: "Объясняй, чтобы понять",
        visualization: "Человек → объяснение другому",
        example: "Учёба",
        application: "Писать и объяснять",
        relatedExercises: "Word Chain, Logic Path",
        relatedTests: "Analogies",
        relatedGoals: "Мышление"
    },
    {
        id: 5,
        title: "System 1 / System 2",
        explanation: "Быстрое vs медленное мышление",
        visualization: "Два круга",
        example: "Принятие решения",
        application: "Осознавать, какой режим включён",
        relatedExercises: "Decision Sprint",
        relatedTests: "Logic Grid",
        relatedGoals: "Мышление"
    },
    {
        id: 6,
        title: "Mental Models",
        explanation: "Ментальные шаблоны",
        visualization: "Дерево моделей",
        example: "Инвестиции",
        application: "Применять подход",
        relatedExercises: "Logic Path, Cause/Effect",
        relatedTests: "Logic Grid",
        relatedGoals: "Мышление"
    },
    {
        id: 7,
        title: "OODA Loop",
        explanation: "Observe → Orient → Decide → Act",
        visualization: "Круговая диаграмма",
        example: "Быстрая реакция",
        application: "Применять для задач",
        relatedExercises: "Rapid Math",
        relatedTests: "Reaction Time",
        relatedGoals: "Скорость"
    },
    {
        id: 8,
        title: "Attention Spotlight",
        explanation: "Фокус внимания",
        visualization: "Световой круг",
        example: "Чтение книги",
        application: "Сосредоточение",
        relatedExercises: "Focus Tap, Selective Attention",
        relatedTests: "Focus Test",
        relatedGoals: "Внимание"
    },
    {
        id: 9,
        title: "Cognitive Load",
        explanation: "Перегрузка мозга",
        visualization: "Баланс шкалы",
        example: "Учёба",
        application: "Разбивать задачи",
        relatedExercises: "Sequence Recall",
        relatedTests: "Memory Tests",
        relatedGoals: "Память, внимание"
    },
    {
        id: 10,
        title: "Deliberate Practice",
        explanation: "Целенаправленная тренировка",
        visualization: "Цикл практика → анализ → повтор",
        example: "Игра на пианино",
        application: "Планировать с фокусом",
        relatedExercises: "Daily Training",
        relatedTests: "All Tests",
        relatedGoals: "Мышление"
    },
    {
        id: 11,
        title: "Chunked Thinking",
        explanation: "Использование блоков для сложных задач",
        visualization: "Пирамидальная схема",
        example: "Анализ отчета",
        application: "Разделять задачи",
        relatedExercises: "Logic Path",
        relatedTests: "Logic Grid",
        relatedGoals: "Мышление"
    },
    {
        id: 12,
        title: "Pomodoro",
        explanation: "Временные интервалы работы",
        visualization: "Таймер",
        example: "Работа за 25 мин",
        application: "Делить работу",
        relatedExercises: "Daily Training",
        relatedTests: "Focus Test",
        relatedGoals: "Продуктивность"
    },
    {
        id: 13,
        title: "Retrieval Practice",
        explanation: "Вспоминание для запоминания",
        visualization: "Схема: input → retrieval",
        example: "Учить язык",
        application: "Активно вспоминать",
        relatedExercises: "Word Pairing",
        relatedTests: "Memory Tests",
        relatedGoals: "Память"
    },
    {
        id: 14,
        title: "Bayesian Thinking",
        explanation: "Обновление вероятностей",
        visualization: "Формула + граф",
        example: "Решение задач",
        application: "Оценивать шанс",
        relatedExercises: "Logic Grid",
        relatedTests: "Analogies",
        relatedGoals: "Мышление"
    },
    {
        id: 15,
        title: "Pareto Principle",
        explanation: "20/80",
        visualization: "Две полосы",
        example: "Работа над задачами",
        application: "Фокус на важном",
        relatedExercises: "Task Switching",
        relatedTests: "Decision Sprint",
        relatedGoals: "Продуктивность"
    },
    {
        id: 16,
        title: "SCAMPER",
        explanation: "Креативные подходы",
        visualization: "Таблица",
        example: "Придумать новую идею",
        application: "Использовать шаблон",
        relatedExercises: "Reverse Thinking",
        relatedTests: "Perspective Shift",
        relatedGoals: "Креативность"
    },
    {
        id: 17,
        title: "Divergent/Convergent",
        explanation: "Генерация + выбор идей",
        visualization: "Две стрелки",
        example: "Мозговой штурм",
        application: "Разделять этапы",
        relatedExercises: "Word Chain, Pattern Swap",
        relatedTests: "Analogies",
        relatedGoals: "Креативность"
    },
    {
        id: 18,
        title: "Emotion Regulation",
        explanation: "Контроль эмоций",
        visualization: "Схема триггер → реакция",
        example: "Спокойствие в споре",
        application: "Практиковать техники",
        relatedExercises: "Stroop Test",
        relatedTests: "Emotion Test",
        relatedGoals: "Ментальное здоровье"
    },
    {
        id: 19,
        title: "Automatic Thoughts",
        explanation: "Автоматические реакции",
        visualization: "Поток стрелок",
        example: "“Я не смогу”",
        application: "Осознавать мысли",
        relatedExercises: "Daily Training",
        relatedTests: "CBT Test",
        relatedGoals: "Мышление"
    },
    {
        id: 20,
        title: "First Principles",
        explanation: "Анализ до основ",
        visualization: "Дерево → корень",
        example: "Стартап стратегия",
        application: "Разбирать задачу",
        relatedExercises: "Logic Path",
        relatedTests: "Analogies",
        relatedGoals: "Мышление"
    }
];
