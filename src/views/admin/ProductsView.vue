<script setup>
    import Link from '@/components/Link.vue';
    import { useProductsStore } from '@/stores/products';
    import Product from '@/components/Product.vue';

    const productsStore = useProductsStore();
</script> 

<template>
    <div>
        <Link
            to="admin-new-product"
        >
            Nuevo Producto
        </Link>
    </div>
    <h1 class="text-4xl font-black my-10">Productos</h1>

    <p v-if="productsStore.noResults">No hay resultados</p>

    <ul
        v-else
        role="list"
        class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
    >
        <Product
            v-for="product in productsStore.productsCollection"
            :key="product.id"
            :product="product"
        /> 
    </ul>
</template>

