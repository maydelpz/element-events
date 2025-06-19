import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "../router";
import { useDatabasesStore } from "./databases";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
        console.log(user);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databasesStore = useDatabasesStore();
      databasesStore.$reset();
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      let unsubscribe;
      return new Promise((resolve, reject) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = { email: user.email, uid: user.uid };
          } else {
            this.userData = null;
            const databasesStore = useDatabasesStore();
            databasesStore.$reset();
          }
          resolve(user);
        });
      }).then((user) => {
        unsubscribe();
        return user;
      });
    },
  },
});
