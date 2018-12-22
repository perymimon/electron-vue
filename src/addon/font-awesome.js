import Vue from 'vue'
import { library,dom } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

// dom.watch() // This will kick of the initial replacement of i to svg tags and configure a MutationObserver
library.add(fas);

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
Vue.component('icon', FontAwesomeIcon);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

Vue.config.productionTip = false; /*font awesome*/
