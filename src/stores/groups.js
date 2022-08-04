import { defineStore } from "pinia";
import { getById, getTable, addData } from "../apis";
const N = "groups";

export const useGroupsStore = defineStore("groupsStore", {
  id: "groups",
  state: () => ({
    groupsList: [],
    last: {},
    first: {},
    page: 1,
  }),

  actions: {
    async createGroup(data) {
      return await addData({ tableName: N, data });
    },

    async getGroups() {
      return await getTable({
        tableName: N,
        select: "*, coach(*), type(*), room(*)",
        key: N,
        pagination: true,
        page: this.page,
      });
    },

    async getGroupById(id) {
      return await getById({ tableName: N, id });
    },

    async getGroupTypes() {
      return await getTable({ tableName: "groupTypes" });
      // TODO сделать сохранение в стор что бы не ходить за данными постоянно
    },
  },
});
