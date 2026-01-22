// Mental Shift - Cognitive Flexibility Training Engine
// Implements multi-modal rule switching with numeric, shape, and Stroop tasks


export type StimulusType = 'number' | 'shape' | 'colorWord';
export type RuleType = 'parity' | 'magnitude' | 'shapeEdges' | 'stroopConflict';

// Stimulus definition
export interface Stimulus {
    type: StimulusType;
    value: string;              // "7", "circle", "RED"
    displayColor?: string;       // "#FF0000" for Stroop
    background: string;          // Background color that cues the rule
}

// Individual round result
export interface MentalShiftRoundResult {
    round: number;
    stimulus: Stimulus;
    rule: RuleType;
    userResponse: string | null;
    correctResponse: string;
    correct: boolean;
    rt: number;
    isSwitch: boolean;
}

// Complete session data
export interface MentalShiftSession {
    sessionId: string;
    createdAt: any;              // Firestore Timestamp
    totalRounds: number;
    accuracy: number;
    avgRT: number;
    normalRT: number;
    switchRT: number;
    switchCost: number;
    score: number;
    difficultyLevel: number;
    rulesUsed: RuleType[];
    rawData: MentalShiftRoundResult[];
}

// Computed metrics
export interface MentalShiftSessionMetrics {
    accuracy: number;
    avgRT: number;
    normalRT: number;
    switchRT: number;
    switchCost: number;
    score: number;
}

// Task round for generation
export interface MentalShiftRound {
    stimulus: Stimulus;
    rule: RuleType;
    correctResponse: string;
    isSwitch: boolean;
}

// Constants
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Sharp-edged shapes vs curved shapes
const SHARP_SHAPES = ['square', 'triangle', 'diamond', 'star', 'hexagon'];
const CURVED_SHAPES = ['circle', 'oval', 'heart', 'crescent'];
const ALL_SHAPES = [...SHARP_SHAPES, ...CURVED_SHAPES];
const COLOR_WORDS = ['RED', 'GREEN', 'BLUE'];
const STROOP_COLORS = ['#ef4444', '#22c55e', '#3b82f6']; // red, green, blue

// Background colors for rule cueing
const BACKGROUNDS = {
    parity: 'hsl(210, 70%, 55%)',        // Blue
    magnitude: 'hsl(45, 70%, 55%)',      // Yellow
    shapeEdges: 'hsl(120, 50%, 45%)',    // Green
    stroopLight: 'hsl(0, 70%, 65%)',     // Light red
    stroopDark: 'hsl(0, 70%, 40%)',      // Dark red
};

// Rule A: Numeric Parity
function evaluateParity(value: string): string {
    const num = parseInt(value);
    return num % 2 === 0 ? 'LEFT' : 'RIGHT';
}

// Rule B: Magnitude
function evaluateMagnitude(value: string): string {
    const num = parseInt(value);
    return num < 5 ? 'LEFT' : 'RIGHT';
}

// Rule C: Shape Edges
function evaluateShapeEdges(value: string): string {
    return SHARP_SHAPES.includes(value) ? 'LEFT' : 'RIGHT';
}

// Rule D: Color Matching (Simplified Stroop)
// Match the TEXT COLOR (not the word meaning)
// Red text -> LEFT
// Green or Blue text -> RIGHT
function evaluateColorMatch(stimulus: Stimulus): string {
    // Always respond based on the TEXT COLOR
    const colorMap: { [key: string]: string } = {
        '#ef4444': 'LEFT',   // red text
        '#22c55e': 'RIGHT',  // green text
        '#3b82f6': 'RIGHT'   // blue text
    };
    return colorMap[stimulus.displayColor || ''] || 'LEFT';
}

