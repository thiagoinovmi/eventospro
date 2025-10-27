<template>
    <div class="row">
                    
        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-6 mb-2"
            v-match-heights="{
                el: ['h5.sub-title'],  // Array of selectors to fix
            }"
            v-for="(venue, index) in venues" 
            :key="index"
        >
            
            <div class="py-2 w-100">
                    <div class="position-relative ">
                        <a  :href="venueSlug(venue.slug)" class="text-inherit">
                            <div class="back-image rounded-3 img-hover" :style="{ 'background-image': `url( ${getImageUrl(JSON.parse(venue.images)[0])} )` }" ></div>
                        </a>
                    </div>

                    <div class="p-1">
                        <div class="card-category text-gray-700">
                            <small>{{ venue.venue_type }}</small>
                        </div>
                        <a  :href="venueSlug(venue.slug)">
                            <h6 class="text-left p-0 m-0 fw-bold lh-p2 text-dark">{{ venue.title.substring(0, 76) }}</h6>
                        </a>
                        <div class="text-sm card-venue">
                            <i class="fas fa-map-marker-alt"></i>&nbsp;
                            <span> {{ venue.city }}</span> 
                            <span>{{ venue.state}}</span> 
                            <span v-if="venue.country != null">{{ venue.country.country_name }}</span>
                        </div>
                    </div>

            </div>

        </div>
        

       

        <div class="col-12" v-if="not_found">
            <h4 class="heading text-center mt-30"><i class="fas fa-exclamation-triangle"></i> {{ trans('em.venues_not_found') }}</h4>
        </div>
        
    </div>
</template>

<script>

import mixinsFilters from '../../mixins.js';

export default {
    
    props: ['venues', 'currency', 'date_format'],

    mixins:[
        mixinsFilters
    ],

    data() {
        return {
            not_found: false,
        }
    },

    methods:{
        
        
        // return route with venue slug
        venueSlug: function venueSlug(slug) {
            return route('eventmie.venues.show',[slug]);
        }

  
    },

    watch: {
        venues: function () {
            this.not_found = false;
            if(this.venues.length <= 0)
                this.not_found = true;
        },
    },

    

}
</script>