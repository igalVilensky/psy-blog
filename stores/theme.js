import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
    state: () => ({
        theme: "dark", // Default to dark for the lab
    }),
    actions: {
        initTheme() {
            if (process.client) {
                const savedTheme = localStorage.getItem("lab-theme");
                if (savedTheme) {
                    this.theme = savedTheme;
                } else {
                    // Default to dark if no preference
                    this.theme = "dark";
                }
                this.applyTheme();
            }
        },
        toggleTheme() {
            this.theme = this.theme === "dark" ? "light" : "dark";
            if (process.client) {
                localStorage.setItem("lab-theme", this.theme);
                this.applyTheme();
            }
        },
        setTheme(theme) {
            this.theme = theme;
            if (process.client) {
                localStorage.setItem("lab-theme", this.theme);
                this.applyTheme();
            }
        },
        applyTheme() {
            if (process.client) {
                const html = document.documentElement;
                if (this.theme === "dark") {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }
            }
        },
    },
});
