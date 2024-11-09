<template>
    <div class="sidebar">
        <div class="title-box">
            <Button v-if="isSmallScreen" icon="pi pi-bars" @click="closeSidebar" />
            <div class="title-text">
                <h1 class="text">{{ cityName }}</h1> <!-- Display the city name here -->
                <p class="text">datasını görmektesiniz</p>
            </div>
            <!-- Close button for smaller screens -->
        </div>
        <div class="sidebar-content">
            <div class="sidebar-content-item">
                <h3>Satış Sayısı</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="line" :data="ratingChartData" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3> Sevilme Oranı</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="ratingChartData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useWindowSize } from '@vueuse/core'; // VueUse provides a useful composition API for responsive design

const props = defineProps({
    isSidebarVisible: Boolean,
    cityName: String,
});

// Determine if screen width is less than 1300px
const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 1300);

const emit = defineEmits(['close-sidebar']);
const closeSidebar = () => {
    emit('closeSidebar');
};

const isSidebarVisibleLocal = computed(() => props.isSidebarVisible);

const ratingChartData = ref()

const setRatingChartData = () => {
    return {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        datasets: [
            {
                label: 'Satışlar',
                data: [150, 200, 300, 250, 400, 350, 450, 500, 380, 420, 550, 600], // Örnek satış verileri
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)',
                    'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)',
                    'rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'],
                borderWidth: 1
            }
        ]
    };
};

onMounted(() => {
    ratingChartData.value = setRatingChartData();
    console.log(props.isSidebarVisible)
});

watch(width, () => {
    ratingChartData.value = setRatingChartData();
});

watch(isSidebarVisibleLocal, () => {
    setTimeout(1)
    ratingChartData.value = setRatingChartData();
    console.log("sjsj")
})


</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--p-content-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    /* Add this line */
    transition: width 0.3s ease, opacity 0.3s ease;
}

.title-box {
    width: 100%;
    height: 111px;
    min-height: 100px;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid var(--p-content-border-color);
    position: relative;
}

.text {
    padding: 0;
    margin: 0;
}

.sidebar-content {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 10px;
    padding-left: 10px;
    gap: 60px;
}

.sidebar-content-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 10px;
}

/* Media Query for close button on small screens */
@media (max-width: 1300px) {
    .title-box {
        flex-direction: row;
        justify-content: space-between;
        padding: 0 10px;
    }

    .title-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}

.title-text {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.chart-box {
    width: 100%;
    height: auto
}
</style>
