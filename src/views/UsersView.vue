<!-- filepath: /home/leon/Workspace/sup/cynaFront/src/views/UsersView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";

const users = ref([]);
const authStore = useAuthStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  users.value = await res.json();
});
</script>

<template>
  <Navbar />
  <main class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id" class="mb-4">
        <p class="text-lg font-semibold">{{ user.name }}</p>
        <p class="text-gray-600">{{ user.email }}</p>
      </li>
    </ul>
  </main>
</template>
