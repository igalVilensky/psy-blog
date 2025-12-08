export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TaskOption {
    value: string | number;
    isCorrect: boolean;
}

export interface PatternTask {
    id: string;
    sequence: (string | number | null)[];
    options: (string | number)[];
    answer: string | number;
    logicDescription: string;
    difficulty: Difficulty;
}

type PatternType = 'arithmetic' | 'shapes' | 'rotation';

const SHAPES = ['■', '□', '●', '○', '▲', '▼', '◆', '◇'];
const ARROWS = ['↑', '→', '↓', '←'];

// Arithmetic Logic
function generateArithmeticPattern(difficulty: Difficulty): PatternTask {
    const length = 4;
    let sequence: (number | null)[] = [];
    let answer: number;
    let explanation = "";
    let ruleType = Math.random();

    // Easy: +N
    if (difficulty === 'easy') {
        const start = Math.floor(Math.random() * 20) + 1;
        const step = Math.floor(Math.random() * 3) + 1; // +1, +2, +3

        for (let i = 0; i < length; i++) {
            sequence.push(start + (i * step));
        }
        answer = sequence[length - 1]!;
        explanation = `Числа увеличиваются на ${step}.`;
    }
    // Medium: *2, decreasing, or alternating simple
    else if (difficulty === 'medium') {
        const start = Math.floor(Math.random() * 10) + 2;
        if (ruleType < 0.33) {
            // x2
            for (let i = 0; i < length; i++) {
                sequence.push(start * Math.pow(2, i));
            }
            answer = sequence[length - 1]!;
            explanation = "Каждое следующее число в 2 раза больше предыдущего.";
        } else if (ruleType < 0.66) {
            // Decreasing -N
            const step = Math.floor(Math.random() * 3) + 1;
            const higherStart = start + 20;
            for (let i = 0; i < length; i++) {
                sequence.push(higherStart - (i * step));
            }
            answer = sequence[length - 1]!;
            explanation = `Числа уменьшаются на ${step}.`;
        } else {
            // +1 then +2, etc (simple alternating)
            // 1, 2, 4, 5, 7 (+1, +2, +1, +2)
            let current = start;
            sequence.push(current);
            for (let i = 1; i < length; i++) {
                const add = i % 2 === 1 ? 1 : 2;
                current += add;
                sequence.push(current);
            }
            answer = sequence[length - 1]!;
            explanation = "Чередуется прибавление: +1, затем +2.";
        }
    }
    // Hard: Rule changes or mixed
    else {
        const start = Math.floor(Math.random() * 50) + 10;
        if (ruleType < 0.5) {
            // Alternating +3 / -1
            let current = start;
            sequence.push(current);
            for (let i = 1; i < length; i++) {
                const change = i % 2 === 1 ? 3 : -1;
                current += change;
                sequence.push(current);
            }
            answer = sequence[length - 1]!;
            explanation = "Чередуется +3 и -1.";
        } else {
            // +1, +2, +3 (growing step)
            let current = start;
            sequence.push(current);
            let step = 1;
            for (let i = 1; i < length; i++) {
                current += step;
                sequence.push(current);
                step++;
            }
            answer = sequence[length - 1]!;
            explanation = "Шаг увеличения растет на 1 с каждым ходом (+1, +2, +3...).";
        }
    }

    // Hide last
    sequence[length - 1] = null;

    // Generate distractors
    const options = new Set<number>();
    options.add(answer);
    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        if (offset !== 0) options.add(answer + offset);
    }

    return {
        id: `arith-${Date.now()}-${Math.random()}`,
        sequence,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        answer,
        logicDescription: explanation,
        difficulty
    };
}

// Shapes Logic
function generateShapePattern(difficulty: Difficulty): PatternTask {
    const length = 5;
    let sequence: (string | null)[] = [];
    let answer: string;
    let explanation = "";

    // Pairs to alternate
    const pairIndex = Math.floor(Math.random() * (SHAPES.length / 2));
    const s1 = SHAPES[pairIndex * 2];
    const s2 = SHAPES[pairIndex * 2 + 1];

    if (difficulty === 'easy') {
        // Strict alternation A B A B
        for (let i = 0; i < length; i++) {
            sequence.push(i % 2 === 0 ? s1 : s2);
        }
        answer = sequence[length - 1] as string;
        explanation = "Фигуры чередуются.";
    } else if (difficulty === 'medium') {
        // A A B B A
        for (let i = 0; i < length; i++) {
            const idx = Math.floor(i / 2) % 2;
            sequence.push(idx === 0 ? s1 : s2);
        }
        answer = sequence[length - 1] as string;
        explanation = "Фигуры идут парами: две одних, две других.";
    } else {
        // A B B A B B (1-2 pattern?) or ABC
        // Let's do Triples A B C
        const s3 = SHAPES[(pairIndex * 2 + 2) % SHAPES.length];
        for (let i = 0; i < length; i++) {
            const idx = i % 3;
            sequence.push(idx === 0 ? s1 : idx === 1 ? s2 : s3);
        }
        answer = sequence[length - 1] as string;
        explanation = "Цикл из трех фигур.";
    }

    sequence[length - 1] = null;

    const options = new Set<string>();
    options.add(answer);
    while (options.size < 4) {
        options.add(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
    }

    return {
        id: `shape-${Date.now()}-${Math.random()}`,
        sequence,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        answer,
        logicDescription: explanation,
        difficulty
    };
}

// Rotation Logic
function generateRotationPattern(difficulty: Difficulty): PatternTask {
    const length = 5;
    let sequence: (string | null)[] = [];
    let answer: string;
    let explanation = "";

    let currentIndex = Math.floor(Math.random() * 4); // Start direction

    if (difficulty === 'easy') {
        // Clockwise
        for (let i = 0; i < length; i++) {
            sequence.push(ARROWS[currentIndex]);
            currentIndex = (currentIndex + 1) % 4;
        }
        answer = sequence[length - 1] as string;
        explanation = "Стрелка вращается по часовой стрелке.";
    } else if (difficulty === 'medium') {
        // Counter-clockwise 
        for (let i = 0; i < length; i++) {
            sequence.push(ARROWS[currentIndex]);
            currentIndex = (currentIndex - 1 + 4) % 4;
        }
        answer = sequence[length - 1] as string;
        explanation = "Стрелка вращается против часовой стрелки.";
    } else {
        // +2 (Flip)
        for (let i = 0; i < length; i++) {
            sequence.push(ARROWS[currentIndex]);
            currentIndex = (currentIndex + 2) % 4;
        }
        answer = sequence[length - 1] as string;
        explanation = "Стрелка переворачивается каждый раз.";
    }

    sequence[length - 1] = null;

    const options = new Set<string>();
    options.add(answer);
    while (options.size < 4) {
        options.add(ARROWS[Math.floor(Math.random() * 4)]);
    }

    return {
        id: `rot-${Date.now()}-${Math.random()}`,
        sequence,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        answer,
        logicDescription: explanation,
        difficulty
    };
}

export function generateTask(difficulty: Difficulty): PatternTask {
    const r = Math.random();
    if (r < 0.4) return generateArithmeticPattern(difficulty);
    if (r < 0.7) return generateShapePattern(difficulty);
    return generateRotationPattern(difficulty);
}

export function validateAnswer(task: PatternTask, answer: string | number): boolean {
    return task.answer === answer;
}

export function getExplanation(task: PatternTask): string {
    return task.logicDescription;
}
