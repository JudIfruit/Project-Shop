<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
const authStore = useAuthStore();

onMounted(() => {
  authStore.getUser();
});
</script>

<template>
  <router-view />
</template>
