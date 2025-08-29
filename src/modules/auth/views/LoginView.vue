<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/stores/auth-store.ts";
const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  await auth.loginUser({email: email.value, password: password.value});
  if (auth.isAuthenticated) {
    router.push("/");
  }
};
</script>

<template>
  <div class="flex items-center h-full justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <FloatLabel variant="on">
          <InputText id="email" v-model="email" class="w-full!" />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel variant="on">
          <InputText id="password" type="password" v-model="password" class="w-full!" />
          <label for="password">Password</label>
        </FloatLabel>

        <Button type="submit" label="Login" class="mx-auto block" />
      </form>

      <p v-if="auth.error" class="mt-4 text-red-500 text-center">
        {{ auth.error }}
      </p>
    </div>
  </div>
</template>
