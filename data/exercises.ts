
export interface Exercise {
    id: number;
    title: string;
    category: string;
    goal: string;
    instruction: string;
    format: string;
    metric: string;
    uiExample: string;
    relatedModels?: string;
    link?: string;
}

export const exercises: Exercise[] = [
    {
        id: 1,
        title: "N-Back Lite",
        category: "Память",
        goal: "Развить рабочую память",
        instruction: "Показать последовательность символов, пользователь нажимает, если символ повторяется через N шагов",
        format: "Веб/мобильный, таймер, подсветка кнопок",
        metric: "% правильных ответов, время реакции",
        uiExample: "3x3 сетка с буквами",
        relatedModels: "Working Memory",
        link: "/lab/tests/nback"
    },
    // ... existing exercises ...
    {
        id: 5661,
        title: "Pattern Detection Mini",
        category: "Логика",
        goal: "Развитие навыков выявления закономерностей и логического мышления",
        instruction: "Вам будет показана последовательность элементов (чисел, фигур, направлений). Ваша задача — определить правило и выбрать правильное продолжение из предложенных вариантов.",
        format: "Интерактивный тест, 10 заданий",
        metric: "Точность (%), Среднее время реакции",
        uiExample: "Горизонтальная последовательность с пропуском, 4 варианта ответа",
        relatedModels: "Abstract Reasoning, Pattern Recognition, Cognitive Flexibility",
        link: "/lab/brain-training/pattern-detection-mini"
    },
    {
        id: 2,
        title: "Sequence Recall",
        category: "Память",
        goal: "Развитие кратковременной памяти",
        instruction: "Показать последовательность чисел, затем воспроизвести",
        format: "Ввод чисел",
        metric: "Кол-во правильных чисел",
        uiExample: "Линейная последовательность",
        relatedModels: "Working Memory, Cognitive Load"
    },
    {
        id: 3,
        title: "Grid Memory",
        category: "Память",
        goal: "Визуальная память",
        instruction: "На сетке загораются клетки, нужно воспроизвести",
        format: "Клик/тап",
        metric: "% правильных клеток",
        uiExample: "5x5 сетка",
        relatedModels: "Chunking",
        link: "/lab/brain-training/memory"
    },
    {
        id: 4,
        title: "Word Pairing",
        category: "Память",
        goal: "Ассоциативная память",
        instruction: "Пользователь запоминает пары слов, затем находит совпадения",
        format: "Drag&Drop",
        metric: "% совпадений",
        uiExample: "Список слов в колонках",
        relatedModels: "Spaced Repetition, Retrieval Practice"
    },
    {
        id: 5,
        title: "Object Memory",
        category: "Память",
        goal: "Визуальная память",
        instruction: "Показываются объекты 3-5 сек → нужно воспроизвести",
        format: "Drag&Drop или ввод",
        metric: "% правильно",
        uiExample: "Сетка картинок",
        relatedModels: "Chunking"
    },
    {
        id: 6,
        title: "Stroop Test",
        category: "Внимание",
        goal: "Фокус и подавление автоматизма",
        instruction: "Выбирайте цвет текста, игнорируя слово",
        format: "Кнопки с цветами",
        metric: "% правильных ответов, время",
        uiExample: "4 кнопки",
        relatedModels: "Emotion Regulation, System 1 / System 2",
        link: "/lab/brain-training/stroop"
    },
    {
        id: 7,
        title: "Odd One Out",
        category: "Внимание",
        goal: "Внимание к деталям",
        instruction: "Найти объект, который отличается",
        format: "Визуально",
        metric: "% правильных",
        uiExample: "Сетка из картинок",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 8,
        title: "Focus Tap",
        category: "Внимание",
        goal: "Селективное внимание",
        instruction: "Нажимать только на символ X среди шума",
        format: "Кнопки/тап",
        metric: "Кол-во правильных, промахи",
        uiExample: "Случайный поток символов",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 9,
        title: "Target Tracking",
        category: "Внимание",
        goal: "Трек объект в движении",
        instruction: "Следить за движущимся объектом, нажать при достижении цели",
        format: "Drag/Touch",
        metric: "Кол-во попаданий",
        uiExample: "Мяч движется по экрану",
        relatedModels: "Attention Spotlight",
        link: "/lab/brain-training/target-tracking"
    },
    {
        id: 10,
        title: "Selective Attention",
        category: "Внимание",
        goal: "Фильтровать нужное",
        instruction: "Выбрать все красные объекты среди прочих",
        format: "Клик/тап",
        metric: "% правильных",
        uiExample: "Многоцветная сетка",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 11,
        title: "Rapid Math",
        category: "Скорость мышления",
        goal: "Быстрое решение простых задач",
        instruction: "Решать 10 примеров за время",
        format: "Ввод чисел",
        metric: "% верно, среднее время",
        uiExample: "Поле ввода",
        relatedModels: "OODA Loop"
    },
    {
        id: 12,
        title: "Symbol Matching",
        category: "Скорость мышления",
        goal: "Реакция на символы",
        instruction: "Найти соответствие между символами",
        format: "Drag/Drop",
        metric: "% верно",
        uiExample: "2 колонки символов",
        relatedModels: "System 1 / System 2"
    },
    {
        id: 13,
        title: "Reaction Time",
        category: "Скорость мышления",
        goal: "Реакция на сигнал",
        instruction: "Нажать кнопку как только появится сигнал",
        format: "Кнопка",
        metric: "Время реакции",
        uiExample: "Кнопка в центре",
        relatedModels: "OODA Loop",
        link: "/lab/brain-training/reaction"
    },
    {
        id: 14,
        title: "Decision Sprint",
        category: "Скорость мышления",
        goal: "Быстрое принятие решения",
        instruction: "Выбрать правильный вариант в ограниченное время",
        format: "2-4 варианта",
        metric: "% правильных",
        uiExample: "Таймер сверху",
        relatedModels: "System 1 / System 2, Pareto Principle"
    },
    {
        id: 15,
        title: "Pattern Detection",
        category: "Логика",
        goal: "Выявлять закономерности",
        instruction: "Найти закономерность в последовательности",
        format: "Drag/Click",
        metric: "% правильных",
        uiExample: "Последовательность фигур",
        relatedModels: "Mental Models",
        link: "/lab/brain-training/pattern-detection-mini"
    },
    {
        id: 16,
        title: "Analogies",
        category: "Логика",
        goal: "Абстрактное мышление",
        instruction: "Завершить аналогию A:B :: C:?",
        format: "Ввод/выбор",
        metric: "% правильных",
        uiExample: "2 пары слов",
        relatedModels: "Feynman Technique, First Principles"
    },
    {
        id: 17,
        title: "Logic Grid",
        category: "Логика",
        goal: "Критическое мышление",
        instruction: "Решить мини-логическую задачу",
        format: "Выбор/клик",
        metric: "% правильно",
        uiExample: "Сетка условий",
        relatedModels: "Bayesian Thinking, Mental Models"
    },
    {
        id: 18,
        title: "Cause/Effect Game",
        category: "Логика",
        goal: "Причинно-следственные связи",
        instruction: "Соединить причины с последствиями",
        format: "Drag&Drop",
        metric: "% правильно",
        uiExample: "2 колонки событий",
        relatedModels: "Mental Models"
    },
    {
        id: 19,
        title: "Anagrams",
        category: "Вербальное мышление",
        goal: "Словарный запас",
        instruction: "Составить слова из букв",
        format: "Ввод",
        metric: "% правильных",
        uiExample: "7 букв в рандом порядке",
        relatedModels: "Chunking"
    },
    {
        id: 20,
        title: "Categories",
        category: "Вербальное мышление",
        goal: "Быстрая категоризация",
        instruction: "Назвать слова из категории за 30 секунд",
        format: "Ввод",
        metric: "Кол-во слов",
        uiExample: "Список категории сверху",
        relatedModels: "Chunking, Mental Models"
    },
    {
        id: 21,
        title: "Synonym Race",
        category: "Вербальное мышление",
        goal: "Расширение словаря",
        instruction: "Найти синоним/антоним",
        format: "Ввод/выбор",
        metric: "% правильно",
        uiExample: "Одно слово, поле ввода",
        relatedModels: "Divergent/Convergent"
    },
    {
        id: 22,
        title: "Task Switching",
        category: "Ментальная гибкость",
        goal: "Переключение между задачами",
        instruction: "Менять режим действий каждые N секунд",
        format: "Кнопки/тап",
        metric: "% правильно, скорость",
        uiExample: "Два режима на экране",
        relatedModels: "Pareto Principle"
    },
    {
        id: 23,
        title: "Reverse Thinking",
        category: "Ментальная гибкость",
        goal: "Решение обратной задачи",
        instruction: "Делать задачу «от обратного»",
        format: "Ввод",
        metric: "% верно",
        uiExample: "Пример: 5 → 25, ищем правило",
        relatedModels: "SCAMPER"
    },
    {
        id: 24,
        title: "Perspective Shift",
        category: "Ментальная гибкость",
        goal: "Множественные точки зрения",
        instruction: "Найти альтернативное объяснение картинки",
        format: "Выбор",
        metric: "% правильно",
        uiExample: "Картинка + варианты",
        relatedModels: "SCAMPER"
    },
    {
        id: 25,
        title: "1-min Memory",
        category: "Краткие челленджи",
        goal: "Память за короткое время",
        instruction: "1 минута на запоминание чисел",
        format: "Ввод",
        metric: "% верно",
        uiExample: "Числа сверху",
        relatedModels: "Working Memory"
    },
    {
        id: 26,
        title: "1-min Focus",
        category: "Краткие челленджи",
        goal: "Внимание",
        instruction: "1 минута на отслеживание объектов",
        format: "Touch",
        metric: "Кол-во объектов",
        uiExample: "Движущиеся объекты",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 27,
        title: "1-min Logic",
        category: "Краткие челленджи",
        goal: "Логика",
        instruction: "Быстрая логическая задача",
        format: "Выбор",
        metric: "% верно",
        uiExample: "Мини задача на 1 мин",
        relatedModels: "System 1 / System 2"
    },
    {
        id: 28,
        title: "1-min Words",
        category: "Краткие челленджи",
        goal: "Вербальные навыки",
        instruction: "Найти как можно больше слов из букв",
        format: "Ввод",
        metric: "Кол-во слов",
        uiExample: "6-7 букв",
        relatedModels: "Divergent/Convergent"
    },
    {
        id: 29,
        title: "1-min Reaction",
        category: "Краткие челленджи",
        goal: "Скорость реакции",
        instruction: "Нажимать как только появится сигнал",
        format: "Кнопка",
        metric: "Время реакции",
        uiExample: "Большая кнопка",
        relatedModels: "OODA Loop"
    },
    {
        id: 30,
        title: "Focus Maze",
        category: "Внимание",
        goal: "Сосредоточение",
        instruction: "Найти путь в лабиринте",
        format: "Drag/Touch",
        metric: "Время + ошибки",
        uiExample: "Лабиринт",
        relatedModels: "Attention Spotlight, System 1 / System 2"
    },
    {
        id: 31,
        title: "Memory Pyramid",
        category: "Память",
        goal: "Последовательная память",
        instruction: "Сложная последовательность объектов",
        format: "Ввод/клик",
        metric: "% верно",
        uiExample: "Пирамида из объектов",
        relatedModels: "Chunking"
    },
    {
        id: 32,
        title: "Color Tap",
        category: "Внимание",
        goal: "Фокус на цвет",
        instruction: "Нажимать на определённый цвет",
        format: "Кнопка",
        metric: "% попаданий",
        uiExample: "Цветные кнопки",
        relatedModels: "System 1 / System 2"
    },
    {
        id: 33,
        title: "Quick Math",
        category: "Скорость мышления",
        goal: "Математическая реакция",
        instruction: "Быстро решать задачи на сложность",
        format: "Ввод",
        metric: "% верно, время",
        uiExample: "Примеры сверху",
        relatedModels: "OODA Loop"
    },
    {
        id: 34,
        title: "Visual Search",
        category: "Внимание",
        goal: "Найти объект",
        instruction: "Найти объект среди визуального шума",
        format: "Touch",
        metric: "% верно",
        uiExample: "Сетка объектов",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 35,
        title: "Memory Ladder",
        category: "Память",
        goal: "Последовательное запоминание",
        instruction: "Сохранять последовательность чисел",
        format: "Ввод",
        metric: "% верно",
        uiExample: "Лестница чисел",
        relatedModels: "Working Memory"
    },
    {
        id: 36,
        title: "Word Chain",
        category: "Вербальное мышление",
        goal: "Связь слов",
        instruction: "Создать цепочку слов по смыслу",
        format: "Ввод",
        metric: "Кол-во слов",
        uiExample: "Текстовое поле",
        relatedModels: "Feynman Technique, Divergent/Convergent"
    },
    {
        id: 37,
        title: "Logic Pairs",
        category: "Логика",
        goal: "Соответствие пар",
        instruction: "Соединить правильные пары",
        format: "Drag/Drop",
        metric: "% верно",
        uiExample: "2 колонки объектов",
        relatedModels: "Mental Models"
    },
    {
        id: 38,
        title: "Speed Typing",
        category: "Скорость мышления",
        goal: "Реакция + клавиатура",
        instruction: "Быстро набрать слова",
        format: "Ввод",
        metric: "Кол-во слов",
        uiExample: "Поле ввода",
        relatedModels: "Deliberate Practice"
    },
    {
        id: 39,
        title: "Attention Flip",
        category: "Внимание",
        goal: "Менять фокус",
        instruction: "Нажимать противоположный символ",
        format: "Кнопка",
        metric: "% правильно",
        uiExample: "Два символа",
        relatedModels: "Emotion Regulation"
    },
    {
        id: 40,
        title: "Pattern Swap",
        category: "Логика",
        goal: "Узнавание схем",
        instruction: "Поменять элементы, чтобы соответствовало образцу",
        format: "Drag/Drop",
        metric: "% верно",
        uiExample: "Сетка схем",
        relatedModels: "Divergent/Convergent"
    },
    {
        id: 41,
        title: "Memory Match",
        category: "Память",
        goal: "Парное запоминание",
        instruction: "Найти одинаковые карточки",
        format: "Drag/Click",
        metric: "% верно",
        uiExample: "Карточки 4x4",
        relatedModels: "Working Memory"
    },
    {
        id: 42,
        title: "Speed Math 2",
        category: "Скорость мышления",
        goal: "Быстрая арифметика",
        instruction: "Серия примеров за 30 секунд",
        format: "Ввод",
        metric: "% верно",
        uiExample: "Примеры сверху",
        relatedModels: "OODA Loop"
    },
    {
        id: 43,
        title: "Reaction Grid",
        category: "Скорость мышления",
        goal: "Быстрая реакция",
        instruction: "Клик на меняющийся объект",
        format: "Touch",
        metric: "Время реакции",
        uiExample: "Сетка объектов",
        relatedModels: "OODA Loop"
    },
    {
        id: 44,
        title: "Word Mixer",
        category: "Вербальное мышление",
        goal: "Анаграммы",
        instruction: "Переставить буквы в слово",
        format: "Drag/Drop",
        metric: "% верно",
        uiExample: "Буквы рандомно",
        relatedModels: "Divergent/Convergent"
    },
    {
        id: 45,
        title: "Logic Path",
        category: "Логика",
        goal: "Последовательность шагов",
        instruction: "Построить логический путь",
        format: "Drag/Drop",
        metric: "% верно",
        uiExample: "Схема шагов",
        relatedModels: "Feynman Technique, Mental Models, Chunked Thinking"
    },
    {
        id: 46,
        title: "Attention Maze",
        category: "Внимание",
        goal: "Фокус и удержание",
        instruction: "Найти путь среди отвлекающих объектов",
        format: "Touch",
        metric: "% верно, время",
        uiExample: "Лабиринт",
        relatedModels: "Attention Spotlight"
    },
    {
        id: 47,
        title: "Memory Circle",
        category: "Память",
        goal: "Визуальная и последовательная",
        instruction: "Запомнить объекты в круге",
        format: "Touch/Drag",
        metric: "% верно",
        uiExample: "Круг объектов",
        relatedModels: "Working Memory"
    },
    {
        id: 48,
        title: "Quick Words",
        category: "Вербальное мышление",
        goal: "Ассоциации",
        instruction: "Придумать слово по подсказке",
        format: "Ввод",
        metric: "Кол-во слов",
        uiExample: "Текстовое поле",
        relatedModels: "Divergent/Convergent"
    },
    {
        id: 49,
        title: "Reverse Math",
        category: "Скорость мышления",
        goal: "Обратные вычисления",
        instruction: "Найти число, которое даёт результат",
        format: "Ввод",
        metric: "% верно",
        uiExample: "Пример 5 → ? = 25",
        relatedModels: "SCAMPER"
    },
    {
        id: 50,
        title: "Mental Shift",
        category: "Ментальная гибкость",
        goal: "Тренировка когнитивной гибкости и быстрого переключения между правилами",
        instruction: "Быстро переключайтесь между различными когнитивными правилами (чётность, величина, форма, Струп). Цвет фона подсказывает активное правило. Отвечайте ВЛЕВО или ВПРАВО в зависимости от правила.",
        format: "Интерактивный тренажёр, 40-60 раундов в зависимости от сложности",
        metric: "Точность (%), Среднее время реакции, Время переключения, Цена переключения (мс)",
        uiExample: "Динамический стимул (число/фигура/цветное слово) на цветном фоне, кнопки ВЛЕВО/ВПРАВО",
        relatedModels: "Cognitive Flexibility, Task Switching, Executive Function, Stroop Effect",
        link: "/lab/brain-training/mental-shift"
    }
];
