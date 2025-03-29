<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="daily-growth-spark-overlay"
      @click="handleOverlayClick"
    >
      <div class="daily-growth-spark-modal" @click.stop>
        <!-- Modal header with progress indicator -->
        <div class="modal-header">
          <h2 class="modal-title">Daily Growth Spark</h2>
          <div class="progress-bar">
            <div class="progress-steps">
              <div
                v-for="(step, index) in [
                  'Focus Game',
                  'Energy Check',
                  'Share Insight',
                ]"
                :key="index"
                :class="[
                  'progress-step',
                  {
                    active: getStageIndex(currentStage) === index,
                    completed: getStageIndex(currentStage) > index,
                  },
                ]"
              >
                <div class="step-circle">{{ index + 1 }}</div>
                <div class="step-label">{{ step }}</div>
              </div>
            </div>
            <div class="progress-line">
              <div
                class="progress-filled"
                :style="`width: ${progressPercentage}%`"
              ></div>
            </div>
          </div>
          <button class="close-button" @click="confirmClose" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-content">
          <!-- Stage 1: Emoji Game -->
          <div v-if="currentStage === 'emoji'" class="emoji-game">
            <div class="stage-header">
              <h3>{{ gamePrompt }}</h3>
              <div class="streak-counter">
                <div class="streak-icon" :class="{ active: winCount >= 1 }">
                  🔥
                </div>
                <div class="streak-icon" :class="{ active: winCount >= 2 }">
                  🔥
                </div>
                <div class="streak-icon" :class="{ active: winCount >= 3 }">
                  🔥
                </div>
              </div>
            </div>
            <div class="emoji-container">
              <div
                v-for="(emoji, index) in emojiSet"
                :key="index"
                @click="handleEmojiClick(index)"
                :class="{
                  'emoji-card': true,
                  selected: selectedIndex === index,
                  correct: isCorrect && selectedIndex === index,
                  wrong: isWrong && selectedIndex === index,
                }"
              >
                <span class="emoji">{{ emoji }}</span>
              </div>
            </div>
            <div
              v-if="feedback"
              class="feedback"
              :class="{
                'feedback-success': isCorrect,
                'feedback-error': isWrong,
              }"
            >
              {{ feedback }}
            </div>
            <button
              v-if="gameComplete"
              @click="nextRound"
              class="action-button"
            >
              {{ winCount >= 3 ? "Continue" : "Next Round" }}
            </button>
          </div>

          <!-- Stage 2: Energy Tracker -->
          <div v-if="currentStage === 'energy'" class="energy-tracker">
            <h3>How's Your Energy Today?</h3>
            <div class="energy-level-display">
              <div class="energy-emoji">{{ energyEmoji }}</div>
              <div class="energy-label">
                {{ energyLevel }} - {{ energyFeedback }}
              </div>
            </div>
            <div class="slider-container">
              <span class="slider-label low">Low</span>
              <input
                type="range"
                id="energy"
                v-model="energyLevel"
                min="0"
                max="10"
                step="1"
                class="energy-slider"
              />
              <span class="slider-label high">High</span>
            </div>

            <div class="wellness-check">
              <h4>Quick Wellness Check</h4>
              <div class="wellness-items">
                <div
                  v-for="(item, index) in wellnessItems"
                  :key="index"
                  :class="['wellness-item', { selected: item.selected }]"
                  @click="toggleWellnessItem(index)"
                >
                  <span class="wellness-emoji">{{ item.emoji }}</span>
                  <span class="wellness-label">{{ item.label }}</span>
                </div>
              </div>
            </div>

            <button @click="submitEnergy" class="action-button">
              Continue
            </button>
          </div>

          <!-- Stage 3: Tip Input -->
          <div v-if="currentStage === 'tip'" class="tip-input">
            <h3>Share Your Growth Insight</h3>
            <p class="tip-description">
              What's one thing that helped you grow today? Share it to inspire
              others.
            </p>

            <div class="tip-categories">
              <span
                v-for="(category, index) in tipCategories"
                :key="index"
                :class="[
                  'tip-category',
                  { active: selectedCategory === category },
                ]"
                @click="selectedCategory = category"
              >
                {{ category }}
              </span>
            </div>

            <div class="input-container">
              <textarea
                id="tip"
                v-model="tip"
                placeholder="Enter a growth tip, insight or reminder..."
                rows="3"
                maxlength="280"
              ></textarea>
              <div class="char-counter">{{ tip.length }}/280</div>
            </div>

            <div class="anonymous-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="isAnonymous" />
                <span class="toggle-slider"></span>
              </label>
              <span>Share anonymously</span>
            </div>

            <div class="action-buttons">
              <button @click="skipTip" class="secondary-button">Skip</button>
              <button
                @click="submitTip"
                class="action-button"
                :disabled="tip.trim() === ''"
              >
                Submit & Complete
              </button>
            </div>
          </div>

          <!-- Final Stage: Success -->
          <div v-if="currentStage === 'success'" class="success-message">
            <div class="success-icon">✅</div>
            <h3>Awesome Job!</h3>
            <p>
              You've completed today's Growth Spark. Check back tomorrow for a
              new challenge!
            </p>
            <div class="streak-message">
              <span class="streak-icon">🔥</span>
              <span>{{ streakDays }} day streak</span>
            </div>
            <button @click="closeModal" class="action-button">Finish</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div
      v-if="showConfirmation"
      class="confirmation-overlay"
      @click="cancelClose"
    >
      <div class="confirmation-dialog" @click.stop>
        <h3>Are you sure?</h3>
        <p>Your progress will be lost if you exit now.</p>
        <div class="confirmation-buttons">
          <button @click="cancelClose" class="secondary-button">Cancel</button>
          <button @click="closeModal" class="danger-button">Exit</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Modal visibility
