<template>
  <div class="container">
    <n-input
      v-model:value="searchQuery"
      placeholder="Rechercher un Pokémon..."
      clearable
      class="search-bar"
    />
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="card-list">
      <n-card v-for="pokemon in filteredPokemons" :key="pokemon.id" class="pokemon-card">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
        <h3>{{ pokemon.name }} (#{{ pokemon.pokedexId }})</h3>
        <p><strong>PV:</strong> {{ pokemon.lifePoints }}</p>
        <p>
          <strong>Type:</strong>
          <n-tag :type="getTagType(pokemon.type) as 'success' | 'error' | 'info' | 'warning' | 'default'">{{ pokemon.type }}</n-tag>
        </p>
        <p><strong>Attaque ID:</strong> {{ pokemon.attackId }}</p>
        <p><strong>Taille:</strong> {{ pokemon.height }}m</p>
        <p><strong>Poids:</strong> {{ pokemon.weight }}kg</p>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { NInput, NCard, NTag } from 'naive-ui';
import axios from 'axios';

interface PokemonCard {
  id: number;
  name: string;
  pokedexId: number;
  type: string;
  imageUrl: string;
  lifePoints: number;
  attackId: number;
  height: number;
  weight: number;
}

const searchQuery = ref('');
const pokemons = ref<PokemonCard[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchPokemons = async () => {
  try {
    console.log("🔍 Chargement des cartes Pokémon...");

    const response = await axios.get('https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards');
    
    console.log("✅ Réponse API reçue:", response.data);

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("⚠ Format de données inattendu !");
    }

    pokemons.value = response.data.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      pokedexId: pokemon.pokedexId,
      type: pokemon.type,
      imageUrl: pokemon.imageUrl,
      lifePoints: pokemon.lifePoints,
      attackId: pokemon.attackId,
      height: pokemon.height,
      weight: pokemon.weight
    }));

    console.log("✅ Pokémons chargés:", pokemons.value);
  } catch (err) {
    console.error("❌ Erreur lors du chargement des cartes:", err);
    error.value = `Erreur: ${(err as Error).message}`;
  } finally {
    loading.value = false;
  }
};


onMounted(fetchPokemons);

const filteredPokemons = computed(() =>
  pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const getTagType = (type: string) => {
  const typeColors: Record<string, string> = {
    Grass: 'success',
    Fire: 'error',
    Water: 'info',
    Electric: 'warning',
  };
  return typeColors[type] || 'default';
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
.loading, .error {
  text-align: center;
  font-size: 18px;
  color: red;
}
.card-list {
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
