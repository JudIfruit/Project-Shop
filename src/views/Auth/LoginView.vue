<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());
const formData = reactive({
  email: "",
  password: "",
});
onMounted(() => {
  errors.value = {};
});
</script>
<template>
  <main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <form @submit.prevent="authenticate('login', formData)" action="">
      <div class="mb-4">
        <input
          type="text"
          placeholder="Email"
          v-model="formData.email"
          class="w-full p-2 border border-gray-300 rounded"
        />
        <p v-if="errors.email" class="text-red-500">
          {{ errors.email[0] }}
        </p>
      </div>
      <div class="mb-4">
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
          class="w-full p-2 border border-gray-300 rounded"
        />
        <p v-if="errors.password" class="text-red-500">
          {{ errors.password[0] }}
        </p>
      </div>

      <button
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </main>

  <RouterView />
</template>
