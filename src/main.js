import Vue from 'vue'
import App from './App.vue'
import store from './store'
import AsyncComputed from 'vue-async-computed'
import draggable from 'vuedraggable'

// param 0: The relative path of the components folder
// param 1: Whether or not to look in subfolders
// param 2: The regular expression used to match base component filenames
const requireComponent = require.context('./globalComponents', false, /[A-Z]\w+\.vue$/ );

// Get component config
requireComponent.keys().forEach(fileName => {

    const componentConfig = requireComponent(fileName);

    // Get PascalCase name of component
    // Strip the leading `./` and extension from the filename
    const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');

    // Register component globally
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    Vue.component(componentName, componentConfig.default || componentConfig )
});

import editor from 'vue2-medium-editor'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

// Vue.component('FileList', FileList);
Vue.component('medium-editor', editor);
Vue.component('draggable', draggable);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

store.dispatch('changeRootPath','C:\\Users\\perym\\OneDrive\\Documents\\תן אמון במימון');
store.dispatch('selectSection','מרפסת');
