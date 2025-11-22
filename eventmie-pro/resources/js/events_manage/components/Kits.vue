<template>
    <div class="tab-pane active">
        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title mb-3">{{ trans('em.kits') }}</h4>
                    
                    <div v-if="kits.length === 0" class="alert alert-info">
                        {{ trans('em.no_kits_available') }}
                    </div>

                    <div v-else>
                        <!-- Kit Selection -->
                        <div class="form-group mb-4">
                            <label class="form-label">
                                {{ trans('em.select_kit') }}
                            </label>
                            <select 
                                v-model="selectedKitId" 
                                class="form-control form-control-lg"
                            >
                                <option :value="null" disabled selected>{{ trans('em.select_kit_option') }}</option>
                                <option v-for="kit in kits" :key="kit.id" :value="kit.id">
                                    {{ kit.name }}
                                </option>
                            </select>
                            <small class="form-text text-muted d-block mt-2">
                                {{ trans('em.choose_kit_message') }}
                            </small>
                        </div>

                        <!-- Selected Kit Details -->
                        <div v-if="selectedKit" class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="mb-0">
                                            <i class="fas fa-box"></i> {{ selectedKit.name }}
                                        </h5>
                                        <small class="text-muted">{{ selectedKit.description }}</small>
                                    </div>
                                    <div class="card-body">
                                        <!-- Kit Items -->
                                        <div v-if="selectedKit.items && selectedKit.items.length > 0" class="row">
                                            <div v-for="item in selectedKit.items" :key="item.id" class="col-md-6 mb-4">
                                                <div class="border rounded p-3">
                                                    <h6 class="mb-2">
                                                        <i class="fas fa-cube"></i> {{ item.name }}
                                                    </h6>
                                                    <small class="text-muted d-block mb-3">{{ item.description }}</small>

                                                    <!-- Image Upload -->
                                                    <div class="mb-3">
                                                        <label class="form-label form-label-sm">
                                                            {{ trans('em.image') }}
                                                        </label>
                                                        <div class="image-preview mb-2">
                                                            <img 
                                                                v-if="getItemImage(selectedKit.id, item.id)" 
                                                                :src="getImageUrl(getItemImage(selectedKit.id, item.id))" 
                                                                class="img-fluid rounded"
                                                                style="max-height: 150px; object-fit: cover;"
                                                            >
                                                            <div v-else class="bg-light rounded p-3 text-center text-muted">
                                                                <i class="fas fa-image fa-2x"></i>
                                                                <p class="mb-0 mt-2">{{ trans('em.no_image') }}</p>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex gap-2">
                                                            <input 
                                                                :ref="`fileInput_${selectedKit.id}_${item.id}`"
                                                                type="file" 
                                                                class="form-control form-control-sm flex-grow-1"
                                                                accept="image/*"
                                                                @change="(e) => handleImageUpload(e, selectedKit.id, item.id)"
                                                            >
                                                            <button 
                                                                v-if="getItemImage(selectedKit.id, item.id)"
                                                                type="button"
                                                                class="btn btn-sm btn-danger"
                                                                @click="clearItemImage(selectedKit.id, item.id)"
                                                                title="Limpar imagem"
                                                            >
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="alert alert-warning">
                                            {{ trans('em.no_items_in_kit') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div v-else class="alert alert-info">
                            {{ trans('em.select_kit_to_edit') }}
                        </div>

                        <!-- Action Buttons -->
                        <div v-if="selectedKit" class="mb-3 d-flex gap-2">
                            <button 
                                type="button" 
                                class="btn btn-primary btn-lg flex-grow-1"
                                @click="saveKits"
                                :disabled="saving"
                            >
                                <i class="fas fa-sd-card"></i> 
                                {{ saving ? trans('em.saving') : trans('em.save') }}
                            </button>
                            <button 
                                type="button" 
                                class="btn btn-warning btn-lg"
                                @click="clearAllImages"
                                title="Limpar todas as imagens"
                            >
                                <i class="fas fa-broom"></i> 
                                {{ trans('em.clear_all') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import mixinsFilters from '../../mixins.js';

export default {
    mixins: [mixinsFilters],
    
    data() {
        return {
            kits: [],
            eventKitItems: {},
            kitImages: {}, // { kit_id_item_id: base64_image }
            saving: false,
            selectedKitId: null,
        }
    },

    computed: {
        ...mapState(['event_id', 'organiser_id', 'event']),
        
        /**
         * Get the selected kit object
         */
        selectedKit() {
            if(!this.selectedKitId) return null;
            return this.kits.find(kit => kit.id === this.selectedKitId) || null;
        },
    },

    methods: {
        ...mapMutations(['add', 'update']),

        /**
         * Get item image from event kit items or local uploads
         */
        getItemImage(kitId, itemId) {
            const key = kitId + '_' + itemId;
            
            // Check if there's a local upload
            if(this.kitImages[key] !== undefined) {
                // If explicitly set to null, it means user deleted it
                if(this.kitImages[key] === null) {
                    return null;
                }
                return this.kitImages[key];
            }

            // Check if it exists in event kit items
            if(this.eventKitItems[key]) {
                return this.eventKitItems[key].image;
            }

            return null;
        },

        /**
         * Convert image path to full URL
         */
        getImageUrl(imagePath) {
            if(!imagePath) return null;
            
            // If it's already a data URL (base64), return as is
            if(imagePath.startsWith('data:')) {
                return imagePath;
            }
            
            // If it's a relative path, prepend /storage/
            if(!imagePath.startsWith('http')) {
                return `/storage/${imagePath}`;
            }
            
            // If it's already a full URL, return as is
            return imagePath;
        },

        /**
         * Handle image upload for kit item
         */
        handleImageUpload(event, kitId, itemId) {
            const file = event.target.files[0];
            if(!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const key = kitId + '_' + itemId;
                this.kitImages[key] = e.target.result; // Store base64
            };
            reader.readAsDataURL(file);
        },

        /**
         * Clear image for a specific kit item
         */
        clearItemImage(kitId, itemId) {
            const key = kitId + '_' + itemId;
            
            // First, set to null to trigger Vue reactivity and show default image
            this.$set(this.kitImages, key, null);
            
            // Force Vue to update the DOM
            this.$forceUpdate();
            
            // Then clear the file input
            setTimeout(() => {
                const refName = `fileInput_${kitId}_${itemId}`;
                if(this.$refs[refName] && this.$refs[refName][0]) {
                    this.$refs[refName][0].value = '';
                }
            }, 0);
            
            Vue.helpers.showToast('warning', trans('em.image_deleted_need_save'));
        },

        /**
         * Clear all images for the selected kit
         */
        clearAllImages() {
            if(!this.selectedKit) return;
            
            if(confirm(trans('em.confirm_clear_all_images'))) {
                // First, set all images to null to trigger Vue reactivity
                this.selectedKit.items.forEach(item => {
                    const key = this.selectedKitId + '_' + item.id;
                    this.$set(this.kitImages, key, null);
                });
                
                // Force Vue to update the DOM
                this.$forceUpdate();
                
                // Then clear all file inputs
                setTimeout(() => {
                    this.selectedKit.items.forEach(item => {
                        const refName = `fileInput_${this.selectedKitId}_${item.id}`;
                        if(this.$refs[refName] && this.$refs[refName][0]) {
                            this.$refs[refName][0].value = '';
                        }
                    });
                }, 0);
                
                Vue.helpers.showToast('warning', trans('em.all_images_deleted_need_save'));
            }
        },

        /**
         * Save kits with images
         */
        async saveKits() {
            if(!this.selectedKitId) {
                Vue.helpers.showToast('error', trans('em.select_kit_first'));
                return;
            }
            
            this.saving = true;

            try {
                // Use FormData to handle large base64 images
                const formData = new FormData();
                formData.append('event_id', this.event_id);
                
                // Prepare kits data - only send the selected kit
                const kitsData = [{
                    kit_id: this.selectedKitId,
                    items: this.selectedKit.items.map(item => {
                        const key = this.selectedKitId + '_' + item.id;
                        // Use image from kitImages (which includes both new uploads and DB images)
                        const image = this.kitImages[key] || null;
                        return {
                            kit_item_id: item.id,
                            image: image,
                        };
                    }),
                }];

                formData.append('kits', JSON.stringify(kitsData));

                const response = await axios.post(
                    route('eventmie.myevents_store_event_kits'),
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );

                if(response.data.status) {
                    Vue.helpers.showToast('success', trans('em.saved_successfully'));
                    
                    // Clear all file inputs
                    this.$nextTick(() => {
                        if(this.selectedKit && this.selectedKit.items) {
                            this.selectedKit.items.forEach(item => {
                                const refName = `fileInput_${this.selectedKitId}_${item.id}`;
                                if(this.$refs[refName] && this.$refs[refName][0]) {
                                    this.$refs[refName][0].value = '';
                                }
                            });
                        }
                    });
                    
                    // Don't clear kitImages - they are needed for display
                    // Just reload to sync with database
                    this.loadEventKits();
                } else {
                    Vue.helpers.showToast('error', trans('em.error_saving'));
                }
            } catch(error) {
                console.error('Full error:', error);
                console.error('Error response:', error.response?.data);
                
                let errorMsg = trans('em.error_saving');
                if(error.response?.data?.message) {
                    errorMsg = error.response.data.message;
                } else if(error.response?.data?.errors) {
                    errorMsg = Object.values(error.response.data.errors).flat().join(', ');
                } else if(error.response?.data) {
                    // Se for um objeto, tenta extrair a mensagem
                    console.error('Error data:', JSON.stringify(error.response.data));
                    errorMsg = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
                }
                
                Vue.helpers.showToast('error', errorMsg);
            } finally {
                this.saving = false;
            }
        },

        /**
         * Load event kits
         */
        async loadEventKits() {
            if(!this.event_id) {
                console.warn('Event ID not available yet');
                return;
            }

            try {
                const response = await axios.post(
                    route('eventmie.myevents_get_event_kits'),
                    {
                        event_id: this.event_id,
                    }
                );

                if(response.data.status) {
                    this.kits = response.data.kits || [];
                    this.eventKitItems = response.data.event_kit_items || {};
                    
                    // Load existing images from database into kitImages
                    // This ensures they are preserved when saving
                    Object.keys(this.eventKitItems).forEach(key => {
                        if(this.eventKitItems[key].image && !this.kitImages[key]) {
                            // Only load from DB if not already in kitImages (user hasn't uploaded new one)
                            this.kitImages[key] = this.eventKitItems[key].image;
                        }
                    });
                    
                    if(this.kits.length === 0) {
                        console.info('No kits available for this event');
                    }
                } else {
                    Vue.helpers.showToast('error', trans('em.error_loading_kits'));
                }
            } catch(error) {
                console.error('Error loading kits:', error);
                
                // Mostrar mensagem de erro mais detalhada
                let errorMsg = trans('em.error_loading_kits');
                if(error.response?.data?.message) {
                    errorMsg = error.response.data.message;
                }
                
                Vue.helpers.showToast('error', errorMsg);
            }
        },
    },

    mounted() {
        // Aguardar um pouco para garantir que event_id está disponível
        this.$nextTick(() => {
            if(this.event_id) {
                this.loadEventKits();
            }
        });
    },
    
    watch: {
        event_id(newVal) {
            if(newVal) {
                this.loadEventKits();
            }
        }
    },
}
</script>

<style scoped>
.image-preview {
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    border: 1px solid #e3e6f0;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.card-header {
    border-bottom: 1px solid #e3e6f0;
}
</style>
