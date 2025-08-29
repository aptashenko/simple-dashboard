<script setup lang="ts">
import { useCartStore } from "@/modules/cart/stores/cart-store";
import {useToast} from "primevue";
import {useCartToggler} from "@/modules/cart/composables/useCartToggler.ts";

const cart = useCartStore();

const toast = useToast();
const { toggleCart } = useCartToggler();

const submitQuote = () => {
  toast.add({
    severity: "success",
    summary: "Quote submitted",
    detail: "Your quote was successfully sent!",
    life: 3000,
  });
  cart.clear();
  toggleCart();
};

const removeItem = (index: number): void => {
  cart.remove(index);
};
</script>

<template>
  <aside
      class="w-80 bg-gradient-to-b from-indigo-50 to-white shadow-xl flex flex-col"
  >
    <div class="flex items-center justify-between px-8 md:px-4 py-3 min-h-[80px] border-opacity-20">
      <h2 class="text-lg font-bold text-indigo-700 flex items-center gap-2">
        <i class="pi pi-shopping-cart text-indigo-500"></i>
        Cart
      </h2>
      <div class="flex items-center gap-4">
        <Tag :value="cart.items.length" severity="info" />

        <Button icon="pi pi-times" severity="warn" size="small" class="md:hidden" @click="toggleCart"/>
      </div>
    </div>

    <div
        v-if="cart.items.length === 0"
        class="flex-1 flex items-center justify-center text-gray-400 text-sm"
    >
      <div class="text-center">
        <i class="pi pi-inbox text-3xl mb-2"></i>
        <p class="italic">No products added yet</p>
      </div>
    </div>

    <div v-else class="flex-1 space-y-4 overflow-y-auto p-4">
      <Card
          v-for="(item, index) in cart.items"
          :key="index"
          class="shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <template #title>
          <div class="flex justify-between items-center">
            <span class="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <i class="pi pi-box text-indigo-500"></i>
              {{ item.name }}
            </span>
            <Button
                icon="pi pi-trash"
                rounded
                text
                severity="danger"
                size="small"
                class="hover:bg-red-100"
                @click="removeItem(index)"
            />
          </div>
        </template>

        <template #content>
          <div class="flex flex-wrap gap-2 mt-2">
            <Tag
                v-for="opt in item.options"
                :key="opt"
                :value="opt"
                severity="success"
                class="text-xs"
            />
          </div>
        </template>
      </Card>
    </div>

    <Divider />

    <div class="p-4">
      <Button
          v-if="cart.items.length"
          label="Submit Quote"
          icon="pi pi-send"
          class="w-full"
          severity="success"
          raised
          @click="submitQuote"
      />
    </div>
  </aside>
</template>
