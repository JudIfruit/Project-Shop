<template>
  <header class="bg-[#302082] text-white px-20 py-8 shadow-lg">
    <nav class="flex justify-between items-center">
      <div>
        <RouterLink :to="{ name: 'shop' }" class="text-xl font-bold">Project Shop</RouterLink>
      </div>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <p class="test-sm text-slate-300">
          {{ authStore.user.name }}
        </p>
        <form @submit.prevent="authStore.logout">
          <button>Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'login' }" class="hover:text-gray-400">Login</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="hover:text-gray-400">Register</RouterLink>
      </div>
    </nav>
  </header>
  <div class="container">
    <section class="payment-section">
      <h2>Votre panier</h2>
      <div v-for="produit in produits" :key="produit.id">
        <p>{{ produit.titre }} - {{ produit.prix }}€</p>
      </div>

      <p>Total: {{ prixTotal }}€</p>

      <button @click="handlePaymentClick" class="payment-button">Passer au paiement</button>
    </section>

    <!-- Section de paiement Stripe -->
    <section v-if="showPaymentForm && elementsOptions.client_secret">
      <div ref="cardElementRef"></div>
      <button @click="pay" class="payment-button">Payer maintenant</button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const pk = 'pk_test_51Ny7JaHVnu49ZpSn2I9HIRbRQeJqmf4Ttz3EscQuyFBYDdsTFFd7xgleXcIM8ognR3BG4sdV1Mfq7iC3hVpheYG700Ay6HrQsk';
const produits = ref([
  { id: 1, titre: 'Produit A', prix: 25 },
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

  // Créer l'élément de carte sans personnalisation (style par défaut)
  card = elements.create('card');

  // Attendre que le DOM soit prêt avant de monter l'élément Card
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

<style scoped>
</style>
