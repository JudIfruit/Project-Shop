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

  <header class="bg-[#302082] text-white px-20 py-8 shadow-lg">
    <nav class="flex justify-between items-center">
      <div>
        <RouterLink :to="{ name: 'home' }" class="text-xl font-bold">Project Shop</RouterLink>
      </div>

      <div>
        <RouterLink :to="{ name: 'shop' }" class="hover:text">Panier</RouterLink>
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
      </div>
    </nav>
  </header>

</template>
