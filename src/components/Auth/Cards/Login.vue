<template>
    <div>
        <form class="w-56 mx-auto mb-6" @submit.prevent="attemptSubmit" @keydown="clearError($event.target.name)">
            <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
                Sign in
            </h2>

            <div class="space-y-4 mb-6">
                <div>
                    <input type="email" name="email" placeholder="Enter your email" v-model="form.email" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                    <span v-if="hasError('email')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('email')"></span>
                </div>

                <div>
                    <input type="password" name="password" placeholder="Create a password" v-model="form.password" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                    <span v-if="hasError('password')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('password')"></span>
                </div>
            </div>

            <green-button type="submit" text="Continue" :disabled="!canSubmitForm" :validating="validating" />
        </form>

        <div class="text-center mb-4">
            <button type="button" class="text-xs text-wz-turquoise underline underline-offset-1 focus:outline-none" @click="$emit('reset-password')">Forgot your password? Click here to reset it</button>
        </div>

        <social-login-links @show-user-error-message="$emit('show-user-error-message', $event)" />
    </div>
</template>

<script>
    import { clearRedirectUri } from '@/redirectUri'
    import { getCart } from '@/cart'
    
    import FormMixin from "@/components/FormMixin"

    import SocialLoginLinks from '@/components/Auth/Cards/SocialLoginLinks'

    export default {
        name: 'Login',
        
        mixins: [FormMixin],

        components: {
            SocialLoginLinks
        },

        data() {
            return {
                uri: 'auth/login',
                form: {
                    email: '',
                    password: '',
                    must_verify: false,
                    cart_id: null
                }
            }
        },

        computed: {
            hasValidPasswords() {
                return this.form.password.length >= this.minPasswordLength
            },

            hasValidEmail () {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            },

            canSubmitForm() {
                return this.hasValidEmail &&
                    this.hasValidPasswords &&
                    !this.hasUserErrorMessage &&
                    !this.hasAnyErrors() &&
                    !this.validating
            }
        },

        mounted() {
            if (this.$route.query.hasOwnProperty('mustVerify')) {
                this.form.must_verify = !! this.$route.query.mustVerify
            }
        },

        methods: {
            attemptSubmit() {
                clearRedirectUri()

                let cart = getCart()

                if (cart) {
                    this.form.cart_id = cart.id
                }

                this.submit()
            },

            onSuccess(data) {
                this.$emit('logged-in', {
                    authData: data.data.auth
                })

                this.form = {
                    email: '',
                    password: '',
                    must_verify: false,
                    cart_id: null
                }
            }
        }
    }
</script>
