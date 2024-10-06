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
  const geoJsonUrl = '/tr-cities-utf8.json'  // Public klasöründen GeoJSON dosyasına erişim Kaynak:https://github.com/cihadturhan/tr-geojson
  
  const loadMap = () => {
  map.value = L.map('map', {
    center: [39.9334, 32.8597],  // Harita merkez koordinatları
    zoom: 6,                     // Varsayılan zoom seviyesi
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
  
  // Türkiye İl sınırları GeoJSON katmanını haritaya ekleyen fonksiyon
  const loadGeoJsonLayer = async () => {
    try {
      const response = await fetch(geoJsonUrl)
      if (!response.ok) {
        throw new Error("İl sınırları GeoJSON verisi yüklenirken hata oluştu.")
      }
  
      const geoJsonData = await response.json()
  
      L.geoJSON(geoJsonData, {
        style: {
        color: '#ff0000',  // Sınır rengi (Kırmızı)
        weight: 3,       // Çizgi kalınlığı
        opacity: 0.8,      // Çizgi şeffaflığı
        fillColor: '#ffd39b', // Dolgu rengi (saydam turuncu)
        fillOpacity: 0.1   // Dolgu şeffaflığı
      }
      }).addTo(map.value)
  
    } catch (error) {
      console.error("İl sınırları GeoJSON verisi yüklenirken hata oluştu:", error)
    }
  }
  
  // ISO tarih formatını dd.MM.yyyy formatına dönüştüren fonksiyon
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString)
    
    if (isNaN(date.getTime())) {
      return 'Hatalı Tarih'
    }
  
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
  
    return `${day}.${month}.${year}`
  }
  
  onMounted(() => {
    loadMap()
    loadData()
  })
  </script>
  
  <style scoped>
 
  </style>
  