import '@babel/polyfill';
// Import Component hooks before component definitions
import './component-hooks';
import Vue from 'vue';
import './plugins/vuetify';
import './plugins/vee-validate';
import App from './App.vue';
import router from './router';
import store from '@/store';
import Vuetify from 'vuetify';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
