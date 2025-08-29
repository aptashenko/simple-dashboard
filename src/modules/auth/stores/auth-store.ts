import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import { login } from "@/api/services";
import type { ILoginPayload } from "@/modules/auth/types";

export const useAuthStore = defineStore("auth-store", () => {
    const token = ref<string | null>(Cookies.get("auth_token") || null);
    const isAuthenticated = ref<boolean>(!!token.value);
    const error = ref<string | null>(null);

    const loginUser = async (payload: ILoginPayload) => {
        try {
            const { token: apiToken } = await login(payload);

            token.value = apiToken;
            isAuthenticated.value = true;
            error.value = null;

            Cookies.set("auth_token", apiToken, { expires: 30 });
        } catch (err: any) {
            error.value = err.message;
        }
    };

    const logout = () => {
        isAuthenticated.value = false;
        token.value = null;
        Cookies.remove("auth_token");
    };

    return {
        isAuthenticated,
        token,
        error,
        loginUser,
        logout
    };
});
