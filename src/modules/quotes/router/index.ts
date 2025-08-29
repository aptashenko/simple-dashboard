export default [
    {
        path: "/quotes",
        name: "Quotes",
        component: () => import("../views/QuotesView.vue"),
        meta: { requiresAuth: true, showSidebar: true, showCart: true }
    }
];
