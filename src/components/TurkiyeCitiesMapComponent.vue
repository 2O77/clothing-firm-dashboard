<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  isSidebarVisible: {
    default: true,
    type: Boolean
  }
})

const map = ref(null)
const geoJsonUrl = '/tr-cities-utf8.json'  // Türkiye il sınırlarını içeren GeoJSON dosyasının yolu
const selectedLayer = ref(null)  // Reference to store the selected layer

const emit = defineEmits(['openSidebar'])

const loadMap = () => {
  map.value = L.map('map', {
    center: [38.9637, 35.2433],  // Türkiye'nin ortalama koordinatları
    zoom: props.isSidebarVisible ? 6.7 : 7.2,  // Sidebar duruma göre zoom seviyesi
    minZoom: 5,
    maxZoom: 10,
    zoomDelta: 0.5,
    zoomSnap: 0.5
  })

  // OpenStreetMap katmanını ekle
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/ertugrulakdag/vue3-map-leafletjs" target="_blank">github.com/ertugrulakdag/vue3-map-leafletjs</a>'
  }).addTo(map.value)

  loadGeoJsonLayer()
}

// Türkiye İl sınırları GeoJSON katmanını haritaya ekleyen fonksiyon
const loadGeoJsonLayer = async () => {
  try {
    const response = await fetch(geoJsonUrl)
    if (!response.ok) {
      throw new Error("İl sınırları GeoJSON verisi yüklenirken hata oluştu.")
    }

    const geoJsonData = await response.json()
    console.log('GeoJSON Verisi:', geoJsonData)

    L.geoJSON(geoJsonData, {
      style: {
        color: '#a78bfa',
        weight: 3.1,
        opacity: 0.8,
        fillColor: '#c4b5fd',
        fillOpacity: 0.15
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          if (selectedLayer.value) {
            selectedLayer.value.setStyle({
              color: '#a78bfa',
              fillColor: '#c4b5fd',
              fillOpacity: 0.15
            })
          }

          layer.setStyle({
            fillColor: '#7c3aed',
            fillOpacity: 1
          })

          selectedLayer.value = layer
          emit('openSidebar', feature.properties.name)

        })
      }
    }).addTo(map.value)

  } catch (error) {
    console.error("GeoJSON verisi yüklenirken hata oluştu:", error)
  }
}

const updateMap = () => {
  if (map.value) {
    map.value.remove()  // Remove the current map instance
  }
  loadMap()  // Reload the map with the updated settings
}

onMounted(() => {
  loadMap()
})

watch(
  () => props.isSidebarVisible,
  () => {
    updateMap()  // Call updateMap when the sidebar visibility changes
  }
)
</script>

<style>
.map {
  width: 1300px;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1850px) {
  .map {
    width: 1000px;
  }
}

@media screen and (max-width: 1500px) {
  .map {
    width: 800px;
  }
}

@media screen and (max-width: 950px) {
  .map {
    width: 700px;
  }
}

@media screen and (max-width: 750px) {
  .map {
    width: 500px;
  }
}
</style>