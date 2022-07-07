<template>
    <a href="mailto:hello@istvanlovas.co.uk" title="hello@istvanlovas.co.uk" class="flex items-center gap-4 2xl:gap-6">
        <icon-envelope class="w-12 lg:w-[69px]" />

        <span :class="['font-paralucent text-shadow-md', fontSizeClass, textColorClass]">
            hello@istvanlovas.co.uk
        </span>
    </a>
</template>

<script>
    export default {
        name: 'LinkEmail',

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
