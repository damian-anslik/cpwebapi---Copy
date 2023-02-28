import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import '@/styles/common.css';
import '@/styles/theme-light.css';
import '../node_modules/vue-code-highlight/themes/prism.css';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
