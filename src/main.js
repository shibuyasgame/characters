import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";
import App from "./App";
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
  faHandshake, // Partner
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
  faHandshake,
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
Vue.prototype.$currencySymbol = window.currencySymbolOverride || "¥";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
