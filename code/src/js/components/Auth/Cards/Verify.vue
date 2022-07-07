<template>
    <form class="w-full" @submit.prevent="submit" @keydown="clearError($event.target.name)">
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Verify email
        </h2>

        <div class="mb-14">
            <input type="email" name="email" placeholder="Enter your email" v-model="form.email" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

            <span v-if="hasError('email')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('email')"></span>
        </div>

        <green-button type="submit" text="Send" :disabled="!canSubmitForm" :validating="validating" />
    </form>
</template>

<script>
    import moment from 'moment'
    import FormMixin from "@/components/FormMixin"

    export default {
        name: 'Verify',

        mixins: [FormMixin],

        props: {
            emailAddress: {
                default: false
            }
        },

        data() {
            return {
                form: {
                    email: ''
                }
            }
        },

        computed: {
            uri() {
                return `auth/verify/resend`
            },

            hasValidEmail() {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            },

            canSubmitForm() {
                let verificationDateSent = localStorage.getItem('st_email_verification_code_sent')

                if (verificationDateSent) {
                    let diff = moment().subtract(1, 'minute').unix() - verificationDateSent

                    if (diff <= 0) return false
                }

                return this.hasValidEmail &&
                    !this.hasUserErrorMessage &&
                    !this.hasAnyErrors() &&
                    !this.validating
            }
        },

        mounted() {
            setTimeout(() => {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (this.$route.query.hasOwnProperty('email') && re.test(this.$route.query.email)) {
                    this.form.email = decodeURI(this.$route.query.email)
                } else if(this.emailAddress) {
                    this.form.email = this.emailAddress
                }
            },1000)
        },

        methods: {
            onSuccess(data) {
                localStorage.setItem('st_email_verification_code_sent', moment().unix())
                
                this.$emit('verification-code-resent', data)

                this.form = {
                    email: ''
                }
            }
        }
    }
</script>
