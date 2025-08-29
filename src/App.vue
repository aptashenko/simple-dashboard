<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>

<template>
  <default-layout>
    <router-view />
  </default-layout>
  <Toast class="max-w-[90%]" />
</template>
