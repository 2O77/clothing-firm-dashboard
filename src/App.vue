<template>
  <div id="app">
    <!-- Tab başlıkları -->
    <ul class="tabs">
      <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">Basit Harita</li>
      <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">Tab 2</li>
      <li :class="{ active: activeTab === 3 }" @click="activeTab = 3">Tab 3</li>
    </ul>

    <!-- Tab içeriği -->
    <div class="tab-content">
      <BasitHaritaComponent v-if="activeTab === 1" />
      <TabTwo v-if="activeTab === 2" />
      <TabThree v-if="activeTab === 3" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BasitHaritaComponent from './components/BasitHaritaComponent.vue'
import TabTwo from './components/TabTwo.vue'
import TabThree from './components/TabThree.vue'

const activeTab = ref(1)
</script>

<style scoped>
/* Stil güncellemeleri */
.tabs {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #ddd; /* Tabların alt çizgisi */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Tam genişlik */
  background-color: #fff;
  z-index: 1000; /* Tablar üstte görünsün */
}

.tabs li {
  padding: 15px 20px;
  cursor: pointer;
  color: #666;
  border-bottom: 3px solid transparent; /* Alt çizgi varsayılan */
  font-weight: bold;
  margin-right: 10px;
}

.tabs li.active {
  border-bottom: 3px solid #5c967c; /* Aktif tabın alt çizgisi */
  color: #42b983;
}

.tab-content {
  margin-top: 40px; /* Tabların yukarıdaki konumunu dengelemek için içerik yukarıdan boşluk bırakır */
  padding: 1px;
  width: 100%;
  height: calc(100vh - 60px); /* Sekmelerin kapladığı alanı hesaplayarak tam ekran al */
}

 
</style>
