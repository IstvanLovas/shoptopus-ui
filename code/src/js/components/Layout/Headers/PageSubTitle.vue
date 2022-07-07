<template>
    <h2 :class="['font-semibold leading-none shrink-0', colorClass, marginBottomClass]">
        <slot></slot>
    </h2>
</template>

<script>
    export default {
        name: 'PageSubTitle',

        props: {
            color: {
                default: 'inherit'
            },

            marginB: {
                default: '4'
            }
        },

        computed: {
            colorClass() {
                return {
                    'inherit': '',
                    'white': 'text-white'
                }[this.color]
            },

            marginBottomClass() {
                return {
                    '2': 'mb-2',
                    '4': 'mb-4',
                    '6': 'mb-6'
                }[this.marginB]
            }
        }
    }
</script>
