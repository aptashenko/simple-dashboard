import { createRouter, createWebHistory } from "vue-router";

import authRoutes from "@/modules/auth/router";
import dashboardRoutes from "@/modules/dashboard/router";
import quotesRoutes from "@/modules/quotes/router";
import productsRoutes from "@/modules/products/router";
import settingsRoutes from "@/modules/settings/router";

import {authGuard} from "@/modules/auth/router/services/auth-guard.ts";
import {useSidebar} from "@/modules/dashboard/composables/useSidebar.ts";
import {useCartToggler} from "@/modules/cart/composables/useCartToggler.ts";

const { isOpen:sidebarState } = useSidebar();
const { isOpen:cartState } = useCartToggler();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    ...quotesRoutes,
    ...productsRoutes,
    ...settingsRoutes,
    { path: "/:pathMatch(.*)*", redirect: "/login" }
  ]
});

router.beforeEach(authGuard);


export default router;
