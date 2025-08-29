import { useAuthStore } from "@/modules/auth/stores/auth-store";
import type { RouteLocationNormalized } from "vue-router";

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return { path: "/login" };
    }

    if (to.path === "/login" && auth.isAuthenticated) {
        return { path: "/" };
    }

    return true;
}
