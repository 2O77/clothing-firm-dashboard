<template>
    <div class="home-page">
        <div class="title-section">
            <h1>
                Giysi Firmamızın Müşteri Memnuniyet Sitesine Hoşgeldiniz
            </h1>
            <h2>
                Aşağıda var olan anketlerimizden birisini çözebilirsiniz.
            </h2>
        </div>
        <div class="poll-section">
            <div class="home-cards">
                <HomeCard image="src/assets/Screenshot From 2024-11-26 01-39-04.png" title="Admin Paneli"
                    @click="goToAdminPanel" isAdmin="true" />
                <HomeCard title="Memnuniyet Anketi" @click="goToPollPanel" isAdmin="false" />
            </div>
        </div>
        <Button label="Admin Girişi Yap" severity="danger" size="large" style="margin-top: 30px;" />
    </div>
</template>

<script setup>
import HomeCard from '../components/HomeCard.vue';
import router from '../router';

const goToAdminPanel = () => {
    router.push({
        name: 'Dashboard'
    })
}

const goToPollPanel = () => {
    router.push({
        name: 'Poll'
    })
}
</script>

<style scoped>
.home-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

.title-section {
    display: flex;
    align-items: center;
    flex-direction: column
}

.poll-section {
    display: flex;
}

.home-cards {
    display: flex;
    justify-content: center;
    gap: 30px;

}
</style>