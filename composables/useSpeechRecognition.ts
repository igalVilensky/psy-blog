import { ref, onBeforeUnmount } from 'vue';

export const useSpeechRecognition = () => {
    const isSupported = typeof window !== 'undefined' && (!!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition);
    const isListening = ref(false);
    const transcript = ref('');
    const error = ref<string | null>(null);
    const language = ref('ru-RU');

    let recognition: any = null;
    let timeoutId: any = null;

    if (isSupported) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            isListening.value = true;
            error.value = null;
            // Safety timeout (90 seconds)
            timeoutId = setTimeout(() => {
                stop();
            }, 90000);
        };

        recognition.onresult = (event: any) => {
            let result = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    result += event.results[i][0].transcript;
                }
            }
            if (result) {
                transcript.value = result;
            }
        };

        recognition.onerror = (event: any) => {
            isListening.value = false;
            error.value = event.error;
            console.error('Speech recognition error:', event.error);
            if (timeoutId) clearTimeout(timeoutId);
        };

        recognition.onend = () => {
            isListening.value = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }

    const start = (lang = 'ru-RU') => {
        if (!recognition || isListening.value) return;

        transcript.value = '';
        recognition.lang = lang;
        language.value = lang;

        try {
            recognition.start();
        } catch (e) {
            console.error('Failed to start recognition:', e);
            error.value = 'Failed to start';
        }
    };

    const stop = () => {
        if (!recognition || !isListening.value) return;
        recognition.stop();
        isListening.value = false;
        if (timeoutId) clearTimeout(timeoutId);
    };

    onBeforeUnmount(() => {
        if (isListening.value) {
            stop();
        }
    });

    return {
        isSupported,
        isListening,
        transcript,
        error,
        start,
        stop,
        language
    };
};
