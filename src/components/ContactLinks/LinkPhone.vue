<template>
    <a href="tel:+447557470321" title="+44(0)755 7470 321" class="flex items-center gap-4 2xl:gap-6">
        <icon-tel class="w-12 lg:w-[69px]" />

        <span :class="['font-paralucent text-shadow-md', fontSizeClass, textColorClass]">
            +44(0)755 7470 321
        </span>
    </a>
</template>

<script>
    export default {
        name: 'LinkPhone',

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
