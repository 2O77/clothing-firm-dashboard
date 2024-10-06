<template>
  <div id="app">
    <!-- Tab başlıkları -->
    <ul class="tabs">
      <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">Basit Harita</li>
      <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">Özelleştirilmiş Pin</li>
      <li :class="{ active: activeTab === 3 }" @click="activeTab = 3">Dimaik oluşan harita</li>
      <li :class="{ active: activeTab === 4 }" @click="activeTab = 4">Haritada gruplanan pinler </li>
    </ul>

    <!-- Tab içeriği -->
    <div class="tab-content">
      <SimpleMapComponent v-if="activeTab === 1" />
      <CustomIconComponent v-if="activeTab === 2" />
      <DynamicMapComponent v-if="activeTab === 3" />
      <InteractiveMapComponent v-if="activeTab === 4" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SimpleMapComponent from './components/SimpleMapComponent.vue'
import CustomIconComponent from './components/CustomIconComponent.vue'
import DynamicMapComponent from './components/DynamicMapComponent.vue'
import InteractiveMapComponent from './components/InteractiveMapComponent.vue'

const activeTab = ref(1)
</script>

<style scoped>
/* Stil güncellemeleri */
.tabs {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid #1cbd12;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;  
  background-color: #fff;
  z-index: 1000;  
}

.tabs li {
  padding: 15px 20px;
  cursor: pointer;
  color: #666;
  border-bottom: 3px solid transparent;  
  font-weight: bold;
  margin-right: 10px;
}

.tabs li.active {
  border-bottom: 3px solid #5c967c;  
  color: #42b983;
}

.tab-content {
  margin-top: 40px;  
  padding: 1px;
  width: 100%;
  height: calc(100vh - 60px); 
}

 
</style>
