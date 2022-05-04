
import { defineStore } from "pinia";
import { getById, getTable, getTableTest, addData } from '../apis'
const N = "groups"

export const useGroupsStore = defineStore("groupsStore", {
  id: 'groups',
  state: () => ({
    groupsList: [],
    last: {},
    first: {},
    page: 1
  }),

  actions: {
    async createGroup(data) {
      return await addData({ tableName: N, data, })
    },

    async getGroups() {
      return await getTableTest({
        tableName: N,
        select: "*, coach(*), type(*), room(*)",
        key: N,
        pagination: true,
        page: this.page
      })
    },

    async getGroupById(id) {
      return await getById({ tableNAme: N, id })
    },

    async getCoachList() {
      return getTable({ tableName: "users" })
    },

    async getGroupTypes() {
      return getTable({ tableName: "groupTypes" })
    }




  },
});
