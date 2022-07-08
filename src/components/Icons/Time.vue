<template>
    <span :class="[colorClass, sizeClasses, 'flex']">
        <i class="far fa-clock md:relative"></i>
    </span>
</template>

<script>
    export default {
        name: 'Time',

        props: {
            color: {
                default: 'orange'
            },

            size: {
                default: 'sm'
            }
        },

        computed: {
            colorClass() {
                return {
                    'orange': 'text-[#ff8a76]',
                    'white': 'text-white'
                }[this.color]
            },

            sizeClasses() {
                return {
                    'xs': 'text-sm md:text-base',
                    'sm': 'text-base md:text-2xl',
                    '2xl': 'text-2xl'
                }[this.size]
            }
        }
    }
</script>
