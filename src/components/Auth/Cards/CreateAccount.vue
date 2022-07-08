<template>
    <form class="w-56 mx-auto" @submit.prevent="submit" @keydown="clearError($event.target.name)">
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Create your account
        </h2>

        <div class="space-y-4 mb-6">
            <div>
                <input type="text" name="first_name" placeholder="First name" v-model="form.first_name" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                <span v-if="hasError('first_name')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('first_name')"></span>
            </div>

            <div>
                <input type="text" name="last_name" placeholder="Last name" v-model="form.last_name" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

                <span v-if="hasError('last_name')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('last_name')"></span>
            </div>

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

            <div>
                <p class="text-xs text-center text-wz-turquoise mt-4 mb-2">
                    Have a referral code? Enter below
                </p>
                <input type="text" name="referral_code" placeholder="Referral code" v-model="form.referral_code" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">
                <span v-if="hasError('referral_code')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('referral_code')"></span>
            </div>
        </div>

        <green-button type="submit" text="Continue" :disabled="!canSubmitForm" :validating="validating" />
    </form>
</template>

<script>
    import FormMixin from "@/components/FormMixin"

    export default {
        name: 'CreateAccount',
        
        mixins: [FormMixin],

        data() {
            return {
                uri: 'auth/register',
                form: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    referral_code: null
                }
            }
        },

        computed: {
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
            const referral_code = this.$route.query.hasOwnProperty('referral_code') ? this.$route.query.referral_code : null

            if (referral_code) {
                this.form.referral_code = referral_code
            }
        },

        methods: {
            onSuccess(data) {
                this.$emit('account-created', data)

                this.form = {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    referral_code: null
                }
            }
        }
    }
</script>
