<template>
    <div :class="['fixed bottom-0 right-0 w-auto max-w-3xl p-4 z-50 cursor-pointer overflow-hidden', displayClass]" @click="$emit('hide')">
        <transition enter-active-class="ease-out duration-500"
                    enter-class="opacity-0 translate-x-full"
                    enter-to-class="opacity-100 translate-x-0"
                    leave-active-class="ease-in duration-500"
                    leave-class="opacity-100 translate-x-0"
                    leave-to-class="opacity-0 translate-x-full">
            <div v-show="show" class="font-semibold leading-6 flex items-start shadow-2xl p-6 transition-all" :class="[bgClass, textColorClass]">
                <span class="flex text-2xl">
                    <i v-if="level === 'info' || level === 'danger'" class="fal fa-check-circle"></i>
                </span>
                <span v-html="message" class="ml-2"></span>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'FlashMessage',
        
        props: {
            show: {
                default: false
            },

            message: {
                default: ''
            },

            level: {
                default: 'info',
                type: String,
                validator: function (value) {
                    return ['info', 'danger'].indexOf(value) !== -1
                }
            },

            timeout: {
                default: 5000
            },

            maxViewport: {
                default: ''
            }
        },

        computed: {
            displayClass() {
                return {
                    '': '',
                    'sm': 'sm:hidden',
                    'md': 'md:hidden',
                    'lg': 'lg:hidden',
                    'xl': 'xl:hidden'
                }[this.maxViewport]
            },

            bgClass() {
                return {
                    'info': 'bg-wz-light-blue',
                    'danger': 'bg-wz-orange'
                }[this.level]
            },

            textColorClass() {
                return {
                    'info': 'text-wz-blue',
                    'danger': 'text-white'
                }[this.level]
            }
        },

        watch: {
            show: {
                immediate: false, handler(showing) {
                    if (showing) {
                        setTimeout(() => this.hide(), this.timeout)
                    } else {
                       this.hide()
                    }
                }
            }
        },

        methods: {
            hide() {
                setTimeout(() => this.$emit('hide'), 800)
            }
        }
    }
</script>
