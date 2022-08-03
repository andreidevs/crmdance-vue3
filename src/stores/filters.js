import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state() {
    return {
      filters: [],
    };
  },
  getters: {
    filtersByKey() {
      return (key) => this.filters.filter((el) => el.key === key);
    },
  },

  actions: {
    setFiltersValue(value) {
      let findIndex = this.filters.findIndex(
        (el) => value.key === el.key && value.name === el.name
      );
      if (findIndex !== -1) {
        this.filters[findIndex] = value;
      } else {
        this.filters.push(value);
      }
    },
    removeFiltersValue(value) {
      const idx = this.filters.findIndex(
        (el) => value.key === el.key && value.name === el.name
      );
      if (idx !== undefined) {
        this.filters.splice(idx, 1);
      }
    },
  },
});
