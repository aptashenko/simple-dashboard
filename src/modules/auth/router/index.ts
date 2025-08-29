export default [
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginView.vue"),
        meta: { requiresAuth: false }
    }
];
