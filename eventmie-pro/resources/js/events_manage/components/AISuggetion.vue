<template>
    <div>
        <!-- Trigger Button -->
        <div class="mb-4">
            <button
                type="button"
                class="ai-trigger-btn"
                @click="openAIModal('generate')"
            >
                <div class="ai-btn-content">
                    <div class="ai-icon-wrapper">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div class="ai-btn-text">
                        {{ aiResponses?.length > 0 || event_id > 0 ? trans('em.regenerate_with_ai') : trans('em.generate_with_ai') }}
                    </div>
                </div>
            </button>
        </div>

        <!-- Modal -->
        <div class="ai-modal-overlay" v-if="showAIModal" @click="closeAIModal">
            <div class="ai-modal-container" @click.stop>
                <div class="ai-modal-header">
                    <div class="ai-modal-title-section">
                        <div class="ai-title-icon">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <div class="ai-title-content">
                            <h3 class="ai-modal-title">
                                {{ aiResponses?.length > 0 || event_id > 0 ? trans('em.regenerate_with_ai') : trans('em.generate_with_ai') }}
                            </h3>
                            <p class="ai-modal-subtitle">
                                {{ trans('em.ai_generator_subtitle') }}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="ai-close-btn"
                        @click="closeAIModal"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="ai-modal-body bg-white">
                    <div v-if="modalMode === 'generate'" class="ai-content-section">
                        <div class="ai-input-section">
                            <label for="aiPrompt" class="ai-input-label">
                                <i class="fas fa-lightbulb ai-label-icon"></i>
                                {{ trans('em.describe_your_event') }}
                            </label>
                            <div class="ai-textarea-wrapper">
                                <textarea
                                    id="aiPrompt"
                                    class="ai-textarea"
                                    v-model="aiPrompt"
                                    rows="10"
                                    :placeholder="trans('em.ai_prompt_placeholder')"
                                ></textarea>
                                <div class="ai-textarea-footer">
                                    <div class="ai-char-count">
                                        {{ aiPrompt.length }} {{ trans('em.characters') }}
                                    </div>
                                </div>
                            </div>

                            <div class="ai-controls">
                                <div class="ai-voice-section">
                                    <button
                                        class="ai-voice-btn"
                                        :class="{ 'ai-voice-active': isListening }"
                                        @click="toggleSpeechRecognition"
                                        :disabled="!isSpeechSupported"
                                    >
                                        <i class="fas" :class="isListening ? 'fa-stop' : 'fa-microphone'"></i>
                                        <div>{{ isListening ? trans('em.stop') : trans('em.voice_input') }}</div>
                                    </button>
                                    <div v-if="isListening && speechStartTime" class="ai-voice-timer">
                                        <div class="ai-timer-dot"></div>
                                        {{ timerDisplay }}s
                                    </div>
                                </div>
                                
                                <button
                                    class="ai-clear-btn"
                                    @click="clearPrompt"
                                    :disabled="!aiPrompt"
                                >
                                    <i class="fas fa-eraser"></i>
                                    {{ trans('em.clear') }}
                                </button>
                            </div>

                            <div v-if="!isSpeechSupported" class="ai-warning">
                                <i class="fas fa-exclamation-triangle"></i>
                                {{ trans('em.voice_not_supported') }}
                            </div>
                        </div>

                        <div class="ai-generate-section">
                            <button
                                class="ai-generate-btn"
                                @click="generateAIContent"
                                :disabled="generating || !aiPrompt.trim()"
                            >
                                <div class="ai-generate-content">
                                    <div v-if="generating" class="ai-loading-spinner">
                                        <div class="ai-spinner"></div>
                                    </div>
                                    <i v-else class="fa-solid fa-wand-magic-sparkles"></i>
                                    <div>{{ generating ? trans('em.generating') : trans('em.generate_event_content') }}</div>
                                </div>
                            </button>
                            <p class="ai-generate-hint">
                                {{ trans('em.ai_generate_hint') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import mixinsFilters from '../../mixins.js';

export default {

    props: ["event_id"],
    
    data() {
        return {
            showAIModal: false,
            modalMode: 'generate',
            aiPrompt: '',
            aiResponses: [],
            generating: false,
            aiFields: [
                { value: 'name', label: 'Title', formField: 'title' },
                { value: 'slug', label: 'Slug URL', formField: 'slug' },
                { value: 'short_description', label: 'Short Description', formField: 'excerpt' },
                { value: 'long_description', label: 'Full Description', formField: 'description' },
                { value: 'faq', label: 'Frequently Asked Questions', formField: 'faq' },
                { value: 'meta_title', label: 'SEO Title', formField: 'meta_title' },
                { value: 'meta_description', label: 'SEO Description', formField: 'meta_description' },
                { value: 'meta_tags', label: 'SEO Keywords', formField: 'meta_keywords' },
            ],
            aiSelectedFields: [],
            isSpeechSupported: false,
            isListening: false,
            recognition: null,
            speechStartTime: null,
            timerInterval: null,
            timerSeconds: 0,
            transcriptTemp: '',
            finalTranscript: '',
        };
    },

    mixins:[
        mixinsFilters
    ],
    computed: {
        timerDisplay() {
            return this.timerSeconds;
        },
    },
    methods: {
        openAIModal(mode) {
            this.modalMode = mode;
            this.showAIModal = true;
            this.aiPrompt = '';
            this.aiSelectedFields = this.aiFields.map(f => f.value);
            this.loadAIResponses();
        },
        closeAIModal() {
            this.showAIModal = false;
            if (this.isListening) {
                this.recognition.stop();
                this.cleanupMic();
            }
        },
        toggleSpeechRecognition() {
            if (!this.isSpeechSupported) return;

            if (this.isListening) {
                this.recognition.stop();
                this.cleanupMic();
            } else {
                this.finalTranscript = '';
                this.aiPrompt = '';
                this.transcriptTemp = '';
                this.recognition.start();
                this.isListening = true;
                this.speechStartTime = new Date();
                this.timerSeconds = 0;
                this.timerInterval = setInterval(() => {
                    this.timerSeconds = Math.floor((new Date() - this.speechStartTime) / 1000);
                }, 1000);
            }
        },
        cleanupMic() {
            this.isListening = false;
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.speechStartTime = null;
            this.timerSeconds = 0;
        },
        clearPrompt() {
            this.aiPrompt = '';
        },
        generateAIContent() {
            if (!this.aiPrompt || this.aiSelectedFields.length === 0) {
                this.showNotification('error', trans('em.provide_prompt_and_fields'));
                return;
            }

            this.generating = true;
            
                // prepare form data for post request
                let post_url = route('eventmie.openai.handle-prompt');
                let post_data = {
                    prompt: this.aiPrompt,
                    fields: this.aiSelectedFields,
                };
                
                // axios post request
                axios.post(post_url, post_data)
                .then(response => {
                    const events = response.data.response?.events || [];

                    this.aiResponses = {
                        prompt: this.aiPrompt,
                        timestamp: new Date().toLocaleString(),
                        events,
                    };
                    localStorage.setItem('aiEventResponses', JSON.stringify(this.aiResponses));

                    if (events.length > 0) {
                        const firstEvent = events[0];
                        this.aiFields.forEach(field => {
                            if (firstEvent[field.value]) {
                                this.$set(this.$parent, field.formField, firstEvent[field.value]);
                            }
                        });
                        this.$parent.isDirty?.();
                    }
                    this.closeAIModal();
                    this.generating = false;
                })
                .catch(error => {
                    let serrors = Vue.helpers.axiosErrors(error);
                    if (serrors.length) {
                        this.serverValidate(serrors);
                    }
                    this.generating = false;
                    console.error('axios catch error', error);
                });
            
        },
        loadAIResponses() {
            const stored = localStorage.getItem('aiEventResponses');
            this.aiResponses = stored ? JSON.parse(stored) : [];
        },
    },
    mounted() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            this.isSpeechSupported = true;
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = true;
            this.recognition.continuous = true;

            this.recognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        this.finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }
                this.aiPrompt = this.finalTranscript + interimTranscript;
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.cleanupMic();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                clearInterval(this.timerInterval);
                this.timerInterval = null;
                this.speechStartTime = null;
                this.timerSeconds = 0;
            };
        }
    },
};
</script>