const isVisible = ref(true);
const showConfirmation = ref(false);

// Stage control
const currentStage = ref("emoji"); // 'emoji', 'energy', 'tip', 'success'

// Progress calculation
const getStageIndex = (stage) => {
  const stages = ["emoji", "energy", "tip", "success"];
  return stages.indexOf(stage);
};

const progressPercentage = computed(() => {
  const currentIndex = getStageIndex(currentStage.value);
  const totalStages = 3; // Excluding success stage
  return Math.min(100, (currentIndex / totalStages) * 100);
});

// Streak tracking
const streakDays = ref(1);

onMounted(() => {
  // Simulate loading streak from localStorage or API
  const savedStreak = localStorage.getItem("growthStreak");
  if (savedStreak) {
    streakDays.value = parseInt(savedStreak);
  }
});

// Emoji game logic - Extended with more variety
const emojiSets = [
  {
    emojis: ["😊", "😊", "😢"],
    correctIndex: 2,
    prompt: "Spot the odd emotion!",
  },
  {
    emojis: ["🍎", "🍏", "🍎"],
    correctIndex: 1,
    prompt: "Find the different fruit!",
  },
  {
    emojis: ["🐱", "🐶", "🐱"],
    correctIndex: 1,
    prompt: "Which animal doesn't match?",
  },
  {
    emojis: ["🌟", "🌟", "☀️"],
    correctIndex: 2,
    prompt: "Find the unique light!",
  },
  {
    emojis: ["🚀", "✈️", "🚀"],
    correctIndex: 1,
    prompt: "Spot the different vehicle!",
  },
  {
    emojis: ["🎉", "🎉", "🎁"],
    correctIndex: 2,
    prompt: "Which celebration icon is unique?",
  },
  {
    emojis: ["🌍", "🌎", "🌕"],
    correctIndex: 2,
    prompt: "Find the celestial body that's not a planet!",
  },
  {
    emojis: ["🏆", "🏆", "🥇"],
    correctIndex: 2,
    prompt: "Spot the different achievement symbol!",
  },
  {
    emojis: ["💻", "📱", "💻"],
    correctIndex: 1,
    prompt: "Which tech device is different?",
  },
  {
    emojis: ["🧠", "🧠", "❤️"],
    correctIndex: 2,
    prompt: "Mind or heart? Find the odd one out!",
  },
];

const currentSetIndex = ref(Math.floor(Math.random() * emojiSets.length));
const emojiSet = ref(emojiSets[currentSetIndex.value].emojis);
const correctIndex = ref(emojiSets[currentSetIndex.value].correctIndex);
const gamePrompt = computed(() => emojiSets[currentSetIndex.value].prompt);

const selectedIndex = ref(null);
const isCorrect = ref(false);
const isWrong = ref(false);
const feedback = ref("");
const gameComplete = ref(false);
const winCount = ref(0);

const handleEmojiClick = (index) => {
  if (selectedIndex.value !== null || gameComplete.value) return;
  selectedIndex.value = index;

  if (index === correctIndex.value) {
    isCorrect.value = true;
    feedback.value = "Great job! Your focus is on point.";
    winCount.value += 1;
    gameComplete.value = true;
  } else {
    isWrong.value = true;
    feedback.value = "Not quite right. Keep building your focus!";
    setTimeout(() => {
      gameComplete.value = true;
    }, 1000);
  }
};

