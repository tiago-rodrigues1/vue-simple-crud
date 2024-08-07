<script setup>
import { StationService } from '@/services/StationService'

defineProps(['station'])

function handleDelete(event, stationId, obj) {
  if (StationService.destroy(stationId)) {
    alert('Deletado com sucesso')
    obj.$emit('deleteStation', stationId);
  } else {
    alert('Erro ao deletar')
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ station.title }}</h5>
      <p class="card-text">
        {{ station.resume }}
      </p>
      <a href="#" class="card-link text-primary">Editar</a>
      <button type="button" @click="handleDelete(event, station._id, this)" class="card-link text-danger">Excluir</button>
    </div>
  </div>
</template>
