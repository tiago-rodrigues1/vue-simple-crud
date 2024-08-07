<script setup>
import { ref, watch, onMounted } from 'vue'

import StationCard from '@/components/StationCard.vue'
import { StationService } from '@/services/StationService'

const stations = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    stations.value = await StationService.listAll()
  } catch (error) {
    console.log('deu erro')
  }
})

watch(stations, async () => {
  loading.value = false
})

function remove_station(id) {
    let i = 0;

    console.log("fooi")

    for (i = 0; i < stations.value.length; ++i) {
        console.log(id)
        console.log(stations.value[i]._id)

        stations.value = stations.value.filter((obj) => { return obj._id != id })
    }
}

</script>

<template>
  <div class="container-xl p-5">
    <h1 class="mb-4">Estações</h1>
    <form action="" class="container-xl p-3 bg-light rounded-md mb-4">
      <div class="mb-3">
        <label for="station-title" class="form-label">Título da estação</label>
        <div class="d-flex items-center gap-3">
          <input
            type="text"
            class="form-control"
            id="station-title"
            placeholder="Pesquisar por título"
          />
          <button class="btn btn-primary col-3">Buscar</button>
        </div>
      </div>
    </form>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="spinner-border text-primary" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="col" v-for="station in stations" :key="station.id" v-else>
        <StationCard :station="station" @deleteStation="remove_station" />
      </div>
    </div>
  </div>
</template>
