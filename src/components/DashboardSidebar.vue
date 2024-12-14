<template>
    <div class="sidebar">
        <div class="title-box">
            <Button v-if="isSmallScreen" icon="pi pi-bars" @click="closeSidebar" />
            <div class="title-text">
                <h1 class="text">{{ cityName }}</h1> <!-- Display the city name here -->
                <p class="text">datasını görmektesiniz</p>
            </div>
        </div>
        <div class="sidebar-content">
            <div class="sidebar-content-item">
                <h3>Sevilme Oranı</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="line" :data="ratingChartData" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Beklenen Fiyat</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="priceChartData" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 1</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData1" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 2</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData2" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 3</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData3" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 4</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData4" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 5</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData5" />
                </div>
            </div>
            <div class="sidebar-content-item">
                <h3>Soru 6</h3>
                <div class="chart-box">
                    <Chart v-if="isSidebarVisible" type="bar" :data="trueFalseQuestionChartData6" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
    isSidebarVisible: Boolean,
    cityName: String,
    responseData: Array,
});

const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 1300);

const emit = defineEmits(['close-sidebar']);
const closeSidebar = () => {
    emit('closeSidebar');
};

const ratingChartData = ref(null);
const priceChartData = ref(null);
const trueFalseQuestionChartData1 = ref(null);
const trueFalseQuestionChartData2 = ref(null);
const trueFalseQuestionChartData3 = ref(null);
const trueFalseQuestionChartData4 = ref(null);
const trueFalseQuestionChartData5 = ref(null);
const trueFalseQuestionChartData6 = ref(null);