// Generate stimulus for a given rule (with optional previous stimulus to avoid repetition)
function generateStimulus(rule: RuleType, previousStimulus?: Stimulus): Stimulus {
    switch (rule) {
        case 'parity':
        case 'magnitude': {
            let num: number;
            do {
                num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
            } while (previousStimulus?.type === 'number' && previousStimulus.value === num.toString());

            return {
                type: 'number',
                value: num.toString(),
                background: rule === 'parity' ? BACKGROUNDS.parity : BACKGROUNDS.magnitude
            };
        }

        case 'shapeEdges': {
            let shape: string;
            do {
                shape = ALL_SHAPES[Math.floor(Math.random() * ALL_SHAPES.length)];
            } while (previousStimulus?.type === 'shape' && previousStimulus.value === shape);

            return {
                type: 'shape',
                value: shape,
                background: BACKGROUNDS.shapeEdges
            };
        }

        case 'stroopConflict': {
            const word = COLOR_WORDS[Math.floor(Math.random() * COLOR_WORDS.length)];
            // Pick a different color for display (Stroop conflict)
            let displayColor = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];

            // Ensure conflict (word and color don't match)
            const wordColorMap: { [key: string]: string } = {
                'RED': '#ef4444',
                'GREEN': '#22c55e',
                'BLUE': '#3b82f6'
            };

            while (displayColor === wordColorMap[word]) {
                displayColor = STROOP_COLORS[Math.floor(Math.random() * STROOP_COLORS.length)];
            }

            return {
                type: 'colorWord',
                value: word,
                displayColor: displayColor,
                background: BACKGROUNDS.stroopLight  // Always use light red background
            };
        }
    }
}

// Evaluate correct response for a stimulus
function evaluateResponse(stimulus: Stimulus, rule: RuleType): string {
    switch (rule) {
        case 'parity':
            return evaluateParity(stimulus.value);
        case 'magnitude':
            return evaluateMagnitude(stimulus.value);
        case 'shapeEdges':
            return evaluateShapeEdges(stimulus.value);
        case 'stroopConflict':
            return evaluateColorMatch(stimulus);
    }
}

// Generate task sequence
export function generateMentalShiftTaskSequence(difficultyLevel: number): MentalShiftRound[] {
    // Map difficulty level (1-5) to easy/medium/hard
    let difficulty: Difficulty;
    let totalRounds: number;

    if (difficultyLevel <= 2) {
        difficulty = 'easy';
        totalRounds = 40;
    } else if (difficultyLevel <= 4) {
        difficulty = 'medium';
        totalRounds = 50;
    } else {
        difficulty = 'hard';
        totalRounds = 60;
    }

    const rounds: MentalShiftRound[] = [];
    const rules: RuleType[] = ['parity', 'magnitude', 'shapeEdges', 'stroopConflict'];

    let currentRule: RuleType | null = null;
    let roundsInCurrentRule = 0;
    let maxRoundsInRule = 0;

    // Distribution targets: 40% numeric, 30% shapes, 30% Stroop
    const numericTarget = Math.floor(totalRounds * 0.4);
    const shapeTarget = Math.floor(totalRounds * 0.3);
    const stroopTarget = totalRounds - numericTarget - shapeTarget;

    let numericCount = 0;
    let shapeCount = 0;
    let stroopCount = 0;

    for (let i = 0; i < totalRounds; i++) {
        // Determine if we need to switch rules
        let needSwitch = false;

        if (currentRule === null) {
            needSwitch = true;
        } else if (roundsInCurrentRule >= maxRoundsInRule) {
            needSwitch = true;
        }

        // Select next rule
        if (needSwitch) {
            const previousRule = currentRule;

            // Choose rule based on distribution needs
            const availableRules: RuleType[] = [];

            if (numericCount < numericTarget) {
                availableRules.push('parity', 'magnitude');
            }
            if (shapeCount < shapeTarget) {
                availableRules.push('shapeEdges');
            }
            if (stroopCount < stroopTarget) {
                availableRules.push('stroopConflict');
            }

            // If all targets met, allow any rule
            if (availableRules.length === 0) {
                availableRules.push(...rules);
            }

            // Filter out previous rule to ensure switching
            const filteredRules = previousRule
                ? availableRules.filter(r => r !== previousRule)
                : availableRules;

            currentRule = filteredRules.length > 0
                ? filteredRules[Math.floor(Math.random() * filteredRules.length)]
                : availableRules[Math.floor(Math.random() * availableRules.length)];

            // Set run length (3-6 rounds)
            const minRun = difficulty === 'hard' ? 3 : 4;
            const maxRun = difficulty === 'hard' ? 5 : 6;
            maxRoundsInRule = Math.floor(Math.random() * (maxRun - minRun + 1)) + minRun;
            roundsInCurrentRule = 0;
        }

        // Generate stimulus for current rule (avoid consecutive duplicates)
        const previousStimulus = i > 0 ? rounds[i - 1].stimulus : undefined;
        const stimulus = generateStimulus(currentRule!, previousStimulus);
        const correctResponse = evaluateResponse(stimulus, currentRule!);
        const isSwitch = needSwitch && i > 0;

        rounds.push({
            stimulus,
            rule: currentRule!,
            correctResponse,
            isSwitch
        });

        // Update counts
        if (currentRule === 'parity' || currentRule === 'magnitude') {
            numericCount++;
        } else if (currentRule === 'shapeEdges') {
            shapeCount++;
        } else if (currentRule === 'stroopConflict') {
            stroopCount++;
        }

        roundsInCurrentRule++;
    }

    return rounds;
}

