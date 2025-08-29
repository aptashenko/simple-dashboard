import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { ICartItem } from "@/modules/cart/types";

export const useCartStore = defineStore("cart-store", () => {
    const items = ref<ICartItem[]>([]);

    const saved = localStorage.getItem("cart");
    if (saved) {
        try {
            items.value = JSON.parse(saved);
        } catch (e) {
            console.error("Ошибка при чтении localStorage cart:", e);
        }
    }

    const add = (payload: ICartItem) => {
        items.value.push(payload);
    };

    const remove = (idx: number) => {
        items.value.splice(idx, 1);
    };

    const clear = () => {
        items.value = [];
    };

    watch(
        items,
        (val) => {
            localStorage.setItem("cart", JSON.stringify(val));
        },
        { deep: true }
    );

    return {
        items,
        add,
        remove,
        clear,
    };
});
