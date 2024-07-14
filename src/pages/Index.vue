<template>
  <div>
    <ul class="list">
      <li class="text-smaller">
        W15 and W16 sheets are separated into players and reapers for legacy
        reasons. Additionally, they do not have a dark theme available.
      </li>
      <li><a :href="publicPath + 'W15/players.html'"> W15 Players </a></li>
      <li><a :href="publicPath + 'W15/reapers.html'"> W15 Reapers </a></li>
    </ul>
    <ul class="list">
      <li><a :href="publicPath + 'W16/players.html'"> W16 Players </a></li>
      <li><a :href="publicPath + 'W16/reapers.html'"> W16 Reapers </a></li>
    </ul>
    <ul class="list" style="line-height:2em;">
      <li v-for="(name, slug) in weeks" :key="slug">
        <router-link :to="'/'+slug">{{ name }} Characters</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { publicPath } from "../components/mixins/utilities";

export default {
  mixins: [publicPath],
  data() {
    return {
      weeks: {}
    }
  },
  beforeMount() {
    document.title = "The Reaper's Game Character Sheets";
    for (const key in this.$settings) {
      if (this.$settings[key].excludeFromIndex) { continue; }

      this.weeks[key] = this.$settings[key].title;
    }
  }
};
</script>

<style scoped>
.list {
  list-style-type: none;
}
</style>
