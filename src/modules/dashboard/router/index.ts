export default [
    {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/DashboardView.vue"),
        meta: { requiresAuth: true, showSidebar: true, showCart: true }
    }
];
