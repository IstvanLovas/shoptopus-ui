<template>
    <a href="https://goo.gl/maps/6vaJzT8W966sAvxQ9" target="_blank" class="flex gap-4 2xl:gap-6">
        <icon-address class="w-12 lg:w-[69px]" />

        <span :class="['font-paralucent text-shadow-md', fontSizeClass, textColorClass]">
            10A Couzens Place, <br>Bristol, BS34 8PL, <br class="lg:hidden">United Kingdom
        </span>
    </a>
</template>

<script>
    export default {
        name: 'LinkAddress',

        props: {
            color: {
                default: 'white'
            },

            size: {
                default: 'xl'
            }
        },

        computed: {
            fontSizeClass() {
                return {
                    'lg': 'text-2xl',
                    'xl': 'text-xl lg:text-3xl'
                }[this.size]
            },

            textColorClass() {
                return {
                    'white': 'text-white',
                    'black': 'text-[#333333]'
                }[this.color]
            }
        }
    }
</script>
