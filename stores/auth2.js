import { defineStore } from "pinia";
import axios from "axios";

export const useDirectusAuthStore = defineStore("auth2", {
  state: () => ({
    accessToken: null,
    refreshTokenValue: null, // Renamed from refreshToken
    user: null,
  }),
  actions: {
    setTokens(access, refresh) {
      this.accessToken = access;
      this.refreshTokenValue = refresh;
      localStorage.setItem("refresh_token", refresh);
    },
    clearAuth() {
      this.accessToken = null;
      this.refreshTokenValue = null;
      this.user = null;
      localStorage.removeItem("refresh_token");
    },
    async refreshToken() {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post(
          "http://localhost:8055/auth/refresh",
          {
            refresh_token: refreshToken,
          }
        );

        this.setTokens(
          response.data.data.access_token,
          response.data.data.refresh_token
        );
        return response.data.data.access_token;
      } catch (error) {
        console.error("Token refresh failed", error);
        this.clearAuth();
        return null;
      }
    },
  },
});
