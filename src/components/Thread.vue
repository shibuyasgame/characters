<template>
  <Item :url="url" :background="colors[data.Brand]">
    <template #info>
      <div>
        <div class="flex">
          <span class="text-smaller">{{ data.ID }}</span>
          <b>{{ data.Name }}</b>
          <span class="text-smaller">BRV: {{ data.BRV }}</span>
        </div>
        <div class="text-small">
          {{ boosts }}
          <span v-if="boosts && data.Other">||</span>
          <span v-if="data.Other">{{ data.Other }}</span>
        </div>
      </div>
      <img
        v-if="hasLogo.includes(data.Brand)"
        :src="publicPath + `logos/${data.Brand}.png`"
      />
      <div
        v-else
        :style="{
          color: fontColors[data.Brand],
          fontFamily: fontFamilies[data.Brand],
          padding: '10px',
        }"
      >
        {{ data.Brand.startsWith("Unbranded") ? "" : data.Brand }}
      </div>
    </template>
  </Item>
</template>

<script>
import { brandData } from "./mixins/utilities";
import Item from "./Item";

export default {
  mixins: [brandData],
  components: {
    Item,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    useLegacyItemImages: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      publicPath: import.meta.env.BASE_URL,
    };
  },
  computed: {
    url() {
      const id = this.data.ID.replace("#", "");
      if (this.useLegacyItemImages && (Number(id) < 300)) {
        return this.publicPath + `threads/${id} ${this.data.Name}.png`;
      }
      if (this.data.ImgSM) {
        return this.data.ImgSM;
      }
      return this.publicPath + "threads/000.png";
    },
    boosts() {
      let tokens = [];
      ["HP", "ATK", "DEF"].forEach((stat) => {
        if (this.data[stat]) {
          tokens.push(
            `${this.data[stat] > 0 ? "+" : ""}${this.data[stat]} ${stat}`
          );
        }
      });
      return tokens.join(", ");
    },
  },
};
</script>

<style scoped>
  .text-smaller:last-child {
    margin-left: 0.5em;
  }
</style>