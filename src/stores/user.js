import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { auth } from "../firebase/firebaseConfig";
import router from "../router";


export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser({ email, password, name: displayName, phone }) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,

        );
        updateProfile(user, {
          displayName
        })

        setDoc(doc(db, "coach", user.uid), {
          uid: user.uid,
          name: displayName,
          phone,
          email,
        });

        this.userData = { email: user.email, uid: user.uid, name: displayName };

        // router.push("/");
      } catch (error) {
        console.log(error);
        ElMessage.error("Ошибка");
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser({ email, password }) {
      this.loadingUser = true;
      try {
        const { user, error } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("eeror", error)
        if (error) throw error
        this.userData = { email: user.email, uid: user.uid, name: user.displayName };
        router.push("/");
        ElMessage.success("Успешный вход в систему");
      } catch (error) {
        ElMessage.error("Ошибка", error.error_description);
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                name: user.displayName
              };
              // console.log('User', this.userData)
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  },
});
