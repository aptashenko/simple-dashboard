<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/modules/cart/stores/cart-store";
import type { ICartItem } from "@/modules/cart/types";
import {useToast} from "primevue";
import {useCartToggler} from "@/modules/cart/composables/useCartToggler.ts";
import {useProductsStore} from "@/modules/products/stores/products-store.ts";

const { isOpen } = useCartToggler();
const selectedProduct = ref<ICartItem | null>(null);
const selectedOptions = ref<string[]>([]);
const cart = useCartStore();
const productsStore = useProductsStore();
const toast = useToast();

productsStore.fetchItems();

const notifySuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Quote has been submitted!",
    life: 3000
  });

  isOpen.value = true;
};

const addToCart = () => {
  if (selectedProduct.value) {
    const payload = {
      ...selectedProduct.value,
      options: selectedOptions.value,
    };
    cart.add(payload);
  }

  selectedProduct.value = null;
  selectedOptions.value = [];
  notifySuccess()
};
</script>

<template>
  <Card class="w-full shadow-lg border border-gray-200">
    <template #title>
      <div class="flex items-center gap-2 text-indigo-600">
        <i class="pi pi-file mr-1"></i>
        <span class="font-bold">New Quote</span>
      </div>
    </template>

    <template #content>
      <div class="mb-4">
        <label for="product" class="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
          <i class="pi pi-box text-indigo-500"></i> Select product
        </label>
        <Dropdown
            id="product"
            v-model="selectedProduct"
            :options="productsStore.products"
            optionLabel="name"
            placeholder="Choose a product..."
            class="w-full"
        />
      </div>

      <Divider v-if="selectedProduct" />

      <div v-if="selectedProduct" class="space-y-3">
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <i class="pi pi-sliders-h text-green-500"></i> Choose options:
        </p>
        <div
            v-for="(opt, idx) in selectedProduct.options"
            :key="opt"
            class="flex items-center gap-3 bg-gray-50 p-2 rounded-lg hover:bg-indigo-50 transition"
        >
          <Checkbox v-model="selectedOptions" :inputId="opt" :value="opt" />
          <label :for="opt" class="cursor-pointer">{{ opt }}</label>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <Button
            label="Add to Quote"
            icon="pi pi-plus"
            iconPos="left"
            @click="addToCart"
            :disabled="!selectedProduct"
            severity="success"
            class="px-5"
        />
      </div>
    </template>
  </Card>
</template>
