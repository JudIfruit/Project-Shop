# cynaFront

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## API Documentation

Notre API, testée via API Platform, est accessible à l'adresse suivante : [https://api.leonmorival.xyz/api](https://api.leonmorival.xyz/api)

Toutes les routes disponibles ont été vérifiées et sont prêtes à être utilisées.



## Architectural Decision Records (ADR)

### Adoption de VueJS et Tailwind CSS pour le Frontend

**Titre :** Adoption de VueJS et Tailwind CSS pour le Frontend

**Contexte :**

Nous devons développer une interface utilisateur moderne, réactive et facile à maintenir pour notre application. Plusieurs frameworks et librairies existent, mais nogit        us avons besoin d'une solution qui offre un bon compromis entre rapidité de développement, performance et maintenabilité à long terme.

**Décision :**

Nous utilisons VueJS pour la structure et la logique de l'application, et Tailwind CSS pour le styling. VueJS est un framework progressif, facile à apprendre et à intégrer, offrant une excellente performance et une grande flexibilité. Tailwind CSS, quant à lui, est un framework CSS utility-first qui permet de styliser rapidement l'application avec une approche composant et une grande cohérence visuelle.

**Conséquences :**

*   ✅ **Développement rapide :** VueJS et Tailwind CSS permettent de prototyper et de développer rapidement des interfaces utilisateur.
*   ✅ **Composants réutilisables :** VueJS encourage la création de composants réutilisables, ce qui facilite la maintenance et l'évolution de l'application.
*   ✅ **Styling cohérent :** Tailwind CSS assure une cohérence visuelle grâce à son système de classes utilitaires et sa configuration personnalisable.
*   ✅ **Bonne performance :** VueJS est performant, et Tailwind CSS peut être optimisé pour réduire la taille du CSS en production.
*   ❌ **Courbe d'apprentissage (Tailwind CSS) :** L'approche utility-first de Tailwind CSS peut nécessiter un temps d'adaptation.
*   ❌ **Configuration initiale :** La configuration de Tailwind CSS peut être un peu complexe au début.

**Alternatives considérées :**

*   **React + Material UI/Bootstrap:**
    *   ✅ Large communauté et écosystème.
    *   ✅ Composants UI prêts à l'emploi.
    *   ❌ Plus complexe à configurer et à personnaliser.
    *   ❌ Peut être plus lourd en termes de performance.
*   **Vanilla JavaScript + CSS personnalisé:**
    *   ✅ Contrôle total sur le code.
    *   ✅ Flexibilité maximale pour des designs uniques.
    *   ❌ Développement plus long et plus complexe.
    *   ❌ Risque d'incohérences visuelles et maintenance plus difficile.


