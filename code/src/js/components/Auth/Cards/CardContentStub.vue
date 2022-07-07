<template>
    <div class="transition-all">
        <div class="relative w-full flex flex-col items-center justify-between bg-white rounded-lg shadow-md py-8 px-5 sm:max-w-sm sm:mx-auto sm:px-8" :class="[paddingXClass]">
            <button v-if="closeable" type="button" @click="$emit('close')" class="absolute -top-2 right-0 p-4 text-2xl text-wz-dark-grey focus:outline-none">
                <i class="fal fa-times"></i>
            </button>

            <div class="text-sm w-full flex flex-col items-center justify-center">
                <div class="sm:w-full">
                    <slot></slot>
                </div>

                <transition-group name="slide-y-fade" mode="out-in">
                    <div v-if="inlineFlashMessage && userErrorMessage"
                        key="inlineSuccessFlashMessage"
                        class="mt-4 text-red-400 text-xs"
                        v-text="userErrorMessage"
                        @click="$emit('dismiss-user-error-message')"
                    ></div>

                    <div v-else-if="inlineFlashMessage && userSuccessMessage"
                        key="inlineErrorFlashMessage"
                        class="mt-4 text-green-400 text-xs cursor-pointer"
                        v-text="userSuccessMessage"
                        @click="$emit('dismiss-user-success-message')"
                    ></div>

                    <div v-if="showSignUpButton" key="signUpButton" class="flex items-center justify-center">
                        <button
                            type="button"
                            class="inline-block mx-auto text-xs text-center text-wz-turquoise underline underline-offset mt-4 focus:outline-none"
                            @click="$emit('show-sign-up')"
                        >Sign up</button>
                    </div>

                    <p v-if="!hideLoginButton" key="signInButton" class="text-xs text-center text-wz-turquoise mt-4">
                        Already have an account? <button type="button" class="inline-block underline underline-offset focus:outline-none" @click="$emit('show-login')">Log in</button>
                    </p>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CardContentStub',
        
        props: {
            userErrorMessage: {
                default: null
            },

            userSuccessMessage: {
                default: null
            },

            inlineFlashMessage: {
                default: false
            },

            hideLoginButton: {
                default: false
            },

            showSignUpButton: {
                default: false
            },

            closeable: {
                default: true
            },

            paddingX: {
                default: 'md'
            }
        },

        computed: {
            paddingXClass() {
                return {
                    'sm': 'sm:px-4',
                    'md': 'sm:px-6',
                    'lg': 'sm:px-8'
                }[this.paddingX]
            }
        }
    }
</script>
