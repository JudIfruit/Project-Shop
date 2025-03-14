<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

import images1 from '../assets/img/images1.jpg';
import images2 from '../assets/img/images2.jpg';
import images3 from '../assets/img/images3.jpg';

const produitsDisponibles = ref([
  { id: 1, titre: 'Produit A', prix: 25, image: images1 },
  { id: 2, titre: 'Produit B', prix: 30, image: images2 },
  { id: 3, titre: 'Produit C', prix: 40, image: images3 },
]);

const router = useRouter();

const ajouterAuPanier = (produit) => {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.push(produit);
  localStorage.setItem('panier', JSON.stringify(panier));
  alert(`${produit.titre} a été ajouté au panier.`);
};

const allerAuPanier = () => {
  router.push('/shop');
};
</script>

<template>

  <section class="fixed top-0 w-full z-50 bg-[#302082] shadow-md">
    <Navbar />
  </section>
    
  <div class="flex flex-col items-center bg-[#302082] min-h-screen text-white mt-20">
    <h1 class="text-3xl font-bold mt-8">Liste des Produits</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
      <div
        v-for="produit in produitsDisponibles"
        :key="produit.id"
        class="bg-white text-black p-4 rounded-lg shadow-md"
      >
        <img :src="produit.image" alt="Produit" class="w-full h-40 object-cover rounded-md" />
        <h2 class="text-lg font-bold mt-2">{{ produit.titre }}</h2>
        <p class="text-gray-700">{{ produit.prix }}€</p>
        <button
          @click="ajouterAuPanier(produit)"
          class="mt-4 bg-[#302082] text-white px-4 py-2 rounded-lg"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
    <button
      @click="allerAuPanier"
      class="mt-8 bg-[#FF6B00] text-white px-6 py-3 rounded-lg"
    >
      Aller au panier
    </button>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>