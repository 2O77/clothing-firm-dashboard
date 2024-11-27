<template>
    <div class="revenue-page">
        <div class="topbar-section">
            <div class="start-section">
                <Select placeholder="Şehir Seçiniz"></Select>
            </div>
            <div class="middle-section">
                <MultiSelect :options="products" placeholder="Ürün Seçin" filter :max-selected-labels="2"
                    class="product-selector" />
                <Button label="Hasılatı Gir" @click="applyRevenue"></Button>
            </div>
            <div class="end-section">
                <Button icon="pi pi-home" @click="goToHome" />
            </div>
        </div>
        <div class="main-section">
            <div class="card-section">
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
                <RevenueCard />
            </div>
            <div class="apply-section"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import RevenueCard from '../components/RevenueCard.vue';
import router from '../router';

const products = ref([
    'gömlek', 'kazak', 'pantul'
])

const goToHome = () => {
    router.push({
        name: 'Home'
    })
}

const applyRevenue = () => {
    router.push({
        name: 'Home'
    })
}

</script>

<style scoped>
.revenue-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
}

.topbar-section {
    width: 100%;
    position: fixed;
    background-color: var(--p-);
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--p-content-border-color);
    z-index: 1000;
    background-color: var(--background-color);
    gap: 20px;
    padding-right: 10px;
    padding-left: 10px;
}

.middle-section {
    display: flex;
    position: absolute;
    gap: 10px;
    width: 100%;
    justify-content: center
}

.end-section {
    justify-content: end;
    width: 100%;
    display: flex;
}

.main-section {
    padding: 20px;
    width: 100%;
    margin-top: 100px;
    /* Ensures the section takes full width */
}

.product-selector {
    width: 400px;
}

.card-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(315px, max-content));
    /* Fixed minimum card width */
    gap: 30px;
    /* Fixed gap between cards */
    justify-content: center;
    /* Center the grid */
    width: 100%;
    /* Grid spans full width */
}

.card-section>* {
    width: 315px;
    /* Card width matches the minimum grid width */
    height: 400px;
    background-color: var(--p-surface);
    /* Example background color */
    border: 1px solid var(--p-content-border-color);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>