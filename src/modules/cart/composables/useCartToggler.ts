import {ref} from "vue";

const isOpen = ref<boolean>(false);

export function useCartToggler() {
    const toggleCart = (): void => {
        isOpen.value = !isOpen.value;
    }

    return {
        toggleCart,
        isOpen
    }
}
