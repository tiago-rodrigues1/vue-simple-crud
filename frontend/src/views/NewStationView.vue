<script setup>
import { ref } from 'vue'

import { StationService } from '@/services/StationService'

const title = ref('')
const resume = ref('')

function handleSubmit(e) {
  e.preventDefault()

  const stationData = {
    title: title.value,
    resume: resume.value
  }

  if (StationService.store(stationData)) {
    alert('Cadastrado com sucesso')
  } else {
    alert('Erro no cadastro')
  }
}
</script>

<template>
  <div class="container-xl p-5">
    <h1 class="mb-4">Nova Estação</h1>
    <form action="" class="container-xl p-3 bg-light rounded-md mb-4" @submit="handleSubmit">
      <div class="mb-3">
        <label for="station-title" class="form-label">Título da estação</label>
        <input
          type="text"
          class="form-control"
          id="station-title"
          v-model="title"
          placeholder="Título da estação"
        />
      </div>
      <div class="mb-3">
        <label for="station-resume" class="form-label">Resumo da estação</label>
        <textarea
          class="form-control"
          id="station-resume"
          rows="5"
          placeholder="Resumo da estação"
          v-model="resume"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary col-3">Salvar</button>
    </form>
  </div>
</template>
