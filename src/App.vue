<template>
    <div class="app">
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.app {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>