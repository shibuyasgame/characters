import Vue from "vue/dist/vue.js";
import VueRouter from 'vue-router';
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";
import settings from '../settings.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAddressCard, // Info card
  faAdjust, // Light mode
  faArrowsAltH, // Expand
  faBriefcase, // Position"
  faCertificate, // Resonance pin boost
  faClipboardCheck, // Copied!
  faClock, // Timezone
  faCompactDisc, // CD boost
  faCompressAlt, // Shrink
  faCopy, // Copy/Paste
  faStream, // sSettings
  faHandshake, // Partner
  faHome, // Home
  faInfoCircle, // Notes
  faListAlt, // Overview
  faMoon, // Dark mode
  faStickyNote, // About
  faSync, // Reload data
  faUser, // Mun
  faUserSecret,
  faWaveSquare, // Noise
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CharacterSheets from './pages/CharacterSheets.vue';
import Index from './pages/Index.vue';

Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.use(Toasted);
library.add(
  faAddressCard,
  faAdjust,
  faArrowsAltH,
  faBriefcase,
  faCertificate,
  faClipboardCheck,
  faClock,
  faCompactDisc,
  faCompressAlt,
  faCopy,
  faDiscord,
  faStream,
  faHandshake,
  faHome,
  faInfoCircle,
  faListAlt,
  faMoon,
  faStickyNote,
  faSync,
  faUser,
  faUserSecret,
  faWaveSquare
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.prototype.$settings = settings;

const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/:week', props: true, component: CharacterSheets },
  { path: '*', redirect: '/' }
]
const router = new VueRouter({ routes, base: '/characters/', mode: 'history' });

new Vue({
  router
}).$mount("#app");
