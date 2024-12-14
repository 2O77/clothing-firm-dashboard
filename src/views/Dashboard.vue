<template>
    <div class="dashboard-page">
        <div class="main">
            <div class="topbar-section">
                <DashboardTopbar @toggleSidebarVisibility="toggleSidebarVisibility" @update="handleUpdate"
                    :sliderAgeRange="sliderAgeRange" :model="model" :size="size" :gender="gender" :logout="logout" />
            </div>
            <div class="map-section">
                <TurkiyeCitiesMapComponent :isSidebarVisible="isSidebarVisible" @openSidebar="openSidebar" />
            </div>
        </div>
        <div :class="isSidebarVisible ? 'sidebar-section' : 'sidebar-not-visible'">
            <DashboardSidebar :isSidebarVisible="isSidebarVisible" :cityName="selectedCity" @closeSidebar="closeSidebar"
                :responseData="responseData" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import TurkiyeCitiesMapComponent from '../components/TurkiyeCitiesMapComponent.vue'
import DashboardTopbar from '../components/DashboardTopbar.vue'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import AuthService from '../services/AuthService'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSidebarVisible = ref(true)
const selectedCity = ref("Türkiye Geneli")
const model = ref(null)
const size = ref(null)
const gender = ref(null)
const sliderAgeRange = ref([0, 99])

const responseData = ref(null)

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

const handleUpdate = (updatedValues) => {
    sliderAgeRange.value = updatedValues.sliderAgeRange
    model.value = updatedValues.model
    size.value = updatedValues.size
    gender.value = updatedValues.gender

    if (model.value === "Bütün Modeller") {
        model.value = null
    }

    if (size.value === "Bütün Bedenler") {
        size.value = null
    }
}

const sendDashboardRequest = async () => {
    const data = {
        age_range: sliderAgeRange.value.join('-'),
        model: model.value,
        size: size.value,
        gender: gender.value,
        city: selectedCity.value
    }

    if (data.city === "Türkiye Geneli") {
        data.city = null
    }

    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log('Response:', result)

        responseData.value = result
    } catch (error) {
        console.error('Error making request:', error)
    }
}

const getToken = async () => {
    try {
        const token = await AuthService.getToken();
        if (!token) {
            throw new Error('Invalid token');
        }
        console.log('Token:', token);
    } catch (error) {
        console.error('Failed to get token', error.message);
        router.push('/auth');
    }
};

watch([sliderAgeRange, model, size, gender, selectedCity], () => {
    sendDashboardRequest();
}, { immediate: true })

onMounted(() => {
    getToken();
    sendDashboardRequest();
})

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
