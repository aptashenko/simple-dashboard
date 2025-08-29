import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchProducts} from "@/api/services.ts";
import type {ICartItem} from "@/modules/cart/types";

export const useProductsStore = defineStore('products-store', () => {
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const products = ref<ICartItem[]>([])

    const fetchItems = async (): Promise<void> => {
        try {
            isLoading.value = true;
            error.value = null;
            products.value = await fetchProducts();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetchItems,
        products,
        isLoading,
        error
    }
})
