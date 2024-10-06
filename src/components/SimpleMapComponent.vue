<template>
  <div>
    <h2>Basit bir harita yapalım.</h2>
    <div class="map" id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('map').setView([39.9334, 32.8597], 12)  

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/ertugrulakdag/vue3-map-leafletjs" target="_blank">github.com/ertugrulakdag/vue3-map-leafletjs</a>'
  }).addTo(map)

  L.marker([39.9334, 32.8597]).addTo(map)
    .bindPopup('Ankara / Altındağ')
    .openPopup()
})
</script>

<style scoped>

</style>
