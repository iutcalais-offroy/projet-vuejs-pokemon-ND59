<template>
  <div class="deck-container">
    <h2>🃏 Mon Deck ({{ deck.length }} cartes)</h2>

    <div v-if="deck.length === 0" class="empty-deck">
      Votre deck est vide. Ajoutez des cartes depuis le Deck Builder !
    </div>

    <div v-else class="deck-list">
      <n-card
        v-for="pokemon in deck"
        :key="pokemon.id"
        class="pokemon-card"
        :title="pokemon.name"
        :hoverable="true"
      >
        <template #header>
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
        </template>
        
        <p><strong>PV:</strong> {{ pokemon.lifePoints }}</p>
        <p><strong>Type:</strong> {{ pokemon.type }}</p>
        <n-button type="error" @click="removeFromDeck(pokemon)">
          Retirer du Deck
        </n-button>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { NCard, NButton } from 'naive-ui';

interface PokemonCard {
  id: number;
  name: string;
  imageUrl: string;
  lifePoints: number;
  type: string;
}

// Définition des propriétés
const props = defineProps<{
  deck: PokemonCard[];
}>();

// Définition des événements
const emit = defineEmits<{
  (e: 'remove-from-deck', pokemon: PokemonCard): void;
}>();

// Méthode pour retirer un Pokémon du deck
const removeFromDeck = (pokemon: PokemonCard) => {
  emit('remove-from-deck', pokemon);
};
</script>

<style scoped>
.deck-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.empty-deck {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.deck-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pokemon-card {
  width: 180px;
  text-align: center;
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>