<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { computed } from "vue";

import images2 from "../assets/img/images2.jpg";
import images3 from "../assets/img/images3.jpg";

const produits = ref([
  { id: 1, titre: "Produit A", prix: "25€", image: images2 },
  { id: 2, titre: "Produit B", prix: "30€", image: images2 },
  { id: 3, titre: "Produit C", prix: "40€", image: images3 }
]);

const produitTotal = computed(() => produits.value.length);
const prixTotal = computed(() => {
  return produits.value.reduce((acc, produit) => {
    return acc + parseInt(produit.prix);
  }, 0);
});

const removeProduit = (id) => {
  produits.value = produits.value.filter(produit => produit.id !== id);
};

const removeAllProduits = () => {
  produits.value = [];
};
</script>

<template>
  <section class="fixed top-0 w-full z-50 bg-[#302082] shadow-md">
    <Navbar />
  </section>


  <div class="flex flex-col pt-20 px-40 bg-[#302082] min-h-screen text-white">
    <section class="mt-12 flex-1 grid grid-cols-[3fr_1fr] gap-4 p-4">
      <!-- Colonne gauche -->
      <div class="flex flex-col gap-4 w-full">
        <!-- Bannière Promotion -->
        <div class="bg-white h-[150px] flex items-center justify-center text-black text-xl font-bold rounded-lg">
          Bannière Promotion
        </div>
        
        <!-- Liste des produits -->
        <div class="bg-white p-5 text-black text-xl font-bold w-full min-h-[535px] rounded-lg">
          <h2 class="text-2xl mb-4">Votre panier</h2>
          <div class="flex justify-between mr-8">
            <button class="font-normal text-base text-[#302082] hover:cursor-pointer"  @click="removeAllProduits">Remove all products</button>
            <h5 class="font-normal text-base">Prix</h5>
          </div>
          <div class="grid gap-4 border-t-2 border-gray-200">
            <div v-for="produit in produits" :key="produit.id" class="h-[200px] bg-white text-black p-4 flex relative border-b-2 border-gray-200">

              <img :src="produit.image" alt="Produit" class="w-1/4 h-full object-cover rounded-md">
              
              <!-- Contenu texte à droite -->
              <div class="flex flex-col flex-1 ml-4 relative">
                <p class="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg">
                  {{ produit.prix }}
                </p>
                <h3 class="text-lg font-bold mt-2">
                  {{ produit.titre }}
                </h3>
                <div class="mt-auto flex justify-end gap-2">
                  <button @click="removeProduit(produit.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite (Summary reste fixe en taille) -->
      <div class="bg-white h-[150px] flex flex-col p-4 text-black text-2xl font-bold rounded-lg">
        <div class="flex flex-col p-4">
          <p>Sous-total ({{ produitTotal }} article(s)): {{prixTotal}}€</p>
          <button class="flex justify-center mt-6 bg-[#302082] text-white py-2 rounded-lg">Checkout</button>
        </div>
      </div>
    </section>
  </div>
</template>
