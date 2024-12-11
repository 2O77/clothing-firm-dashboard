<template>
    <div class="home-card" :class="{ 'admin-card': isAdmin }">
        <div class="image-section">
            <img :src="image" alt="image">
        </div>
        <div class="title-section">
            <h2>{{ title }}</h2>
        </div>
    </div>
</template>

<script setup>
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
    isAdmin: {
        type: Boolean,
        default: false
    }
})


</script>

<style scoped>
.home-card {
    width: 300px;
    height: 400px;
    overflow: hidden;
    border: 1px solid var(--p-primary-color);
    border-radius: var(--p-content-border-radius);
    background-color: var(--p-content-background);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.home-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.5);
}

.image-section {
    width: 100%;
    height: 75%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-section img {
    width: auto;
    height: 100%;
}

.title-section {
    justify-content: center;
    align-items: center;
    height: 25%;
    display: flex;
}
</style>