<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import {computed} from "vue";
import {useSidebar} from "@/modules/dashboard/composables/useSidebar.ts";
import {useProductsStore} from "@/modules/products/stores/products-store.ts";

const route = useRoute();
const { isOpen, toggleSidebar } = useSidebar()

const productsStore = useProductsStore();

const menu = computed(() => {
  return [
    { name: "Dashboard", path: "/", icon: "pi pi-home" },
    { name: "Quotes", path: "/quotes", icon: "pi pi-file" },
    { name: "Products", path: "/products", icon: "pi pi-box", badge: productsStore.products.length },
    { name: "Settings", path: "/settings", icon: "pi pi-cog" },
  ]
});
</script>

<template>
  <aside
      class="relative w-64 bg-white dark:bg-gray-900 border-r transition border-gray-200 dark:border-gray-700 shadow-md md:flex flex-col"
      :class="{'translate-x-[-255px]': !isOpen}"
  >
    <div class="px-6 py-6 min-h-[80px] border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        Welcome!
      </h2>
    </div>

    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in menu" :key="item.path">
          <RouterLink
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200"
              :class="[
              route.path === item.path
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            ]"
          >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
            <Badge v-if="item.badge" :value="item.badge" />
          </RouterLink>
        </li>
      </ul>
    </nav>
    <Button
        :icon="`pi pi-angle-${isOpen ? 'left' : 'right'}`"
        class="absolute md:hidden top-[50%] translate-y-[-50%] right-[-12px] bg-gray-900 border-none !pl-0 w-fit"
        @click="toggleSidebar"
    />
  </aside>
</template>
