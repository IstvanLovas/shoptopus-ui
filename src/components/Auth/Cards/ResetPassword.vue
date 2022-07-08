<template>
    <form class="w-full" @submit.prevent="submit" @keydown="clearError($event.target.name)">
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Reset your password
        </h2>

        <div class="space-y-4 mb-6">
            <div>
                <input type="email" name="email" placeholder="Enter your email" v-model="form.email" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                <span v-if="hasError('email')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('email')"></span>
            </div>

            <div>
                <input type="password" name="password" placeholder="Create a password" v-model="form.password" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                <p class="text-md text-wz-medium-grey mt-1 text-center"><small>(Minimum 8 characters)</small></p>
            </div>

            <div>
                <input type="password" name="password_confirmation" placeholder="Confirm password" v-model="form.password_confirmation" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                <span v-if="hasError('password')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('password')"></span>
            </div>
        </div>

        <green-button type="submit" text="Reset" :disabled="!canSubmitForm" :validating="validating" />
    </form>
</template>

<script>
    import FormMixin from "@/components/FormMixin"

    export default {
        name: 'ResetPassword',

        mixins: [FormMixin],

        data() {
            return {
                form: {
                    token: null,
                    email: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },

        computed: {
            uri() {
                return `auth/reset-password`
            },

            hasValidPasswords() {
                return this.form.password.length >= this.minPasswordLength &&
                    this.form.password === this.form.password_confirmation
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
            const token = this.$route.query.hasOwnProperty('token') ? this.$route.query.token : null

            if (token) {
                this.form.token = token
            }
        },

        methods: {
            onSuccess(data) {
                this.$emit('password-updated', data)

                this.form = {
                    token: null,
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        }
    }
</script>
