<script setup lang="ts">
import {RouterLink} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
const authStore = useAuthStore();

onMounted(() => {
  authStore.getUser();
});
</script>

<template>

  <header class="bg-gray-800 text-white p-4">
    <nav class="flex justify-between items-center">
      <div>
        <RouterLink :to="{ name: 'home' }" class="text-xl font-bold">Home</RouterLink>
      </div>

      <div class="flex justify-center space-x-6">
        <RouterLink :to="{ name: 'users' }" class="hover:text">Users</RouterLink>

      </div>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <p class="test-sm text-slate-300">
          {{ authStore.user.name }}
        </p>
        <form @submit.prevent="authStore.logout">
          <button>Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'login' }" class="hover:text-gray-400">Login</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="hover:text-gray-400">Register</RouterLink>
      </div>
    </nav>
  </header>

</template>
