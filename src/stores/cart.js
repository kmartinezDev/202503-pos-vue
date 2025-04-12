import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";

export const useCartStore = defineStore("cart", () => {

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)

    const MAX_ITEMS = 5
    const TAX_RATE = 0.10

    // watch(items, () => {
    //     subtotal.value = items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    //     taxes.value = subtotal.value * TAX_RATE
    //     total.value = subtotal.value + taxes.value
    // }, { deep: true })

    watchEffect(()=>{
        subtotal.value = items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
        taxes.value = subtotal.value * TAX_RATE
        total.value = subtotal.value + taxes.value
    })

    function addItem(item) {
        const index = isItemInCart(item.id)
        if( index >= 0) {

            if(isProductAvailable(item, index)) {
                alert('No puedes agregar más unidades')
                return;
            }
            items.value[index].quantity++
        }
        else {
            items.value.push({...item, quantity: 1, id: item.id})
        }
    }

    function updateQuantity(id, quantity) {
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)
    }

    const isItemInCart = id => items.value.findIndex(item => item.id === id)
    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.available || items.value[index].quantity >= MAX_ITEMS
    }

    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(() => {
        return (product) => product.available < MAX_ITEMS ? product.available : MAX_ITEMS
    })

    return {
        items,
        subtotal,
        taxes,
        total,
        addItem,
        updateQuantity,
        removeItem,
        isEmpty,
        checkProductAvailability
    }
})