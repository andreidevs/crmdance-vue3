import router from "../router";
import { defineStore } from "pinia";
import { GetDocsPaginate, SetDoc } from "../firebase/simpleFire"
import { v4 as uuidv4 } from 'uuid';
const N = "groups"

export const useGroupsStore = defineStore("groupsStore", {
  id: 'groups',
  state: () => ({
    groupsList: [],
    last: {},
    first: {}
  }),

  actions: {
    async createGroup(model) {
      return await SetDoc(N, model,)
    },

    async getGroups() {
      const res = await GetDocsPaginate(N, 5)
      this.last = res[res.length - 1]

      return res
    },
    async getGroupsNext() {

      const res = await GetDocsPaginate(N, 5, null, this.last)
      this.last = res[res.length - 1]
      this.first = res[0]
      console.log('resNext', res)
      return res
    },
    async getGroupsPrev() {
      const res = await GetDocsPaginate(N, 5, this.first, null)
      this.last = res[res.length - 1]
      this.first = res[0]
      console.log('resPrev', res)
      return res
    },



  },
});
