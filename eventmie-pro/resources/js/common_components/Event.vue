<template>

    <div class="px-2 px-lg-3 py-2 w-100">
        <!-- listing block -->
        <div>
            <div class="position-relative">
                <div class="card-top d-flex justify-content-between align-items-center py-1 rounded-3 rounded-bs-0 rounded-be-0">
                    <!-- repetitive events who Upcoming top-left -->
                    <span class="badge text-white">
                        {{ changeDateFormat(userTimezone(event.start_date+' '+event.start_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), "YYYY-MM-DD") }}
                    </span>

                    <!-- Repetitive info bottom left -->
                     <!-- event ended -->
                    <span class="d-inline-flex badge bg-danger" 
                        v-if="!event.repetitive && moment().format('YYYY-MM-DD') > userTimezone(event.end_date+' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')">
                        <i class="fas fa-ban"></i> &nbsp;{{ trans('em.ended') }}
                    </span>
                    <span class="d-inline-flex badge bg-danger" 
                        v-else-if="event.repetitive && moment().format('YYYY-MM-DD') > userTimezone(event.end_date+' '+event.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')" >
                        <i class="fas fa-ban"></i> &nbsp;{{ trans('em.ended') }}
                    </span>
                    <span v-else-if="event.repetitive" class="d-inline-flex badge"><i class="fas fa-repeat"></i> &nbsp;
                        <span v-if="event.repetitive_type == 1">{{ trans('em.daily') }}</span>
                        <span v-else-if="event.repetitive_type == 2">{{ trans('em.weekly') }}</span>
                        <span v-else-if="event.repetitive_type == 3">{{ trans('em.monthly') }}</span>
                    </span>
                </div>

                <a  :href="eventSlug(event.slug)" class="text-inherit">
                    <div class="thumb-img-bg rounded-3 prevent_draggable rounded-ts-0 rounded-te-0" 
                         :style="{ 'background-image': `url(${getImageUrl(event.thumbnail)})`}" >
                        <img class="thumb-img prevent_draggable" :src="getImageUrl(event.thumbnail)" :alt="event.title" />
                    </div>
                </a>
                
                <!-- Seasonal info bottom right -->
                <span v-if="event.merge_schedule" class="d-inline-flex badge font-size-p7 bg-secondary position-absolute bottom-0 mb-5 end-0 rounded-be-0 rounded-te-0 "><i class="fas fa-stopwatch-20"></i> &nbsp;{{ trans('em.seasonal_tickets') }}</span>
                <span v-if="event.featured > 0" class="d-inline-flex badge font-size-p7 bg-success position-absolute bottom-0 mb-2 end-0  rounded-be-0 rounded-te-0 "><i class="fas fa-medal"></i> {{ trans('em.featured') }}</span>
                
            </div>
            <div class="rounded-bottom border-0 mb-lg-0">
                <div class="d-flex justify-content-between">
                    <div class="card-category text-gray-700">
                        <small>{{ event.category_name }}</small>
                    </div>  
                </div>
                
                <div>
                    <h6 class="text-left p-0 m-0 fw-bold lh-p2">
                        <a  :href="eventSlug(event.slug)" class="text-inherit">
                        {{ event.title.substring(0, 76) }} 
                        </a>
                    </h6>
                </div>
                
                <div class="card-venue">
                    <span v-if="event.venues.length > 0"><i class="fas fa-map-marker-alt"></i>&nbsp;{{event.venues[0].title}},&nbsp;{{event.venues[0].city}}</span>
                    &nbsp;<span v-if="event.online_location" class="text-success"><i class="fas fa-circle-play"></i> &nbsp;{{ trans('em.online_event') }}</span>
                </div>
                
                <hr class="card-hr">
                <div class="d-flex justify-content-between" v-if="event.tickets.length > 0">
                    <span class="h6 lh-p2 fw-semibold">{{ trans('em.starts') }} {{`${currency} ${event.tickets[0].price}`  }}</span>
                </div>    
                
            </div>
        </div>
        <!-- listing block -->
    </div>
           
   
</template>

<script>

import mixinsFilters from '../mixins.js';

export default {
    
    props: ['event', 'currency', 'date_format'],


    mixins:[
        mixinsFilters
    ],

    data() {
        return {
        }
    },

    methods:{
        
        // check free tickets of events
        checkFreeTickets(event_tickets = []){
            let free = false;
            event_tickets.forEach(function(value, key) {
                if(parseFloat(value.price) <= parseFloat(0))
                {
                    free = true;
                }
            });    
            return free;
        },

        
        // return route with event slug
        eventSlug: function eventSlug(slug) {
            return route('eventmie.events_show', [slug]);
        }

  
    },

    mounted(){      
    }

}
</script>