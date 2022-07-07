<template>
    <div>
        <transition leave-active-class="duration-200">
            <div v-show="show" class="fixed inset-0 overflow-auto z-[101]">
                <transition enter-active-class="ease-out duration-300"
                            enter-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="ease-in duration-200"
                            leave-class="opacity-100"
                            leave-to-class="opacity-0">
                    <div v-show="show" class="fixed z-0 inset-0 transition-all">
                        <div class="absolute inset-0 bg-wz-black opacity-80"></div>
                    </div>
                </transition>

                <transition enter-active-class="ease-out duration-300"
                            enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                            leave-active-class="ease-in duration-200"
                            leave-class="opacity-100 translate-y-0 sm:scale-100"
                            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div v-show="show" @click.self="close" class="relative z-[1] min-h-screen pt-23 pb-6 flex items-center justify-center md:pt-28 md:pb-8 lg:pt-36">
                        <div class="rounded-lg shadow-md transition-all" :class="[maxWidthClass, backgroundColor]">
                            <slot></slot>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        
        props: {
            show: {
                default: false
            },
            maxWidth: {
                default: '2xl'
            },
            closeable: {
                default: true
            },
            backgroundColor: {
                default: 'bg-white'
            }
        },

        methods: {
            close() {
                if (this.closeable) {
                    this.$emit('close')
                }
            }
        },

        watch: {
            show: {
                immediate: true,
                handler: (show) => {
                    if (show) {
                        document.body.style.overflow = 'hidden'
                    } else {
                        document.body.style.overflow = null
                    }
                }
            }
        },

        created() {
            const closeOnEscape = (e) => {
                if (e.key === 'Escape' && this.show) {
                    this.close()
                }
            }

            document.addEventListener('keydown', closeOnEscape)

            this.$once('hook:destroyed', () => {
                document.removeEventListener('keydown', closeOnEscape)
            })
        },

        computed: {
            maxWidthClass() {
                return {
                    'sm': 'sm:max-w-sm',
                    'md': 'sm:max-w-md',
                    'lg': 'sm:max-w-lg',
                    'xl': 'sm:max-w-xl',
                    '2xl': 'sm:max-w-2xl',
                    '3xl': 'sm:max-w-3xl',
                }[this.maxWidth]
            }
        }
    }
</script>
