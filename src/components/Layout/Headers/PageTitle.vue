<template>
    <h1 :class="['font-paralucent font-bold leading-none text-2xl', marginBottomClass, textColorClass, { 'text-shadow': textShadow }]">
        <slot></slot>
    </h1>
</template>

<script>
    export default {
        name: 'PageTitle',

        props: {
            color: {
                default: 'wz-black'
            },

            textShadow: {
                default: false
            },

            marginB: {
                default: '6'
            }
        },

        computed: {
            textColorClass() {
                return {
                    'wz-black': 'text-wz-black',
                    'white': 'text-white'
                }[this.color]
            },

            marginBottomClass() {
                return {
                    '0': 'mb-0',
                    '6': 'mb-6',
                }[this.marginB]
            }
        }
    }
</script>