const processData = (response) => {
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz',
        'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    console.log(props.responseData);
    const ratings = [];
    const prices = [];
    const trueFalseQuestion1 = [];
    const trueFalseQuestion2 = [];
    const trueFalseQuestion3 = [];
    const trueFalseQuestion4 = [];
    const trueFalseQuestion5 = [];
    const trueFalseQuestion6 = [];
    const labels = [];

    // Veriyi işleme
    response.forEach((dataPoint) => {
        if (dataPoint.month && dataPoint.month.includes('-')) {
            const [year, month] = dataPoint.month.split('-');
            const monthIndex = parseInt(month, 10) - 1;

            if (monthIndex >= 0 && monthIndex < months.length) {
                const monthName = months[monthIndex];

                labels.push(`${monthName} ${year}`);

                ratings.push(parseFloat(dataPoint.avg_rating) || 0);
                prices.push(parseFloat(dataPoint.avg_expected_price) || 0);

                trueFalseQuestion1.push(parseFloat(dataPoint.avg_question_1) * 100 || 0);
                trueFalseQuestion2.push(parseFloat(dataPoint.avg_question_2) * 100 || 0);
                trueFalseQuestion3.push(parseFloat(dataPoint.avg_question_3) * 100 || 0);
                trueFalseQuestion4.push(parseFloat(dataPoint.avg_question_4) * 100 || 0);
                trueFalseQuestion5.push(parseFloat(dataPoint.avg_question_5) * 100 || 0);
                trueFalseQuestion6.push(parseFloat(dataPoint.avg_question_6) * 100 || 0);
            }
        }
    });

    console.log('Processed data:', {
        labels,
        ratings,
        prices,
        trueFalseQuestion1,
        trueFalseQuestion2,
        trueFalseQuestion3,
        trueFalseQuestion4,
        trueFalseQuestion5,
        trueFalseQuestion6,
    });

    // Grafik verisi oluşturma
    const ratingData = {
        labels: labels,
        datasets: [
            {
                label: 'Sevilme Oranı',
                data: ratings,
                fill: false,
                borderColor: '#a78bfa', // Yeni renk
                tension: 0.1,
                borderWidth: 1.5, // Yeni weight
                backgroundColor: 'rgba(196, 181, 253, 0.15)', // fillColor renginden uyarlanmış arka plan rengi
            },
        ],
    };

    const priceData = {
        labels: labels,
        datasets: [
            {
                label: 'Beklenen Fiyat',
                data: prices,
                backgroundColor: 'rgba(196, 181, 253, 0.15)', // fillColor'dan uyarlanmış arka plan
                borderColor: '#a78bfa', // Yeni renk
                borderWidth: 1.5, // Yeni weight
            },
        ],
    };


    // Soru 1 - 6 grafik verileri
    const trueFalseQuestionData1 = {
        labels: labels,
        datasets: [
            {
                label: 'Bu kıyafeti alırken kalite beklentiniz karşılandı mı?',
                data: trueFalseQuestion1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    const trueFalseQuestionData2 = {
        labels: labels,
        datasets: [
            {
                label: 'Ürünün tasarımı beklentilerinizi karşıladı mı?',
                data: trueFalseQuestion2,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    const trueFalseQuestionData3 = {
        labels: labels,
        datasets: [
            {
                label: 'Kıyafetin bedeni size uygun mu?',
                data: trueFalseQuestion3,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Mavi tonunda arka plan
                borderColor: 'rgb(75, 192, 192)', // Mavi tonunda sınır
                borderWidth: 1,
            },
        ],
    };


    const trueFalseQuestionData4 = {
        labels: labels,
        datasets: [
            {
                label: 'Kıyafetin dikişleri ve işçiliği beklentilerinizi karşıladı mı?',
                data: trueFalseQuestion4,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1,
            },
        ],
    };

    const trueFalseQuestionData5 = {
        labels: labels,
        datasets: [
            {
                label: 'Markanın genel kalitesine dair beklentileriniz arttı mı?',
                data: trueFalseQuestion5,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    const trueFalseQuestionData6 = {
        labels: labels,
        datasets: [
            {
                label: 'Ürünün genel kalitesine dair olumsuz deneyim yaşadınız mı?',
                data: trueFalseQuestion6,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    return {
        ratingData,
        priceData,
        trueFalseQuestionData1,
        trueFalseQuestionData2,
        trueFalseQuestionData3,
        trueFalseQuestionData4,
        trueFalseQuestionData5,
        trueFalseQuestionData6,
    };
};


onMounted(() => {
    if (props.responseData) {
        const {
            ratingData,
            priceData,
            trueFalseQuestionData1,
            trueFalseQuestionData2,
            trueFalseQuestionData3,
            trueFalseQuestionData4,
            trueFalseQuestionData5,
            trueFalseQuestionData6,
        } = processData(props.responseData);

        ratingChartData.value = ratingData;
        priceChartData.value = priceData;
        trueFalseQuestionChartData1.value = trueFalseQuestionData1;
        trueFalseQuestionChartData2.value = trueFalseQuestionData2;
        trueFalseQuestionChartData3.value = trueFalseQuestionData3;
        trueFalseQuestionChartData4.value = trueFalseQuestionData4;
        trueFalseQuestionChartData5.value = trueFalseQuestionData5;
        trueFalseQuestionChartData6.value = trueFalseQuestionData6;
    }
});

watch(() => props.responseData, (newResponseData) => {
    if (newResponseData) {
        const {
            ratingData,
            priceData,
            trueFalseQuestionData1,
            trueFalseQuestionData2,
            trueFalseQuestionData3,
            trueFalseQuestionData4,
            trueFalseQuestionData5,
            trueFalseQuestionData6,
        } = processData(newResponseData);

        ratingChartData.value = ratingData;
        priceChartData.value = priceData;
        trueFalseQuestionChartData1.value = trueFalseQuestionData1;
        trueFalseQuestionChartData2.value = trueFalseQuestionData2;
        trueFalseQuestionChartData3.value = trueFalseQuestionData3;
        trueFalseQuestionChartData4.value = trueFalseQuestionData4;
        trueFalseQuestionChartData5.value = trueFalseQuestionData5;
        trueFalseQuestionChartData6.value = trueFalseQuestionData6;
    }
}, { immediate: true });
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

.horizontal-bar-chart {
    height: 300px;
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
