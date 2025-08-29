export default [
    {
        path: "/products",
        name: "Products",
        component: () => import("../views/ProductsView.vue"),
        meta: { requiresAuth: true, showSidebar: true, showCart: true }
    }
];
