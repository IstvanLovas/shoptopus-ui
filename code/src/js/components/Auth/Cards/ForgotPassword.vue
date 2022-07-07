<template>
    <form class="w-full" @submit.prevent="submit" @keydown="clearError($event.target.name)">
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Enter email address
        </h2>

        <div class="mb-8">
            <input type="email" name="email" placeholder="Enter your email" v-model="form.email" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

            <span v-if="hasError('email')" class="inline-block mt-1 text-red-400 text-xs" v-text="getError('email')"></span>
        </div>

        <green-button type="submit" text="Request password reset" width="auto" :disabled="!canSubmitForm" :validating="validating" />
    </form>
</template>

<script>
    import FormMixin from "@/components/FormMixin"

    export default {
        name: 'ForgotPassword',

        mixins: [FormMixin],

        data() {
            return {
                form: {
                    email: ''
                }
            }
        },

        computed: {
            uri() {
                return `auth/forgot-password`
            },

            hasValidEmail () {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            },

            canSubmitForm() {
                return this.hasValidEmail &&
                    !this.hasUserErrorMessage &&
                    !this.hasAnyErrors() &&
                    !this.validating
            }
        },

        methods: {
            onSuccess(data) {
                this.$emit('password-reset-link-sent', data)

                this.form = {
                    email: ''
                }
            }
        }
    }
</script>
