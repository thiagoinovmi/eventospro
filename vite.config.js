import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import laravel from "laravel-vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: [
        "eventmie-pro/resources/js/events_manage/index.js",
        "eventmie-pro/resources/js/events_show/index.js",
        "eventmie-pro/resources/js/events_listing/index.js",
        "eventmie-pro/resources/js/myevents/index.js",
        "eventmie-pro/resources/js/bookings_customer/index.js",
        "eventmie-pro/resources/js/bookings_organiser/index.js",
        "eventmie-pro/resources/js/welcome/index.js",
        "eventmie-pro/resources/js/tags_manage/index.js",
        "eventmie-pro/resources/js/venues_manage/index.js",
        "eventmie-pro/resources/js/ticket_scanner/index.js",
        "eventmie-pro/resources/js/event_earning/index.js",
        "eventmie-pro/resources/js/venues_listing/index.js",
        "eventmie-pro/resources/js/profile/index.js",
        "eventmie-pro/resources/js/register/index.js",
        "eventmie-pro/resources/sass/theme.scss",
        "eventmie-pro/resources/sass/vendor.scss",
      ],
      refresh: true,
    }),
    vue2(),
  ],

  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: "localhost",
      port: 5173,
      protocol: "http",
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        sassOptions: {
          quietDeps: true,
        },
      },
    },
    postcss: "./postcss.config.js",
  },

  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      external: [],
    },
    sourcemap: true,
    minify: false,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
      "vuex$": "vuex/dist/vuex.esm.js",
      "vue2-google-maps": "vue2-google-maps/dist/vue-google-maps.js",
      "MarkerClusterer": path.resolve(__dirname, "node_modules/@googlemaps/markerclusterer"),
      "vue": "vue/dist/vue.esm.js",
      "vue-match-heights": path.resolve(__dirname, "node_modules/vue-match-heights/dist/vue-match-heights.js"),
      "vue-confirm-dialog": path.resolve(__dirname, "node_modules/vue-confirm-dialog/src/index.js"),
      //"vee-validate": path.resolve(__dirname, "node_modules/vee-validate/dist/vee-validate.js"),
      //"vee-validate": path.resolve(__dirname, "node_modules/vee-validate/dist/vee-validate.esm.js"),
      //'vee-validate': path.resolve(__dirname, 'node_modules/vee-validate/dist/vee-validate.mjs'),
      // "vue-multiselect": path.resolve(__dirname, "node_modules/vue-multiselect/dist/vue-multiselect.esm.js"),
      //'vue-multiselect': path.resolve(__dirname, 'node_modules/vue-multiselect/dist/vue-multiselect.min.js'),
      "vue-gallery": path.resolve(__dirname, "node_modules/vue-gallery/dist/vue-gallery.js"),
      "vue-croppa": path.resolve(__dirname, 'node_modules/vue-croppa/dist/vue-croppa.js'),
      'vue2-editor': path.resolve(__dirname, 'node_modules/vue2-editor/dist/vue2-editor.umd.js'),
      //'vue-progressbar': path.resolve(__dirname, 'node_modules/vue-progressbar/src/index.js'),
      'vue-progressbar': path.resolve(__dirname, 'node_modules/vue-progressbar/dist/vue-progressbar.js'),
      //"vue-qrcode-reader": path.resolve(__dirname, "node_modules/vue-qrcode-reader/dist/vue-qrcode-reader.js"),
      //'vue-qrcode-reader': path.resolve(__dirname, 'node_modules/vue-qrcode-reader/dist/vue-qrcode-reader.js'),
      //"vue-cookie-law": path.resolve(__dirname, "node_modules/vue-cookie-law/dist/vue-cookie-law.umd.js"),
      'vue-cookie-law': path.resolve(__dirname, 'node_modules/vue-cookie-law/dist/vue-cookie-law.js'),

    },
  },

  optimizeDeps: {
    include: ["@googlemaps/markerclusterer", "vue","vue-router", "vee-validate", "vue-multiselect", "vue-progressbar", "vue-qrcode-reader", "vue-cookie-law", "vue-croppa", "vue2-editor"],
  },

  commonjsOptions: {
    transformMixedEsModules: true,
    defaultIsModuleExports: true, // ajuda require('vue') a virar o default correto
  },
});
