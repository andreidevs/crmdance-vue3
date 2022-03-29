import router from "../router";
import { defineStore } from "pinia";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const groupsCollection = collection(db, "groups")

export const useGroupsStore = defineStore("groupsStore", {

  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async addTestData(value) {

      try {

        const docRef = await addDoc(groupsCollection, value);
        console.log("Document written with ID: ", docRef.id);


      } catch (error) {
        console.log(error);
      } finally {

      }
    },

  },
});
