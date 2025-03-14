<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";
import "boxicons";

const authStore = useAuthStore();

const pk = 'pk_test_51Ny7JaHVnu49ZpSn2I9HIRbRQeJqmf4Ttz3EscQuyFBYDdsTFFd7xgleXcIM8ognR3BG4sdV1Mfq7iC3hVpheYG700Ay6HrQsk';
const produits = ref([
  { id: 1, titre: 'Produit A', prix: 25, images: '../../assets/img/images1.jpg'},
  { id: 2, titre: 'Produit B', prix: 30 },
  { id: 3, titre: 'Produit C', prix: 40 },
]);

const produitTotal = computed(() => produits.value.length);
const prixTotal = computed(() => produits.value.reduce((acc, produit) => acc + produit.prix, 0));

const showPaymentForm = ref(false);
const elementsOptions = ref({ client_secret: null });
let stripe;
let elements;
let card;

// Créer une référence pour le div cardElement
const cardElementRef = ref(null);

const handlePaymentClick = async () => {
  showPaymentForm.value = true;
  await generatePaymentIntent();
};

onMounted(() => {
  if (showPaymentForm.value && elementsOptions.value.client_secret) {
    initializeStripe();
  }
  authStore.getUser();
});

const generatePaymentIntent = async () => {
  try {
    const token = '73|KUuYkvVrGlqP28lij0jaG9k0gjY6mxNqzuPLA01D41ed91dc'; // Remplace par la méthode de récupération de ton token

    const response = await fetch('https://api.leonmorival.xyz/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajout du header Authorization
      },
      body: JSON.stringify({
        amount: prixTotal.value * 100, // Conversion du prix en centimes
        currency: 'eur',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data.client_secret) {
      elementsOptions.value.client_secret = data.client_secret;
      initializeStripe();
    } else {
      console.error('Erreur lors de la création du client secret.');
    }
  } catch (error) {
    console.error('Erreur lors de la génération du PaymentIntent', error);
  }
};

const initializeStripe = async () => {
  stripe = await loadStripe(pk);
  elements = stripe.elements();

  card = elements.create('card');

  nextTick(() => {
    const cardElement = cardElementRef.value;
    if (cardElement) {
      card.mount(cardElement);
    }
  });
};

const pay = async () => {
  if (!stripe || !card || !elementsOptions.value.client_secret) {
    console.error('❌ Stripe n\'est pas correctement initialisé.');
    return;
  }

  const { error, paymentIntent } = await stripe.confirmCardPayment(elementsOptions.value.client_secret, {
    payment_method: {
      card: card,
    },
  });

  if (error) {
    console.error('Erreur lors du paiement:', error.message);
  } else if (paymentIntent.status === 'succeeded') {
    console.log('Paiement réussi!');
    // Rediriger vers une page de confirmation ou autre action
  }
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
          <p class="text-[#FF6B00]">{{ prixTotal }}€</p>
        </div>
        <div class="flex flex-col px-4">
          <button class="flex justify-center mt-2 md:mt-2 text-white bg-[#302082] rounded-lg pt-4" @click="handlePaymentClick">
            Checkout
          </button>
        </div>
      </div>
    </section>

    <!-- Partie basse : Panier -->
    <section class="p-3 md:px-8 w-full">
      <div class="bg-white p-5 text-black text-xl font-bold w-full min-h-[535px] rounded-lg">
        <h2 class="text-2xl mb-4">Votre panier</h2>
        <div class="flex justify-between mr-6">
          <button class="font-normal text-base text-[#FF6B00] bg-white p-0 hover:cursor-pointer" @click="removeAllProduits">
            Remove all products
          </button>
          <h5 class="font-normal text-base hidden md:block mr-2">Prix</h5>
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
                  <p class="text-gray-800 font-semibold">{{ produit.prix }}€</p>
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
    <section v-if="showPaymentForm && elementsOptions.client_secret">
      <div ref="cardElementRef"></div>
      <button @click="pay" class="payment-button">Payer maintenant</button>
    </section>
  </div>
</template>

<style scoped>

</style>
