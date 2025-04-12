<script setup>
    import { useCartStore } from '@/stores/cart';
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue';
    import Amount from '@/components/Amount.vue';
    import { formatCurrency } from '@/helpers';

    const cartStore = useCartStore(); 
</script>

<template>
    <p v-if="cartStore.isEmpty" class="text-xl text-center text-gray-900">El carrito esta vacio</p>
    <div v-else>
        <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>
        <ul
            role="list"
            class="mt-6 divide-y divide-gray-200"
        >
            <ShoppingCartItem
                v-for="item in cartStore.items"
                :key="item.id"
                :item="item" 
            />
        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label> Subtotal: </template>
                {{ formatCurrency(cartStore.subtotal) }}
            </Amount>

            <Amount>
                <template #label> Impuestos: </template>
                {{ formatCurrency(cartStore.taxes) }}
            </Amount>

            <Amount>
                <template #label> Total a pagar: </template>
                {{ formatCurrency(cartStore.total) }}
            </Amount>
        </dl>
    </div>
</template>

