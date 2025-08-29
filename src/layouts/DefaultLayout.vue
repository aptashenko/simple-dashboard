<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import CartPanel from "@/modules/cart/components/CartPanel.vue";
import { useRoute } from "vue-router";
import {useCartToggler} from "@/modules/cart/composables/useCartToggler.ts";
import {computed} from "vue";
import {useSidebar} from "@/modules/dashboard/composables/useSidebar.ts";

const route = useRoute();
const { isOpen } = useCartToggler();
const { isOpen: isSideBarOpen, toggleSidebar } = useSidebar()

const showCart = computed(() => isOpen.value && route.meta.showCart)
</script>

<template>
  <div class="relative flex h-[100dvh] overflow-hidden">
    <Transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0"
    >
      <TheSidebar
          v-if="route.meta.showSidebar"
          class="!fixed left-0 top-0 h-full w-64 bg-white shadow z-20"
      />
    </Transition>
    <div v-if="route.meta.showSidebar && isSideBarOpen" class="fixed top-0 left-0 bottom-0 md:hidden right-0 w-full h-[100dvh] bg-black/50 z-10" @click="toggleSidebar" />
    <div
        class="flex flex-col flex-1 transition-[margin] duration-300 ease-in-out"
        :class="[
        route.meta.showSidebar ? 'md:ml-64' : 'md:ml-0',
        showCart ? 'md:mr-96' : 'md:mr-0'
      ]"
    >
      <TheHeader />

      <main class="grid items-center flex-1 p-6 overflow-y-auto h-[calc(100dvh-80px)]">
        <slot />
      </main>
    </div>

    <Transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
    >
      <CartPanel v-if="showCart" class="fixed right-0 top-0 h-full w-96 bg-white !max-w-[375px] md:!max-w-full shadow z-20" />
    </Transition>
  </div>
</template>
