<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { computed } from "vue";

import images2 from "../assets/img/images2.jpg";
import images3 from "../assets/img/images3.jpg";

import "boxicons";

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

  <div class="flex flex-col pt-14 md:pt-20 bg-[#302082] min-h-screen text-white gap-4">
    
    <!-- Partie haute : Promo + Total -->
    <section class="mt-12 flex flex-wrap gap-4 px-3 justify-center md:flex-nowrap md:px-8">
      
      <!-- Bannière Promotion -->
      <div class="bg-white h-[150px] w-full min-w-[250px] flex items-center justify-center text-black text-xl font-bold rounded-lg flex-1">
        Bannière Promotion
      </div>

      <!-- Carte Total (taille fixe) -->
      <div class="bg-white w-full md:w-[350px] h-[150px] flex flex-col md:p-4 text-black font-bold rounded-lg text-xl overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between p-4">
          <p>Sous-total ({{ produitTotal }} article(s)):</p>
          <p class="text-[#302082]">{{ prixTotal }}€</p>
        </div>
        <div class="flex flex-col px-4">
          <button class="flex justify-center mt-2 md:mt-2 bg-[#302082] text-white py-2 rounded-lg">Checkout</button>
        </div>
      </div>
    </section>

   <!-- Partie basse : Panier -->
<section class="p-3 md:px-8 w-full">
  <div class="bg-white p-5 text-black text-xl font-bold w-full min-h-[535px] rounded-lg">
    <h2 class="text-2xl mb-4">Votre panier</h2>
    <div class="flex justify-between mr-6">
      <button class="font-normal text-base text-[#302082] hover:cursor-pointer" @click="removeAllProduits">
        Remove all products
      </button>
      <h5 class="font-normal text-base hidden md:block">Prix</h5>
    </div>
    
    <div class="grid gap-4 border-t-2 border-gray-200">
      <div v-for="produit in produits" :key="produit.id" class="bg-white text-black p-4 flex flex-col md:flex-row items-start border-b-2 border-gray-200">

        <!-- Image du produit -->
        <div class="flex w-full md:w-60 md:h-60 justify-center">
          <img :src="produit.image" alt="Produit" class="w-24 h-24 md:w-60 md:h-60 object-cover rounded-md">
        </div>

        
        <!-- Conteneur principal du texte -->
        <div class="flex flex-col flex-1 ml-4 w-full md:h-full">
          
          <!-- Titre et Prix en space-between -->
          <div class="grid md:flex md:justify-between items-center w-full">
            <div>
              <h3 class="text-lg font-bold">{{ produit.titre }}</h3>
            </div>
            <div>
              <p class="text-gray-800 font-semibold">{{ produit.prix }}</p>
            </div>
          </div>

          <!-- Bouton delete bien en bas à droite -->
          <div class="flex-1 flex items-end mt-5">
            <button @click="removeProduit(produit.id)" class="flex bg-red-500 text-white p-2 rounded-lg">
              <box-icon name='trash-alt'></box-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  </div>
</template>

