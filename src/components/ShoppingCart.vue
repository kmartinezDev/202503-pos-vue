<script setup>
    import { useCartStore } from '@/stores/cart';
    import { useCouponStore } from '@/stores/coupons';
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue';
    import Amount from '@/components/Amount.vue';
    import CouponsForm from '@/components/CouponsForm.vue';
    import { formatCurrency } from '@/helpers';

    const cartStore = useCartStore(); 
    const couponStore = useCouponStore();

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

            <Amount v-if="couponStore.isValidCoupon">
                <template #label> Descuento: </template>
                {{ formatCurrency(couponStore.discount) }}
            </Amount>

            <Amount>
                <template #label> Total a pagar: </template>
                {{ formatCurrency(cartStore.total) }}
            </Amount>
        </dl>

        <CouponsForm />

        <button
            type="button"
            class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
            @click="cartStore.checkout"
        >
            Confirmar compra
        </button>
    </div>
</template>

