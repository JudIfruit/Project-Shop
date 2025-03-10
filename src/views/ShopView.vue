<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

import images2 from "../assets/img/images2.jpg";
import images3 from "../assets/img/images3.jpg";

const produits = ref([
  { id: 1, titre: "Produit A", prix: "25€", image: images2 },
  { id: 2, titre: "Produit B", prix: "30€", image: images2 },
  { id: 3, titre: "Produit C", prix: "40€", image: images3 },
  { id: 4, titre: "Produit D", prix: "50€", image: images3 },
  { id: 5, titre: "Produit E", prix: "60€", image: images3 },
  { id: 6, titre: "Produit F", prix: "70€", image: images3 },
  { id: 7, titre: "Produit G", prix: "80€", image: images3 },
  { id: 8, titre: "Produit H", prix: "90€", image: images3 }
]);

const removeProduit = (id) => {
  produits.value = produits.value.filter(produit => produit.id !== id);
};
</script>

<template>
  <div class="bg-[#302082] min-h-screen text-white flex flex-col">
    <!-- Navbar fixe en haut -->
    <section class="fixed top-0 w-full z-50 bg-[#302082] shadow-md">
      <Navbar />
    </section>
    
    <!-- Ajout d'un padding-top pour éviter que le contenu soit caché sous la navbar -->
    <section class="mt-12 pt-[80px] flex-1 border border-[#222] box-border grid grid-cols-[3fr_1fr] gap-4 p-4">
      <!-- Colonne gauche (section produits grandit naturellement) -->
      <div class="flex flex-col gap-4 w-full">
        <!-- Bannière Promotion -->
        <div class="bg-[#fddde4] h-[150px] flex items-center justify-center text-black text-xl font-bold">
          Bannière Promotion
        </div>
        
        <!-- Liste des produits qui s'agrandit naturellement -->
        <div class="bg-[#fddde4] p-5 text-black text-xl font-bold w-full min-h-[535px]">
          <h2 class="text-2xl mb-4">Liste des Produits</h2>
          <div class="grid gap-4">
            <div v-for="produit in produits" :key="produit.id" class="h-[200px] bg-white text-black p-4 rounded-lg shadow-lg flex relative">
              
              <!-- Image à gauche -->
              <img :src="produit.image" alt="Produit" class="w-1/3 h-full object-cover rounded-md">
              
              <!-- Contenu texte à droite -->
              <div class="flex flex-col flex-1 ml-4 relative">
                <!-- Prix en haut à droite -->
                <p class="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg">
                  {{ produit.prix }}
                </p>
                
                <!-- Titre du produit -->
                <h3 class="text-lg font-bold mt-2">
                    {{ produit.titre }}
                </h3>

                <!-- Boutons en bas et centrés -->
                <div class="mt-auto flex justify-end gap-2">
                  <button @click="removeProduit(produit.id)" class="bg-red-500 text-white px-4 py-2 rounded-lg">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite (Summary reste fixe en taille) -->
      <div class="bg-[#fddde4] h-[700px] flex items-center justify-center text-black text-2xl font-bold">
        Summary
      </div>
    </section>
  </div>
</template>
