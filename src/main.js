import { createApp } from 'vue'
//import Vue from 'vue'
//import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false

// Vue.useAttrs(VueRouter);

// new Vue({
//     router,
//     rencder: h => h(App)
// }).$mount('#app');

//App.usw(router)
createApp(App).use(router).mount('#app');