const nextRound = () => {
  if (winCount.value >= 3) {
    currentStage.value = "energy"; // Move to energy stage
    feedback.value = "";
    return;
  }

  // Get a new random emoji set
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * emojiSets.length);
  } while (newIndex === currentSetIndex.value);
  currentSetIndex.value = newIndex;

  emojiSet.value = emojiSets[currentSetIndex.value].emojis;
  correctIndex.value = emojiSets[currentSetIndex.value].correctIndex;
  selectedIndex.value = null;
  isCorrect.value = false;
  isWrong.value = false;
  feedback.value = "";
  gameComplete.value = false;
};

// Energy level logic - Enhanced with emojis
const energyLevel = ref(5);
const energyFeedback = computed(() => {
  if (energyLevel.value <= 3) return "Low energy day";
  if (energyLevel.value <= 7) return "Steady energy";
  return "High energy peak";
});

const energyEmoji = computed(() => {
  if (energyLevel.value <= 2) return "😴";
  if (energyLevel.value <= 4) return "😌";
  if (energyLevel.value <= 6) return "😊";
  if (energyLevel.value <= 8) return "😃";
  return "🤩";
});

// Wellness check items
const wellnessItems = ref([
  { emoji: "💤", label: "Well rested", selected: false },
  { emoji: "💪", label: "Exercised", selected: false },
  { emoji: "🥗", label: "Healthy food", selected: false },
  { emoji: "🧘", label: "Meditated", selected: false },
  { emoji: "📚", label: "Learned", selected: false },
  { emoji: "🤝", label: "Connected", selected: false },
]);

const toggleWellnessItem = (index) => {
  wellnessItems.value[index].selected = !wellnessItems.value[index].selected;
};

const submitEnergy = () => {
  currentStage.value = "tip"; // Move to tip stage
};

// Tip input logic - Enhanced with categories
const tip = ref("");
const isAnonymous = ref(false);
const tipCategories = ref([
  "Work",
  "Health",
  "Mindfulness",
  "Relationships",
  "Learning",
]);
const selectedCategory = ref("Mindfulness");

const submitTip = () => {
  // Save data to API or localStorage
  const growthData = {
    date: new Date().toISOString(),
    gameResults: { wins: winCount.value },
    energy: {
      level: energyLevel.value,
      wellnessFactors: wellnessItems.value
        .filter((item) => item.selected)
        .map((item) => item.label),
    },
    insight: {
      text: tip.value,
      category: selectedCategory.value,
      isAnonymous: isAnonymous.value,
    },
  };

  console.log("Daily Growth Spark completed:", growthData);

  // In a real app, you'd send this to your backend
  // await $fetch('/api/growth-spark', { method: 'POST', body: growthData })

  // Update streak in localStorage
  localStorage.setItem("growthStreak", (streakDays.value + 1).toString());
  localStorage.setItem("lastGrowthSpark", new Date().toDateString());

  // Show success message
  currentStage.value = "success";
};

const skipTip = () => {
  // Skip insight but still record other data
  const growthData = {
    date: new Date().toISOString(),
    gameResults: { wins: winCount.value },
    energy: {
      level: energyLevel.value,
      wellnessFactors: wellnessItems.value
        .filter((item) => item.selected)
        .map((item) => item.label),
    },
    insight: null,
  };

  console.log("Daily Growth Spark completed (tip skipped):", growthData);
  currentStage.value = "success";
};

// Modal control
const handleOverlayClick = (event) => {
  if (event.target.classList.contains("daily-growth-spark-overlay")) {
    confirmClose();
  }
};

const confirmClose = () => {
  showConfirmation.value = true;
};

const cancelClose = () => {
  showConfirmation.value = false;
};

const closeModal = () => {
  isVisible.value = false;
  showConfirmation.value = false;
};
</script>

<style scoped>
/* Base Modal Styling */
.daily-growth-spark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(4px);
}

