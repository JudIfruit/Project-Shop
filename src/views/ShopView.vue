<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import Navbar from "@/components/Navbar.vue";
import "boxicons";

const authStore = useAuthStore();
const router = useRouter();

const pk = 'pk_test_51Ny7JaHVnu49ZpSn2I9HIRbRQeJqmf4Ttz3EscQuyFBYDdsTFFd7xgleXcIM8ognR3BG4sdV1Mfq7iC3hVpheYG700Ay6HrQsk';
const produits = ref([]);

const produitTotal = computed(() => produits.value.length);
const prixTotal = computed(() => produits.value.reduce((acc, produit) => acc + produit.prix, 0));

const showPaymentForm = ref(false);
const elementsOptions = ref({ client_secret: null });
let stripe;
let elements;
let card;

const cardElementRef = ref(null);

const handlePaymentClick = async () => {
  if (!authStore.user) {
    router.push('/login');
    return;
  }
  
  await generatePaymentIntent();
  if (elementsOptions.value.client_secret) {
    localStorage.setItem('client_secret', elementsOptions.value.client_secret); // Stocker le client_secret
    router.push('/payment'); 
  } else {
    alert('Erreur lors de la génération du client_secret.');
  }
};

const removeProduit = (id) => {
  produits.value = produits.value.filter((produit) => produit.id !== id);
  localStorage.setItem('panier', JSON.stringify(produits.value));
};

const removeAllProduits = () => {
  produits.value = [];
  localStorage.setItem('panier', JSON.stringify(produits.value));
};

onMounted(() => {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  produits.value = panier;

  if (showPaymentForm.value && elementsOptions.value.client_secret) {
    initializeStripe();
  }
  authStore.getUser();
});

const generatePaymentIntent = async () => {
  try {
    if (!authStore.user || !authStore.user.token) {
      console.error('❌ Aucun utilisateur connecté ou token non disponible.');
      return;
    }

    const token = authStore.user.token; // Récupérer dynamiquement le token

    const response = await fetch('https://api.leonmorival.xyz/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utilisation du token dynamique
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
    <section v-if="produitTotal > 0" class="mt-12 flex flex-wrap gap-4 px-3 justify-center md:flex-nowrap md:px-8">
      <div class="bg-white h-[150px] w-full min-w-[250px] flex items-center justify-center text-black text-xl font-bold rounded-lg flex-1">
        Bannière Promotion
      </div>
      <div class="bg-white w-full md:w-[350px] h-[150px] flex flex-col md:p-4 text-black font-bold rounded-lg text-xl overflow-hidden">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between p-4">
          <p>Sous-total ({{ produitTotal }} article(s)):</p>
          <p class="text-[#FF6B00]">{{ prixTotal }}€</p>
        </div>
        <div class="flex flex-col px-4">
          <button 
            v-if="prixTotal > 0" 
            class="flex justify-center align-center md:mt-2 text-white bg-[#FF6B00] rounded-lg p-4" 
            @click="handlePaymentClick"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>

    <section v-if="produitTotal > 0" class="p-3 md:px-8 w-full">
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
            <div class="flex w-full md:w-60 md:h-60 justify-center">
              <img :src="produit.image" alt="Produit" class="w-24 h-24 md:w-60 md:h-60 object-cover rounded-md">
            </div>
            <div class="flex flex-col flex-1 ml-4 w-full md:h-full">
              <div class="grid md:flex md:justify-between items-center w-full">
                <div>
                  <h3 class="text-lg font-bold">{{ produit.titre }}</h3>
                </div>
                <div>
                  <p class="text-gray-800 font-semibold">{{ produit.prix }}€</p>
                </div>
              </div>
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

    <section v-if="produitTotal === 0" class="flex flex-col items-center justify-center mt-60">
      <p class="text-xl font-bold">Aucun article dans le panier</p>
      <button @click="router.push('/')" class="mt-4 px-6 py-2 bg-[#FF6B00] text-white rounded-lg">Voir les produits</button>
    </section>
  </div>
</template>


<style scoped>

</style>
