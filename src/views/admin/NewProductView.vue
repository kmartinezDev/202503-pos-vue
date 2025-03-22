<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Link from '@/components/Link.vue';
    import useImage from '@/composables/useImage';
    import { useProductsStore } from '@/stores/products';

    const { onFileChange, url, isImageUploaded } = useImage();
    const productsStore = useProductsStore();
    const router = useRouter();

    const formData = reactive({
        name: '',
        category: '',
        price: '',
        available: '',
        image: null
    });

    const submitHandler = async data => {
        const { image, ...values } = data
        
        try {
            await productsStore.createProduct({
                ...values, 
                image: url.value 
            })

            router.push({ name: 'admin-products' })
        } catch (error) {
            
        }
    }

</script>

<template>
    <div>
        <Link
            to="admin-products"
        >
            Volver
        </Link>
    </div>
    <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

    <div class="flex justify-center bg-white shadow">
        <div class="mt-10 p-10 w-full 2xl:w-2/4"> 

            <FormKit
                type="form"
                submit-label="Agregar Producto"
                incomplete-message="Completa todos los campos para agregar un producto"
                @submit="submitHandler" 
                :value="formData"
            >
                <FormKit 
                    type="text"
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del producto"
                    validation="required"
                    :validation-messages="{ required: 'El nombre del producto es requerido' }"
                    v-model.trim="formData.name"
                />

                <FormKit 
                    type="file"
                    label="Imagen del producto"
                    name="image"
                    validation="required"
                    :validation-messages="{ required: 'La imagen del producto es obligatoria' }"
                    accept="image/*"
                    @change="onFileChange"
                    v-model="formData.image"
                />

                <div v-if="isImageUploaded">
                    <p class="font-black">Imagen del producto:</p>
                    <img 
                        :src="url" 
                        alt="Imagen del producto" 
                        class="w-32 h-32" 
                    />
                </div>

                <FormKit 
                    type="select"
                    label="Categoría"
                    name="category"
                    validation="required"
                    :validation-messages="{ required: 'La categoria es obligatoria' }"
                    :options="productsStore.categoryOptions"
                    v-model.number="formData.category"
                />

                <FormKit 
                    type="number"
                    label="Precio"
                    name="price"
                    placeholder="Precio del producto"
                    validation="required"
                    :validation-messages="{ required: 'El precio del producto es requerido' }"
                    min="0"
                    v-model.number="formData.price"
                />

                <FormKit 
                    type="number"
                    label="Disponibles"
                    name="available"
                    placeholder="Cantidad disponible"
                    validation="required"
                    :validation-messages="{ required: 'La cantidad del productos es obligatoria' }"
                    min="1"
                    v-model.number="formData.available"
                />
            </FormKit>

        </div>
    </div>
</template>

