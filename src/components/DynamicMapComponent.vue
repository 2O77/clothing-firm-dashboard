<template>
  <div>
    <h2>Harita lokasyon verisi milliemlak.gov.tr üzerinden alınmıştır.</h2>
    <p>Türkiye'de şu an Satışa sunulan taşınmaz ilanladır.</p>
    <div class="map" id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const map = ref(null)
const apiUrl = 'https://mebis-cbs-s-p.csb.gov.tr/Proxy/index?url=http%3A%2F%2Fmebis-geo-01.csb.gov.tr%2Fgeoserver%2FMEOP%2Fwfs%3Frequest%3DGetFeature%26version%3D2.0.0%26srsName%3DEPSG%3A3857%26outputFormat%3Dapplication%252Fjson%26typeNames%3DMEOP%3AMILEWEB_SATIS%26CQL_FILTER%3D1%3D1%20and%20ihale_tarihi%20%3E%3D%202024-10-06T00%3A00%3A00.000Z'

const loadMap = () => {
  map.value = L.map('map').setView([39.9334, 32.8597], 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://github.com/ertugrulakdag/vue3-map-leafletjs" target="_blank">github.com/ertugrulakdag/vue3-map-leafletjs</a>'
  }).addTo(map.value)
}

const loadData = async () => {
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error("Veri alınırken hata oluştu.")
    }
    
    const geoJsonData = await response.json()

    // Her feature için bir marker oluştur
    geoJsonData.features.forEach(feature => {
      const coordinates = feature.geometry.coordinates
      const yuzolcumu = feature.properties.yuzolcumu
      const tasinmaz_no = feature.properties.tasinmaz_no
      const ihale_tarihi = formatDate(feature.properties.ihale_tarihi)

      // Leaflet'te uzunluk ve enlem ters olduğu için koordinatları ters çeviriyoruz
      const latLng = L.Projection.SphericalMercator.unproject(L.point(coordinates))

      // Marker ekle
      L.marker([latLng.lat, latLng.lng]).addTo(map.value)
        .bindPopup(`Yüzölçümü: ${yuzolcumu} m² <br>İhale Tarihi: ${ihale_tarihi}<br>Taşınmaz No: ${tasinmaz_no} `)
    })
  } catch (error) {
    console.error("Veri yüklenirken hata oluştu:", error)
  }
}
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)
  
  // Geçerli tarih olup olmadığını kontrol et
  if (isNaN(date.getTime())) {
    return 'Hatalı Tarih'
  }

  const day = String(date.getDate()).padStart(2, '0')   // Gün
  const month = String(date.getMonth() + 1).padStart(2, '0') // Ay (0-indexed olduğu için +1)
  const year = date.getFullYear()  // Yıl

  return `${day}.${month}.${year}`
}
onMounted(() => {
  loadMap()
  loadData()
})
</script>

<style scoped>
 
</style>
