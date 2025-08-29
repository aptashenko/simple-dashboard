<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/stores/auth-store.ts";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {useCartToggler} from "@/modules/cart/composables/useCartToggler.ts";
import {useCartStore} from "@/modules/cart/stores/cart-store.ts";

const auth = useAuthStore();
const cart = useCartStore();
const router = useRouter();
const route = useRoute()
const { toggleCart } = useCartToggler();

const logout = () => {
  auth.logout();
  router.push("/login");
};

const items = [
  {
    id: 1,
    label: "Profile",
    icon: "pi pi-user",
  },
  {
    id: 2,
    label: "Inbox",
    icon: "pi pi-envelope",
    badge: 1
  },
  {
    id: 3,
    label: "Logout",
    icon: "pi pi-sign-out",
    command: logout,
  },
];

const menu = ref();

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};
</script>

<template>
  <header class="flex justify-between items-center px-6 py-4 bg-white shadow">
    <div>
      <router-link to="/">
        <h1 class="text-xl font-bold">
          {{auth.isAuthenticated ? 'Test Dashboard' : 'Welcome!'}}
        </h1>
      </router-link>
    </div>

    <div v-if="auth.isAuthenticated" class="flex items-center">
      <Menu ref="menu" :model="items" popup>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center gap-2 p-2 w-full" v-bind="props.action">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :value="item.badge" class="ml-auto" />
            <span
                v-if="item.shortcut"
                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs px-1"
            >
              {{ item.shortcut }}
            </span>
          </a>
        </template>
      </Menu>

      <div class="flex items-center gap-4">
        <div class="relative">
          <Avatar
              label="U"
              size="large"
              class="cursor-pointer"
              @click="toggle"
          />
          <Badge
              severity="danger"
              class="absolute -top-[2px] right-[-2px]"
          />
        </div>

        <div v-if="route.meta.showCart" class="relative">
          <Button
              icon="pi pi-shopping-cart"
              severity="secondary"
              rounded
              size="large"
              @click="toggleCart"
          />
          <Badge
              :value="cart.items.length"
              severity="danger"
              class="absolute -top-2 -right-2"
          />
        </div>
      </div>
    </div>
  </header>
</template>
