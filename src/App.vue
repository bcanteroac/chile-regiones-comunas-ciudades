<template>

  <div class="container">

    <el-select v-model="selectedRegion" filterable placeholder="Selecciona una región" style="width: 240px">
      <el-option v-for="item in regiones" :key="item.id" :label="item.nombre" :value="item.id" />
    </el-select>

    <el-select v-model="selectedProvincia" :disabled="!selectedRegion" filterable placeholder="Selecciona una ciudad"
      style="width: 240px">
      <el-option v-for="item in provinciasFiltradas" :key="item.id" :label="item.nombre" :value="item.id" />
    </el-select>

    <el-select v-model="selectedComuna" :disabled="!selectedProvincia" filterable placeholder="Selecciona una comuna"
      style="width: 240px">
      <el-option v-for="item in comunasFiltradas" :key="item.id" :label="item.nombre" :value="item.id" />
    </el-select>

  </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const regiones = ref([]);
const provincias = ref([]);
const comunas = ref([]);

const selectedRegion = ref<number | null>(null);
const selectedProvincia = ref<number | null>(null);
const selectedComuna = ref<number | null>(null);

const provinciasFiltradas = computed(() =>
  provincias.value.filter(c => c.region_id === selectedRegion.value)
);

const comunasFiltradas = computed(() =>
  comunas.value.filter(c => c.provincia_id === selectedProvincia.value)
);

// Reset de valores dependientes
watch(selectedRegion, () => {
  selectedProvincia.value = null;
  selectedComuna.value = null;
});

watch(selectedProvincia, () => {
  selectedComuna.value = null;
});

onMounted(() => {
  fetch('/regiones.json')
    .then(response => response.json())
    .then(data => {
      regiones.value = data.regiones;
    });

  fetch('/provincias.json')
    .then(response => response.json())
    .then(data => {
      provincias.value = data.provincias;
    });

  fetch('/comunas.json')
    .then(response => response.json())
    .then(data => {
      comunas.value = data.comunas;
    });
});
</script>


<style scoped>

* {
  /* border: 1px solid red; */
}


.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  height: 100vh;
  width: 100%;
}

</style>
