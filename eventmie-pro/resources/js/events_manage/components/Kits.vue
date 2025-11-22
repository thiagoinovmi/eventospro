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
                        <!-- Kits List -->
                        <div class="row">
                            <div class="col-md-12">
                                <div v-for="kit in kits" :key="kit.id" class="card mb-4">
                                    <div class="card-header bg-light">
                                        <h5 class="mb-0">
                                            <i class="fas fa-box"></i> {{ kit.name }}
                                        </h5>
                                        <small class="text-muted">{{ kit.description }}</small>
                                    </div>
                                    <div class="card-body">
                                        <!-- Kit Items -->
                                        <div v-if="kit.items && kit.items.length > 0" class="row">
                                            <div v-for="item in kit.items" :key="item.id" class="col-md-6 mb-4">
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
                                                                v-if="getItemImage(kit.id, item.id)" 
                                                                :src="getImageUrl(getItemImage(kit.id, item.id))" 
                                                                class="img-fluid rounded"
                                                                style="max-height: 150px; object-fit: cover;"
                                                            >
                                                            <div v-else class="bg-light rounded p-3 text-center text-muted">
                                                                <i class="fas fa-image fa-2x"></i>
                                                                <p class="mb-0 mt-2">{{ trans('em.no_image') }}</p>
                                                            </div>
                                                        </div>
                                                        <input 
                                                            type="file" 
                                                            class="form-control form-control-sm"
                                                            accept="image/*"
                                                            @change="(e) => handleImageUpload(e, kit.id, item.id)"
                                                        >
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

                        <!-- Save Button -->
                        <div class="mb-3">
                            <button 
                                type="button" 
                                class="btn btn-primary btn-lg"
                                @click="saveKits"
                                :disabled="saving"
                            >
                                <i class="fas fa-sd-card"></i> 
                                {{ saving ? trans('em.saving') : trans('em.save') }}
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
        }
    },

    computed: {
        ...mapState(['event_id', 'organiser_id', 'event']),
    },

    methods: {
        ...mapMutations(['add', 'update']),

        /**
         * Get item image from event kit items or local uploads
         */
        getItemImage(kitId, itemId) {
            const key = kitId + '_' + itemId;
            
            // Check if there's a local upload
            if(this.kitImages[key]) {
                return this.kitImages[key];
            }

            // Check if it exists in event kit items
            if(this.eventKitItems[key]) {
                return this.eventKitItems[key].image;
            }

            return null;
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
         * Save kits with images
         */
        async saveKits() {
            this.saving = true;

            try {
                // Prepare kits data
                const kitsData = this.kits.map(kit => ({
                    kit_id: kit.id,
                    items: kit.items.map(item => ({
                        kit_item_id: item.id,
                        image: this.kitImages[kit.id + '_' + item.id] || null,
                    })),
                }));

                const response = await axios.post(
                    route('myevents_store_event_kits'),
                    {
                        event_id: this.event_id,
                        kits: kitsData,
                    }
                );

                if(response.data.status) {
                    Vue.helpers.showToast('success', trans('em.saved_successfully'));
                    // Clear local images after save
                    this.kitImages = {};
                    // Reload event kits
                    this.loadEventKits();
                } else {
                    Vue.helpers.showToast('error', trans('em.error_saving'));
                }
            } catch(error) {
                console.error(error);
                Vue.helpers.showToast('error', error.response?.data?.message || trans('em.error_saving'));
            } finally {
                this.saving = false;
            }
        },

        /**
         * Load event kits
         */
        async loadEventKits() {
            try {
                const response = await axios.post(
                    route('myevents_get_event_kits'),
                    {
                        event_id: this.event_id,
                    }
                );

                if(response.data.status) {
                    this.kits = response.data.kits;
                    this.eventKitItems = response.data.event_kit_items;
                }
            } catch(error) {
                console.error(error);
                Vue.helpers.showToast('error', trans('em.error_loading_kits'));
            }
        },
    },

    mounted() {
        this.loadEventKits();
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
