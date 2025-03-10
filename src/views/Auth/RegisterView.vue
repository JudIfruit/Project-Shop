<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth"; // Correct import statement
import { storeToRefs } from "pinia";

const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());
const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
onMounted(() => {
  errors.value = {};
});
</script>
<template>
  <main class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Register a new account</h1>
    <form @submit.prevent="authenticate('register', formData)" action="">
      <div class="mb-4">
        <input
          type="text"
          placeholder="Name"
          v-model="formData.name"
          class="w-full p-2 border border-gray-300 rounded"
        />
        <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
      </div>
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
      <div class="mb-4">
        <input
          type="password"
          placeholder="Password Confirmation"
          v-model="formData.password_confirmation"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  </main>

  <RouterView />
</template>
