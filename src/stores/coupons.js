import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore("coupon", () => {

    const cartStore = useCartStore()
    const couponCode = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage = ref(0)
    const discount = ref(0)

    const VALID_COUPONS = [
        {name: '10DESCUENTO', discount: .10},
        {name: '20DESCUENTO', discount: .20},
    ]

    watch(discountPercentage, () => {
        discount.value = (cartStore.total * discountPercentage.value).toFixed(2)
    })

    function redeemCoupon() {
        if(VALID_COUPONS.some(coupon => coupon.name === couponCode.value)) {
            couponValidationMessage.value = 'Aplicando...'

            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponCode.value).discount
                couponValidationMessage.value = '¡Cupón aplicado con éxito!'
            }, 2000)
        }
        else{
            couponValidationMessage.value = 'El código de cupón no es válido'
        }

        setTimeout(() => { couponValidationMessage.value = '' }, 6000)
    }

    function $reset() {
        couponCode.value = ''
        discountPercentage.value = 0
        discount.value = 0
        couponValidationMessage.value = ''
    }

    const isValidCoupon = computed(() =>  discountPercentage.value > 0)

    return {
        couponCode,
        discount,
        couponValidationMessage,
        redeemCoupon,
        $reset,
        isValidCoupon
    }
})