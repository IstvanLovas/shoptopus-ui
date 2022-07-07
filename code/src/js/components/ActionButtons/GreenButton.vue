<template>
    <button
        :type="type"
        :disabled="validating || disabled"
        :class="['font-semibold text-white flex items-center justify-center border-2 shrink-0 text-center px-4 rounded-full shadow-xs focus:outline-none transition ease-in-out duration-150', fontSizeClass, widthClass, paddingYClass, marginXClass, bgAndBorderClass, { 'cursor-not-allowed' : validating || disabled }]"
    >
        <span v-if="validating" class="text-2xl">
            <i class="fas fa-circle-notch fa-spin"></i>
        </span>

        <span v-else-if="text" v-text="text"></span>

        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'GreenButton',

        props: {
            text: {
                required: false
            },

            validating: {
                default: false
            },

            disabled: {
                default: false
            },

            type: {
                default: 'button'
            },

            fontSize: {
                default: 'base'
            },

            width: {
                default: '56'
            },

            paddingY: {
                default: '2.5'
            },

            marginX: {
                default: '0'
            }
        },

        computed: {
            fontSizeClass() {
                return {
                    'base': 'text-base',
                    'xs': 'text-xs',
                    'sm': 'text-sm',
                    'lg': 'text-lg',
                    'xl': 'text-xl',
                    'large-xl': 'lg:text-lg'
                }[this.fontSize]
            },

            widthClass() {
                return {
                    'full': 'w-full',
                    'auto': 'w-auto',
                    '28': 'w-28',
                    '56': 'w-56',
                    'large-xl': 'w-56 lg:w-80'
                }[this.width]
            },

            paddingYClass() {
                return {
                    '1.5': 'py-1.5',
                    '2': 'py-2',
                    '2.5': 'py-2.5',
                    '3': 'py-3'
                }[this.paddingY]
            },

            marginXClass() {
                return {
                    'auto': 'mx-auto',
                    '0': 'mx-0',
                    '2': 'mx-2',
                    '2.5': 'mx-2.5',
                    'align-right': 'ml-auto',
                    'align-left': 'mr-auto'
                }[this.marginX]
            },

            bgAndBorderClass() {
                return this.validating || this.disabled ? 'bg-wz-medium-green border-wz-medium-green' : 'bg-wz-green border-wz-green'
            }
        }
    }
</script>
