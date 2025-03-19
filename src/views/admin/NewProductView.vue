<script setup>
    import Link from '@/components/Link.vue';
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
            >
                <FormKit 
                    type="text"
                    label="Nombre"
                    name="name"
                    placeholder="Nombre del producto"
                    validation="required"
                    :validation-messages="{ required: 'El nombre del producto es requerido' }"
                />

                <FormKit 
                    type="file"
                    label="Imagen del producto"
                    name="image"
                    validation="required"
                    :validation-messages="{ required: 'La imagen del producto es obligatoria' }"
                    accept="image/*"
                />

                <FormKit 
                    type="select"
                    label="Categoría"
                    name="category"
                    validation="required"
                    :validation-messages="{ required: 'La categoria es obligatoria' }"
                    :options="[1,2,3,4,5]"
                />

                <FormKit 
                    type="number"
                    label="Precio"
                    name="price"
                    placeholder="Precio del producto"
                    validation="required"
                    :validation-messages="{ required: 'El precio del producto es requerido' }"
                    min="0"
                />

                <FormKit 
                    type="number"
                    label="Disponibles"
                    name="available"
                    placeholder="Cantidad disponible"
                    validation="required"
                    :validation-messages="{ required: 'La cantidad del productos es obligatoria' }"
                    min="1"
                />
            </FormKit>

        </div>
    </div>
</template>