.daily-growth-spark-modal {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  animation: fadeInUp 0.3s ease-out;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.close-button {
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-button:hover {
  color: #555;
  background: #f5f5f5;
}

.modal-content {
  padding: 24px;
  overflow-y: auto;
}

/* Progress Bar */
.progress-bar {
  margin-top: 16px;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 4px;
  transition: all 0.3s;
}

.step-label {
  font-size: 0.75rem;
  color: #666;
  transition: all 0.3s;
}

.progress-step.active .step-circle {
  background-color: #3b82f6;
  color: white;
}

.progress-step.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.progress-step.completed .step-circle {
  background-color: #10b981;
  color: white;
}

.progress-line {
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  position: relative;
  margin-top: 4px;
}

.progress-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Emoji Game Styling */
.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.streak-counter {
  display: flex;
  gap: 4px;
}

.streak-icon {
  font-size: 1.2rem;
  opacity: 0.3;
  transition: opacity 0.3s, transform 0.3s;
}

.streak-icon.active {
  opacity: 1;
  transform: scale(1.1);
}

.emoji-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
}

.emoji-card {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.emoji-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.emoji {
  font-size: 3rem;
}

.emoji-card.selected {
  border-color: #3b82f6;
}

.emoji-card.correct {
  background: #d1fae5;
  border-color: #10b981;
  transform: scale(1.1);
}

.emoji-card.wrong {
  background: #fee2e2;
  border-color: #ef4444;
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.feedback {
  margin: 16px 0;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.feedback-success {
  background-color: #d1fae5;
  color: #047857;
}

.feedback-error {
  background-color: #fee2e2;
  color: #b91c1c;
}

/* Energy Tracker Styling */
.energy-tracker {
  text-align: center;
}

.energy-level-display {
  margin: 20px 0;
}

.energy-emoji {
  font-size: 3rem;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.energy-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.slider-container {
  display: flex;
  align-items: center;
  margin: 24px 0;
  padding: 0 12px;
}

.slider-label {
  font-size: 0.9rem;
  color: #666;
  width: 40px;
}

.slider-label.low {
  text-align: right;
}

.slider-label.high {
  text-align: left;
}

.energy-slider {
  flex: 1;
  height: 8px;
  appearance: none;
  margin: 0 12px;
  background: linear-gradient(to right, #f87171, #fbbf24, #34d399);
  border-radius: 4px;
  outline: none;
}

.energy-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #3b82f6;
  cursor: pointer;
  transition: all 0.2s;
}

.energy-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Wellness Check */
.wellness-check {
  margin-top: 24px;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
}

.wellness-check h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #333;
}

.wellness-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.wellness-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 80px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e0e0e0;
}

.wellness-item:hover {
  background: #f0f7ff;
}

.wellness-item.selected {
  background: #3b82f6;
  color: white;
}

.wellness-emoji {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.wellness-label {
  font-size: 0.8rem;
  text-align: center;
}

/* Tip Input Styling */
.tip-input {
  text-align: center;
}

.tip-description {
  color: #666;
  margin-bottom: 20px;
}

.tip-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.tip-category {
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.tip-category:hover {
  background: #e2e8f0;
}

.tip-category.active {
  background: #3b82f6;
  color: white;
}

.input-container {
  position: relative;
  margin-bottom: 16px;
}

textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.char-counter {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 0.8rem;
  color: #888;
}

.anonymous-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #555;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #3b82f6;
}

input:checked + .toggle-slider:before {
  transform: translateX(16px);
}

/* Success Message Styling */
.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  animation: bounceIn 0.6s;
}

.streak-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;
  padding: 12px;
  background: #fff7ed;
  border-radius: 8px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.streak-message .streak-icon {
  opacity: 1;
}

/* Confirmation Dialog */
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-dialog {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 300px;
  text-align: center;
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

/* Buttons */
.action-button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.action-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.secondary-button {
  background-color: #f1f5f9;
  color: #475569;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background-color: #e2e8f0;
}

.danger-button {
  background-color: #ef4444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.danger-button:hover {
  background-color: #dc2626;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px) rotate(-5deg);
  }
  40% {
    transform: translateX(8px) rotate(5deg);
  }
  60% {
    transform: translateX(-4px) rotate(-3deg);
  }
  80% {
    transform: translateX(4px) rotate(3deg);
  }
  100% {
    transform: translateX(0);
  }
}
@media (max-width: 500px) {
  .daily-growth-spark-modal {
    width: 95%;
    max-width: none;
    margin: 10px;
  }
  .emoji-card {
    width: 60px;
    height: 60px;
  }
  .emoji {
    font-size: 2.5rem;
  }
  .progress-steps {
    flex-direction: column;
    gap: 8px;
  }
  .step-label {
    font-size: 0.65rem;
  }
}
.action-button:focus,
.secondary-button:focus,
.danger-button:focus,
.close-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>
