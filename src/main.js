import Vue from 'vue'
import App from './App.vue'
import store from './store'
import AsyncComputed from 'vue-async-computed'
import FileList from './globalComponents/FileList'

import editor from 'vue2-medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

Vue.component('FileList', FileList);
Vue.component('medium-editor', editor);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