// Compute session metrics and score
export function computeMentalShiftScore(rounds: MentalShiftRoundResult[]): MentalShiftSessionMetrics {
    if (rounds.length === 0) {
        return {
            accuracy: 0,
            avgRT: 0,
            normalRT: 0,
            switchRT: 0,
            switchCost: 0,
            score: 0
        };
    }

    // Calculate accuracy
    const correctCount = rounds.filter(r => r.correct).length;
    const accuracy = correctCount / rounds.length;

    // Calculate reaction times
    const allRTs = rounds.map(r => r.rt);
    const avgRT = allRTs.reduce((a, b) => a + b, 0) / allRTs.length;

    const normalRounds = rounds.filter(r => !r.isSwitch);
    const switchRounds = rounds.filter(r => r.isSwitch);

    const normalRT = normalRounds.length > 0
        ? normalRounds.map(r => r.rt).reduce((a, b) => a + b, 0) / normalRounds.length
        : avgRT;

    const switchRT = switchRounds.length > 0
        ? switchRounds.map(r => r.rt).reduce((a, b) => a + b, 0) / switchRounds.length
        : avgRT;

    const switchCost = switchRT - normalRT;

    // Normalize metrics for scoring
    // RT expected range: 250-1200ms
    const normalizedRT = Math.max(0, Math.min(1, (normalRT - 250) / (1200 - 250)));

    // Switch cost expected: 80-350ms
    const normalizedSwitchCost = Math.max(0, Math.min(1, (switchCost - 80) / (350 - 80)));

    // Final score calculation
    const score = (
        accuracy * 0.5 +
        (1 - normalizedRT) * 0.25 +
        (1 - normalizedSwitchCost) * 0.25
    ) * 100;

    return {
        accuracy: Math.round(accuracy * 100),
        avgRT: Math.round(avgRT),
        normalRT: Math.round(normalRT),
        switchRT: Math.round(switchRT),
        switchCost: Math.round(switchCost),
        score: Math.round(score)
    };
}

// Validate user response
export function validateMentalShiftResponse(
    stimulus: Stimulus,
    rule: RuleType,
    userResponse: string
): boolean {
    const correctResponse = evaluateResponse(stimulus, rule);
    return userResponse === correctResponse;
}

// Get rule description for UI
export function getRuleDescription(rule: RuleType): string {
    const descriptions: { [key in RuleType]: string } = {
        parity: 'Чётное число → ВЛЕВО, Нечётное число → ВПРАВО',
        magnitude: 'Число меньше 5 → ВЛЕВО, Число 5 и больше → ВПРАВО',
        shapeEdges: 'Острые углы (квадрат/треугольник/ромб/звезда/шестиугольник) → ВЛЕВО, Округлые (круг/овал/сердце/полумесяц) → ВПРАВО',
        stroopConflict: 'КРАСНЫЙ текст → ВЛЕВО, ЗЕЛЁНЫЙ или СИНИЙ текст → ВПРАВО (игнорируйте слово!)'
    };
    return descriptions[rule];
}

// Get rule name for display
export function getRuleName(rule: RuleType): string {
    const names: { [key in RuleType]: string } = {
        parity: 'Чётность',
        magnitude: 'Величина',
        shapeEdges: 'Форма',
        stroopConflict: 'Цвет текста'
    };
    return names[rule];
}
