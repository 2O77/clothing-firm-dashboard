
<template>
  <div>
    <h2>Haritadaki Pin'i özelleştirelim.</h2>
    <div class="map-container" id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const customIcon = L.icon({
  iconUrl: 'https://organizasyonara.com/favicon-32x32.png', // İkonun URL'si
  iconSize: [38, 38], // İkon boyutu
  iconAnchor: [19, 38], // İkonun haritada sabitleneceği nokta
  popupAnchor: [0, -38] // Popup konumu
});

onMounted(() => {
  const map = L.map('map').setView([39.9334, 32.8597], 12); // Ankara

  // OpenStreetMap katmanı
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/ertugrulakdag/vue3-map-leafletjs" target="_blank">github.com/ertugrulakdag/vue3-map-leafletjs</a>'
  }).addTo(map);

  // Custom icon ile marker ekleme
  L.marker([39.9334, 32.8597], { icon: customIcon }).addTo(map)
    .bindPopup('Ankara / Altındağ');
})
</script>

<style scoped>
#map {
  width: 99%;
  height: 80vh; 
  border: 5px solid #ddd;
  border-radius: 10px;
  padding: 5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
