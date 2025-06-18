import { createApp } from "vue";
import App from "./App.vue";

import './assets/main.css'

// Element Plus
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import es from 'element-plus/es/locale/lang/es';

const app = createApp(App);

app.use(ElementPlus, { locale: es });
app.mount('#app');
