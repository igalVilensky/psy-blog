# AI Recommendation Engine Architecture for Mind Lab

## 1. Overview
The **Mind Lab Recommendation Engine** is a hybrid system combining rule-based psychological logic with Large Language Model (LLM) reasoning. It processes "Emotional Compass" entries to provide personalized, scientifically-grounded interventions.

**Language:** Russian (Output), English (Internal Logic/Comments)
**Infrastructure:** Netlify Functions (Node.js) + Groq AI (Llama 3 70B)

---

## 2. Emotional State Interpreter (The "Brain")

The interpreter maps raw input data into a structured psychological profile.

### Input Vector
- **Valence** (-1.0 to 1.0): Unpleasant ↔ Pleasant
- **Arousal** (-1.0 to 1.0): Low Energy ↔ High Energy
- **Intensity** (1-10): Subjective strength
- **Primary Emotion**: e.g., "Fear"
- **Nuance**: e.g., "Anxiety"
- **Somatic**: e.g., "Chest tightness"
- **Context**: e.g., "Work"

### Interpretation Logic (The "Psychologist")

| Zone | Valence | Arousal | State Name | Regulation Need |
|---|---|---|---|---|
| **Red** | < 0 | > 0 | **Survival / Fight-Flight** | **Down-regulate** (Calm the Amygdala) |
| **Blue** | < 0 | < 0 | **Withdrawal / Freeze** | **Up-regulate** (Gentle Activation) |
| **Green** | > 0 | < 0 | **Rest / Digest** | **Savor / Deepen** (Reinforce Neural Pathways) |
| **Yellow** | > 0 | > 0 | **Flow / Engagement** | **Channel** (Focus Energy) |

### Somatic Decoding
- **Chest/Throat** → Anxiety/Communication block → *Need: Breathwork / Vocal release*
- **Stomach/Gut** → Fear/Intuition → *Need: Grounding / Safety*
- **Head/Shoulders** → Stress/Overthinking → *Need: Body Scan / Movement*

---

## 3. Scoring System (The "Selector")

We score every available tool against the user's current state.

**Formula:**
`Score = (StateMatch * 0.4) + (GoalMatch * 0.3) + (SomaticMatch * 0.2) + (PersonaBonus * 0.1)`

### Weights
1.  **StateMatch (0-100)**: Does the tool target the current Quadrant?
    *   *Example:* "Box Breathing" targets High Arousal. If User Arousal > 0.5, Score += 100.
2.  **GoalMatch (0-100)**: Does the tool align with user's long-term goals?
    *   *Input:* User Goal Tags (e.g., "Anxiety Relief"). Tool Tags (e.g., "Anxiety").
3.  **SomaticMatch (0-100)**: Does the tool address the specific body sensation?
    *   *Input:* User: "Chest". Tool: "Breathwork". Match!

---

## 4. Recommendation Pipeline

1.  **Ingest**: Receive JSON payload.
2.  **Analyze**:
    *   Calculate Quadrant (Red/Blue/Green/Yellow).
    *   Determine Regulation Direction (Up/Down/Maintain).
    *   Identify Cognitive Distortions (based on narrative text if present).
3.  **Filter**: Select candidate tools from the `ToolDatabase` based on Quadrant.
4.  **Score**: Apply the Scoring Formula to candidates.
5.  **Select**: Pick Top 1 (Primary) and Top 3 (Secondary).
6.  **Refine (LLM)**:
    *   Send the User Profile + Emotional State + Selected Tools to Groq AI.
    *   Ask LLM to generate the "Micro-Explanation" and "Routine" in Russian.
    *   *Prompt:* "User feels [Emotion] (Intensity [X]). Context: [Tags]. Recommend [Tool Name]. Explain why in 2 sentences."
7.  **Format**: Construct the final JSON response.

---

## 5. Output Contract (API Response)

```json
{
  "analysis": {
    "state": "High Energy Unpleasant (Red Zone)",
    "psychologicalNeed": "Down-regulation and Grounding",
    "mechanism": "Parasympathetic Activation",
    "riskLevel": "Low"
  },
  "primary": {
    "toolId": "box_breathing",
    "title": "Квадратное дыхание",
    "reasoning": "Ваш уровень энергии высок, а валентность отрицательная. Эта техника поможет быстро снизить кортизол.",
    "matchScore": 95
  },
  "secondary": [
    { "toolId": "54321_grounding", "title": "Техника 5-4-3-2-1", "matchScore": 88 },
    { "toolId": "journaling_freewrite", "title": "Фрирайтинг", "matchScore": 82 }
  ],
  "routine": [
    { "step": 1, "action": "Сделайте 5 циклов дыхания" },
    { "step": 2, "action": "Назовите эмоцию вслух" },
    { "step": 3, "action": "Запишите одну мысль" }
  ]
}
```

---

## 6. Implementation Plan

### Backend (Netlify Functions)
- **File:** `netlify/functions/analyzeEmotion.js`
- **Dependencies:** `node-fetch` (for Groq), `tools.js` (local database of tools).
- **Logic:**
    - Hardcoded `ToolDatabase` (for speed/reliability).
    - `calculateScore()` function.
    - `generateInsight()` function (calls Groq).

### Frontend (Vue/Nuxt)
- **Component:** `AIRecommendationsModal.vue` (Update to handle new schema).
- **Store:** Update `emotionBarometerService` to call the new endpoint.

---

## 7. Safety & Fail-safes
- **Panic Detection:** If `emotion == 'Panic'` OR `intensity > 9`:
    - *Override:* Force "Grounding" tools immediately.
    - *Message:* "Detecting high intensity. Let's focus on the body first."
- **Dissociation:** If `emotion == 'Numbness'` OR `arousal < -0.8`:
    - *Override:* Sensory activation (Cold water, Movement).
