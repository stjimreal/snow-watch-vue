/*
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-29 16:40:20
 */
import {createApp} from 'vue';
// import { ElMenu, ElImage } from 'element-plus';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// import 'element-plus/lib/theme-chalk/el-image.css';
// import 'element-plus/lib/theme-chalk/el-menu.css';
// import Vue from 'vue';
import App from './App.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import 'leaflet/dist/leaflet.css';
import '@/assets/main.css';

import router from "./router";

Axios.defaults.baseURL = '/snow-watch'
Axios.defaults.headers.get['Content-Type'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(VueAxios, Axios);
app.mount('#app')
