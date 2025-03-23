import { defineStore } from "pinia";
import { computed } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import router from "@/router";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore();
    const storage = useFirebaseStorage();

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

    async function updateProduct(docRef, product) {
        console.log('Updating product', product)

        const { image, url, ...values } = product

        if (image.length) {
            await updateDoc(docRef, {...values, image: url.value })
        } else {
            await updateDoc(docRef, values)
        }

        router.push({ name: 'admin-products' })
    }

    async function deleteProduct(id) {
        console.log('Deleting product', id)

        if (confirm('¿Estás seguro de eliminar este producto?')) {
            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef)
            const { image } = docSnap.data()
            const imageRef = storageRef(storage, image)

            await Promise.all([
                deleteObject(imageRef),
                deleteDoc(docRef)
            ])
        }
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
        updateProduct,
        deleteProduct,
        categoryOptions,
        productsCollection,
        noResults
    }
})