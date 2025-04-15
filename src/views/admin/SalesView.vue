<script setup>
    import VueTailwindDatePicker from 'vue-tailwind-datepicker';
    import { useSalesStore } from '@/stores/sales';
    import { ref } from 'vue';
    import SaleDetails from '@/components/SaleDetails.vue';
    import { formatCurrency } from '@/helpers';

    const salesStore = useSalesStore();

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM',
    })
</script>

<template>
    
    <h1 class="text-4xl font-black my-10">Resumen de ventas</h1>
    
    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-1/3 flex justify-center p-5">
            <VueTailwindDatePicker 
                v-model="salesStore.date"
                i18n="es"
                as-single
                no-input
                :formatter="formatter"
            />
        </div>

        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
            <p
                class="text-center text-lg"
                v-if="salesStore.isDateSelected"
            >
                Ventas de la fecha: <span class="font-black"> {{ salesStore.date }} </span>
            </p>

            <p class="text-center text-lg" v-else>Selecciona una fecha</p>

            <div v-if="salesStore.salesCollection.length" class="space-y-5">
                <SaleDetails 
                    v-for="sale in salesStore.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
                <p class="text-right text-2xl">Total del dia: 
                    <span class="font-black">{{ formatCurrency(salesStore.totalDaySales) }}</span>
                </p>
            </div>
            <p v-else-if="salesStore.noSales" class="text-lg text-center">No hay ventas en este dia</p>
        </div>
        
    </div>
</template>
