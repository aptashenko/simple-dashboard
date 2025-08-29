export default [
    {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/SettingsView.vue"),
        meta: { requiresAuth: true }
    }
];
