<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

const router = useRouter();
const pk = 'pk_test_51Ny7JaHVnu49ZpSn2I9HIRbRQeJqmf4Ttz3EscQuyFBYDdsTFFd7xgleXcIM8ognR3BG4sdV1Mfq7iC3hVpheYG700Ay6HrQsk';
let stripe;
let elements;
let card;

const cardElementRef = ref(null);
const clientSecret = ref(null);

const initializeStripe = async () => {
  stripe = await loadStripe(pk);
  elements = stripe.elements();
  card = elements.create('card');
  card.mount(cardElementRef.value);
};

const pay = async () => {
  if (!stripe || !card || !clientSecret.value) {
    alert('Stripe n\'est pas correctement initialisé.');
    return;
  }

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
    payment_method: {
      card: card,
    },
  });

  if (error) {
    alert('Erreur lors du paiement : ' + error.message);
    router.push('/shop'); // Retour au panier sans rien faire
  } else if (paymentIntent.status === 'succeeded') {
    alert('Paiement réussi !');
    localStorage.setItem('panier', JSON.stringify([])); // Vider le panier
    router.push('/shop'); // Retour au panier
  }
};

onMounted(async () => {
  // Récupérer le client_secret depuis le localStorage ou une API
  clientSecret.value = localStorage.getItem('client_secret');
  if (clientSecret.value) {
    await initializeStripe();
  } else {
    alert('Erreur : client_secret introuvable.');
    router.push('/shop');
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#302082] text-white">
    <h1 class="text-3xl font-bold mb-6">Informations de Paiement</h1>
    <div ref="cardElementRef" class="bg-white p-4 rounded-lg text-black w-96"></div>
    <button
      @click="pay"
      class="mt-6 bg-[#FF6B00] text-white px-6 py-3 rounded-lg"
    >
      Payer maintenant
    </button>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles ici */
</style>