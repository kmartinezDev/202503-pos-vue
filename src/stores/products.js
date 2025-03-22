import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy } from "firebase/firestore";

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore();

    const categories = [
        { id: 1, name: 'Sudaderas' },
        { id: 2, name: 'Tenis' },
        { id: 3, name: 'Lentes' }
    ]

    const plainQuery = query(
        collection(db, 'products'),
        orderBy('available', 'asc')
    )
        
    const productsCollection = useCollection(
        plainQuery
    )

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    const categoryOptions = computed(() => {
        const options = [
            { label: 'Selecciona una categoría', value: null },
            ...categories.map(category => (
                { label: category.name, value: category.id}
            ))
        ]

        return options
    })

    const noResults = computed(()=> productsCollection.value.length === 0)

    return {
        createProduct,
        categoryOptions,
        productsCollection,
        noResults
    }
})