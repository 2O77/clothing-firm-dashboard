<template>
    <div class="dashboard-page">
        <div class="main">
            <div class="topbar-section">
                <DashboardTopbar @toggleSidebarVisibility="toggleSidebarVisibility" />
            </div>
            <div class="map-section">
                <TurkiyeCitiesMapComponent :isSidebarVisible="isSidebarVisible" @openSidebar="openSidebar" />
            </div>
        </div>
        <div :class="isSidebarVisible ? 'sidebar-section' : 'sidebar-not-visible'">
            <DashboardSidebar :isSidebarVisible="isSidebarVisible" :cityName="selectedCity"
                @closeSidebar="closeSidebar" />
        </div>
    </div>
</template>

<script setup>
import TurkiyeCitiesMapComponent from '../src/components/TurkiyeCitiesMapComponent.vue'
import DashboardTopbar from '../src/components/DashboardTopbar.vue'
import DashboardSidebar from '../src/components/DashboardSidebar.vue';
import { ref } from 'vue';

const isSidebarVisible = ref(true)
const selectedCity = ref('Türkiye Geneli')

const toggleSidebarVisibility = () => {
    isSidebarVisible.value = !isSidebarVisible.value
    selectedCity.value = "Türkiye Geneli"
}

const openSidebar = (cityName) => {
    isSidebarVisible.value = true
    selectedCity.value = cityName
}

const closeSidebar = () => {
    isSidebarVisible.value = false
}
</script>

<style scoped>
.dashboard-page {
    width: 100%;
    height: 100%;
    display: flex;
}

.sidebar-section {
    width: 700px;
}

.sidebar-not-visible {
    width: 0;
    opacity: 0;
    overflow: hidden;
}

.topbar-section {
    height: 100px;
    width: 100%;
}

.map-section {
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
    margin-left: 5px;
    justify-content: center;
    align-items: center;
}

.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

@media (max-width: 1300px) {

    .sidebar-section,
    .sidebar-not-visible {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background-color);
        z-index: 10000;
        transition: width 0.3s ease, opacity 0.3s ease;
    }

    .sidebar-section {
        opacity: 1;
        width: 100%;
        /* Full width overlay */
        transition: opacity 0.3s ease;
    }

    .sidebar-not-visible {
        opacity: 0;
        width: 0;
    }

    .map-section {
        margin: 0;
    }
}
</style>
