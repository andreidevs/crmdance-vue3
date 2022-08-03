import { defineStore } from "pinia";
import { getById, getTable, addData } from "../apis";
const N = "payment";

export const useGroupsStore = defineStore("paymentStore", {
  id: "payment",
  state: () => ({
    groupsList: [],
    last: {},
    first: {},
    page: 1,
  }),

  actions: {
    async createPayment(data) {
      return await addData({ tableName: N, data });
    },

    async getPayment() {
      return await getTable({
        tableName: N,
        select: "*, coach(*), type(*), room(*)",
        key: N,
        pagination: true,
        page: this.page,
      });
    },

    async getGroupById(id) {
      return await getById({ tableNAme: N, id });
    },
  },
});
