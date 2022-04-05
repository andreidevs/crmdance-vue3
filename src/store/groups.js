import router from "../router";
import { defineStore } from "pinia";
import { SetDoc } from "../firebase/simpleFire"

const N = "groups"

export const useGroupsStore = defineStore("groupsStore", {

  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async createGroup(model) {
      SetDoc(N, model)
    },



  },
});
