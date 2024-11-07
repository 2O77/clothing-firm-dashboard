<template>
  <div>
    <div class="map" id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)
const geoJsonUrl = '/tr-cities-utf8.json'  // Türkiye il sınırlarını içeren GeoJSON dosyasının yolu

const loadMap = () => {
  map.value = L.map('map', {
    center: [38.9637, 35.2433],  // Türkiye'nin ortalama koordinatları
    zoom: 6.8,                     // Varsayılan zoom seviyesi
    minZoom: 5,                  // En düşük zoom seviyesi
    maxZoom: 10,                 // En yüksek zoom seviyesi
    zoomDelta: 0.5,              // Zoom artırma adımı
    zoomSnap: 0.5                // Zoom snap adımı
  })

  // OpenStreetMap katmanını ekle
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/ertugrulakdag/vue3-map-leafletjs" target="_blank">github.com/ertugrulakdag/vue3-map-leafletjs</a>'
  }).addTo(map.value)

  // İl sınırları GeoJSON dosyasını yükleyip haritaya ekleyin
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
    console.log('GeoJSON Verisi:', geoJsonData)  // Veriyi kontrol etmek için konsola yazdırıyoruz

    // GeoJSON verisini haritaya ekleyin, tıklama özelliklerini ekleyin
    L.geoJSON(geoJsonData, {
      style: {
        color: '#ff7800',  // Sınır rengi (açık turuncu)
        weight: 3.1,       // Çizgi kalınlığı
        opacity: 0.8,      // Çizgi şeffaflığı
        fillColor: '#ffd39b', // Dolgu rengi (saydam turuncu)
        fillOpacity: 0.2   // Dolgu şeffaflığı
      },
      onEachFeature: (feature, layer) => {
        // Tıklama olayını tanımlıyoruz
        layer.on('click', (e) => {
          // Tıklanan ilin adını popup'ta göster
          layer.bindPopup(`İl: ${feature.properties.name} <br> Diğer Veri: ${feature.properties.someOtherData}`)
            .openPopup()
        })
      }
    }).addTo(map.value)

  } catch (error) {
    console.error("GeoJSON verisi yüklenirken hata oluştu:", error)
  }
}

onMounted(() => {
  loadMap()
})
</script>

<style scoped></style>
