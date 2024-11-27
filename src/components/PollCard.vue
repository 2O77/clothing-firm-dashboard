<template>
    <div class="poll-card">
        <div class="image-section">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpgcpsmess.files.wordpress.com%2F2014%2F04%2Fimage40.jpg&f=1&nofb=1&ipt=c800b9b318a4e07317853c94c4aa6189c3778529a9d0f5f3c52c025a154f2718&ipo=images"
                alt="image">
        </div>
        <div class="poll-section">
            <div class="poll-item like-section">
                <h4>Ürünü Ne Kadar Beğendiniz?</h4>
                <Rating v-model="value" />
            </div>
            <div class="poll-item currency-section">
                <h4>Fiyat Beklentiniz Nedir?</h4>
                <h4>(Gerçek Fiyat: 3131₺)</h4>
                <InputNumber class="poll-input" mode="currency" currency="TRY" locale="tr-TR" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Anket',
        required: false
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400/000000/FFFFFF/png',
        required: false,
    },

})

const value = ref(null);
</script>

<style setup>
.poll-card {
    width: 300px;
    height: 400px;
    overflow: hidden;
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--p-content-border-radius);
    background-color: var(--p-content-background);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.poll-card:hover {
    transform: scale(1.02);
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.5);
}

.image-section {
    width: 100%;
    height: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-section img {
    width: 100%;
    height: auto;
}

.poll-section {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    gap: 10px;
}

.poll-item {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.like-section h4 {
    margin-bottom: 3px;
    margin-top: 0px;
}

.currency-section h4 {
    margin-bottom: 2px;
    margin-top: 3px;
}

.poll-input {
    margin-top: 10px
}
</style>