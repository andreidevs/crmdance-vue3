import { defineStore } from 'pinia';
import { supabase } from '@/supabase';


export const useAuthStore = defineStore('auth',
  {
    state() {
      return {
        currentUser: null,
        redirectRoute: null
      };
    },
    getters: {
      isAuthenticated() {
        return !!this.currentUser;
      }
    },
    actions: {
      loadUser() {
        this.currentUser = supabase.auth.user();
      },
      clearUser() {
        this.currentUser = null;
      },
      saveRedirectRoute(route) {
        const { name, params, query, hash } = route;

        localStorage.setItem(
          'redirectRoute',
          JSON.stringify({
            name,
            params,
            query,
            hash
          })
        );
      },
      loadRedirectRoute() {
        const route = JSON.parse(localStorage.getItem('redirectRoute') || 'null')
        this.redirectRoute = route;
      },
      clearRedirectRoute() {
        localStorage.removeItem('redirectRoute');
        this.redirectRoute = null;
      },



      async login(values) {
        const { user, session, error } = supabase.auth.signIn(values)
        if (error) {
          throw new Error(response.error.message);
        }
        this.currentUser = user
        return user
      },

      async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.clearUser()
      },


      async register(values, data) {
        const { user, session, error } = supabase.auth.signUp(values, { data })
        return user
      },

      resetPassword(email) {
        return supabase.auth.api.resetPasswordForEmail(email);
      }
    }
  }
);
