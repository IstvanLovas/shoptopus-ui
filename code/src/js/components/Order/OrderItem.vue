<template>
    <product :product="normalisedProduct" :quantity="item.quantity" />
</template>

<script>
    import Product from '@/components/Tiles/Product'

    export default {
        name: 'OrderItem',
        
        props: {
            item: {
                required: true
            },

            showTokenFee: {
                default: false
            }
        },

        components: {
            Product
        },

        computed: {
            normalisedProduct() {
                return {
                    name: this.item.product_name,
                    image_url_small: this.item.product_image_url_small,
                    price: this.item.product_price
                }
            }
        }
    }
</script>
