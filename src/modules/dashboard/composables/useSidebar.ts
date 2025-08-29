import {ref} from "vue";

const isOpen = ref<boolean>(true);

export function useSidebar()  {
    const toggleSidebar = (): void => {
        isOpen.value = !isOpen.value;
    }

    return {
        isOpen,
        toggleSidebar
    }
}
