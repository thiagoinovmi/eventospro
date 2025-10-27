<template>
  <div class="row g-1" :class="{ 'h-scroll': (!dark_mode), 'h-scroll-dark': (dark_mode) }">
    <div v-for="(category, index) in categories" :key="index" class="col-auto card card-cat p-3 me-2">
        <a class="text-white" :href="categoryUrl(category.name)">
          <div class="position-relative">
            <img

              :src="getImageUrl(category.icon)"
              class="img-fluid mb-2"
              :style="{width:'32px', height:'32px'}"
            />
          </div>
          <div class="lh-1 fw-normal text-start text-xxs text-white">
              {{ category.name.substring(0, 25)+ `${category.name.length > 25 ? '..' : '' }`}} 
          </div>
        </a>
    </div>
  </div>
</template>

<script>
import mixinsFilters from '../mixins.js';

export default {
  mixins: [mixinsFilters],

  props: ["categories", "dark_mode"],
                        
  methods: {
    categoryUrl(name) {
      return route('eventmie.events_index')+'?category='+encodeURIComponent(name);
    },  
  },

  mounted() {
    console.log(this.dark_mode, 'dark_mode');
  }

};
</script>