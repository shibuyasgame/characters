<template>
  <div class="stat-block">
    <button type="button" v-clipboard:copy="data.CP" @click="toast(data.Name)">
      <font-awesome-icon :icon="['fas', 'copy']" :style="data.Color" />
    </button>
    <div class="stat-content">
      <div>
        <StatTile v-if="!hide.HP" :stats="data.HP" :color="data.Color" :name="names.HP">
          <template #before>
            <b :style="hpColor">{{ data.HP.current }}</b>
            <span class="text-smaller">/ </span>
          </template>
        </StatTile>
        <StatTile v-if="!hide.ATK" :stats="data.ATK" :color="data.Color" :name="names.ATK" />
        <StatTile v-if="!hide.DEF" :stats="data.DEF" :color="data.Color" :name="names.DEF" />
        <StatTile
          v-if="data.Role === 'Player' && !hide.SYNC"
          :stats="{ total: data.SYNC }"
          :color="data.Color"
          :name="names.SYNC"
        >
          <template #after>%</template>
        </StatTile>
      </div>
      <div>
        <StatTile
          v-if="data.BRV !== undefined && !hide.BRV"
          :stats="{ total: data.BRV }"
          :color="data.Color"
          :name="names.BRV"
        />
        <StatTile v-if="!hide.PP" :stats="{ total: data.PP }" :color="data.Color" :name="names.PP" />
        <StatTile v-if="!hide.Yen" :stats="{ total: data.Yen }" :color="data.Color" :name="names.Yen" />
      </div>
    </div>
  </div>
</template>

<script>
import StatTile from "./StatTile";
import { toast } from "./mixins/utilities";

export default {
  components: {
    StatTile
  },
  mixins: [toast],
  props: {
    data: {
      type: Object,
      required: true
    },
    week: {
      type: String,
      required: true
    }
  },
  computed: {
    hpColor() {
      const curr = this.data.HP.current;
      const max = this.data.HP.total;
      if (curr / max < 1) {
        return { color: "goldenrod" };
      } else if (curr / max < 0.25) {
        return { color: "red" };
      }
      return { color: "green" };
    },
    names() {
      const overrides = this.getOverrides('name');
      Object.keys(overrides).forEach((key) => {
        overrides[key] = overrides[key] ?? key;
      });

      return overrides;
    },
    hide() {
      return this.getOverrides('hide');
    }
  },
  methods: {
    getOverrides(setting) {
      const overrides = {};
      const statNames = [
        'HP',
        'ATK',
        'DEF',
        'SYNC',
        'PP',
        'BRV',
        'Yen'
      ]
      statNames.forEach((name) => {
        overrides[name] = this.$settings[this.week].overrides?.[name]?.[setting];
      });

      return overrides;
    }
  }
};
</script>

<style scoped>
.stat-block {
  display: flex;
  height: 150px;
}

.stat-content {
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  margin: 5px 0;
  flex-grow: 1;
}
button {
  flex-grow: 0;
}
</style>
