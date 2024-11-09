<template>
    <div class="topbar">
        <div class="contents">
            <div class="slider-box">
                <div class="input-box">
                    <label>yaş aralığı: </label>
                    <InputText v-model.number="sliderAgeRange[0]" class="input-item" />
                    <InputText v-model.number="sliderAgeRange[1]" class="input-item" />
                </div>
                <Slider v-model="sliderAgeRange" class="slider-item" range />
            </div>
            <div class="selector-box">
                <MultiSelect :options="products" placeholder="Ürün Tipi Seçin" filter :max-selected-labels="2"
                    class="product-selector" />
                <MultiSelect :options="sizes" placeholder="Ürün Bedeni Seçin" filter :max-selected-labels="2"
                    class="product-selector" />
            </div>
            <div class="radio-buttons">
                <Checkbox v-model="genders" value="kadın" />
                <label for="kadin">kadın</label>
                <Checkbox v-model="genders" value="erkek" />
                <label for="erkek">erkek</label>
            </div>
        </div>
        <Button class="sidebar-button" icon="pi pi-bars" @click="toggleSidebarVisibility" />
    </div>
</template>

<script setup>
import { Checkbox } from 'primevue';
import { ref } from 'vue';

const emit = defineEmits(['toggleSidebarVisibility'])

const sliderAgeRange = ref([18, 99])

const products = ref([
    'gömlek', 'kazak', 'pantul'
])

const sizes = ref([
    "xxl", "xl", "l", "m", "s", "xs"
])

const genders = ref([
    'erkek', 'kadın'
])

const toggleSidebarVisibility = () => {
    emit('toggleSidebarVisibility', "")
}

</script>

<style scoped>
.topbar {
    display: flex;
    align-items: center;
    height: 100px;
    justify-content: space-between;
    gap: 10px;
    padding: 0 20px;
    border: none;
    border-radius: 0;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--p-content-border-color);
}

.slider-item {
    width: 150px;
}

.input-item {
    width: 50px;
}

.slider-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-direction: column;
}

.input-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.listbox {
    width: 200px;
    height: 100%;
}

.contents {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.radio-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.selector-box {
    gap: 10px;
    display: flex;
}

.product-selector {
    height: 40px
}

.sidebar-button {
    min-width: 40px;
}

@media screen and (max-width: 950px) {
    .topbar {
        overflow-x: auto;
        white-space: nowrap;
    }


}
</style>
