import { ref, reactive, computed } from 'vue';

export const useSoundTherapy = () => {
    // State for the Sound Mix Builder
    const mixState = reactive({
        isPlaying: false,
        volume: 0.5,
        activeTracks: {} // { trackId: volume }
    });

    // State for Brainwave Generator
    const brainwaveState = reactive({
        isPlaying: false,
        frequency: 10, // Alpha
        type: 'sine',
        volume: 0.5
    });

    // User Preferences / Diagnostic Results
    const userPreferences = reactive({
        calmness: 0,
        focus: 0,
        energy: 0,
        favoriteSounds: []
    });

    // Diagnostic Data
    const diagnosticResults = ref(null);

    // Actions
    const toggleMixPlay = () => {
        mixState.isPlaying = !mixState.isPlaying;
    };

    const setTrackVolume = (trackId, volume) => {
        mixState.activeTracks[trackId] = volume;
    };

    const toggleBrainwave = () => {
        brainwaveState.isPlaying = !brainwaveState.isPlaying;
    };

    const setBrainwaveFrequency = (freq) => {
        brainwaveState.frequency = freq;
    };

    const saveDiagnosticResult = (results) => {
        diagnosticResults.value = results;
        // Simple rule-based mapping
        userPreferences.calmness = results.reduce((acc, curr) => acc + curr.calmness, 0) / results.length;
        userPreferences.focus = results.reduce((acc, curr) => acc + curr.pleasantness, 0) / results.length; // Proxy

        // Save to localStorage
        if (process.client) {
            localStorage.setItem('mindq_sound_prefs', JSON.stringify(userPreferences));
        }
    };

    // Load from localStorage on init
    if (process.client) {
        const saved = localStorage.getItem('mindq_sound_prefs');
        if (saved) {
            Object.assign(userPreferences, JSON.parse(saved));
        }
    }

    return {
        mixState,
        brainwaveState,
        userPreferences,
        diagnosticResults,
        toggleMixPlay,
        setTrackVolume,
        toggleBrainwave,
        setBrainwaveFrequency,
        saveDiagnosticResult
    };
};
