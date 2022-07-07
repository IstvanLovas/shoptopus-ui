<template>
    <card-content-stub
        :closeable="closeable"
        :inline-flash-message="inlineFlashMessage"
        :user-error-message="userErrorMessage"
        :user-success-message="userSuccessMessage"
        :hide-login-button="shouldHideLoginButton"
        :show-sign-up-button="currentStep === 'login'"
        @close="onClose"
        @show-login="currentStep = 'login'"
        @show-sign-up="currentStep = 'signUpPreference'"
        @dismiss-user-error-message="userErrorMessage = null"
        @dismiss-user-success-message="userSuccessMessage = null"
    >
        <transition name="slide-y-fade" mode="out-in">
            <login
                v-if="currentStep === 'login'"
                :has-user-error-message="userErrorMessage !== null"
                @logged-in="onLoggedIn"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
                @reset-password="currentStep = 'forgot-password'"
            />

            <create-account
                v-else-if="currentStep === 'createAccount'"
                :has-user-error-message="userErrorMessage !== null"
                @account-created="onAccountCreated"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
            />

            <sign-up-preference
                v-else-if="currentStep === 'signUpPreference'"
                @sign-up-method-selected="onSignUpMethodSelected"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
            />

            <sign-up-with-social-media
                v-else-if="currentStep === 'socialMediaSignUp'"
                :has-user-error-message="userErrorMessage !== null"
                @show-create-account="currentStep = 'createAccount'"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
            />

            <verify
                v-if="currentStep === 'verify'"
                :email-address="geUserEmailAddress"
                :has-user-error-message="userErrorMessage !== null"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
            />

            <forgot-password
                v-if="currentStep === 'forgot-password'"
                :has-user-error-message="userErrorMessage !== null"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @log-out="onLogOut"
                @password-reset-link-sent="onPasswordResetLinkSent"
            />

            <reset-password
                v-if="currentStep === 'reset-password'"
                :has-user-error-message="userErrorMessage !== null"
                @clear-user-success-message="onClearUserSuccessMessage"
                @clear-user-error-message="userErrorMessage = null"
                @show-user-success-message="onShowUserSuccessMessage"
                @show-user-error-message="onShowUserErrorMessage"
                @password-updated="onPasswordUpdated"
                @log-out="onLogOut"
            />
        </transition>
    </card-content-stub>
</template>

<script>
    import Login from "@/components/Auth/Cards/Login"
    import Verify from "@/components/Auth/Cards/Verify"
    import ForgotPassword from "@/components/Auth/Cards/ForgotPassword"
    import ResetPassword from "@/components/Auth/Cards/ResetPassword"
    import CreateAccount from "@/components/Auth/Cards/CreateAccount"
    import CardContentStub from "@/components/Auth/Cards/CardContentStub"
    import SignUpPreference from "@/components/Auth/Cards/SignUpPreference"
    import SignUpWithSocialMedia from "@/components/Auth/Cards/SignUpWithSocialMedia"

    export default {
        name: 'AuthCards',

        components: {
            Login,
            Verify,
            ForgotPassword,
            ResetPassword,
            CreateAccount,
            CardContentStub,
            SignUpPreference,
            SignUpWithSocialMedia
        },

        props: {
            step: {
                default: 'signUpPreference'
            },

            closeable: {
                default: true
            },

            inlineFlashMessage: {
                default: false
            },

            user: {
                default: false
            }
        },

        data() {
            return {
                signUpMethods: [
                    'createAccount',
                    'socialMediaSignUp'
                ],
                userErrorMessage: null,
                userSuccessMessage: null,
                currentStep: this.step
            }
        },

        computed: {
            authenticated() {
                return !! this.user
            },

            shouldHideLoginButton() {
                return this.currentStep === 'login'
                    || this.currentStep === 'verify'
            },

            geUserEmailAddress() {
                return this.authenticated ? this.user.email : false
            },
        },

        watch: {
            currentStep: function () {
                this.clearMessages()
            },

            step: function(step){
                this.currentStep = step
            }
        },

        methods: {
            onLogOut() {
                this.$emit('log-out')
            },

            onLoggedIn(data) {
                this.$emit('logged-in', data)

                this.$emit('close')
            },

            onPasswordUpdated(data) {
                this.$router.push({ name: 'home' })
            },

            onAccountCreated(data) {
                this.clearMessages()

                let payload = {
                    authData: data.data.auth,
                    flashMessage: this.inlineFlashMessage
                        ? false
                        : { message: data.data.message }
                }

                this.onLoggedIn(payload)

                if (this.$route.name === 'register' && this.$route.query.hasOwnProperty('redirect')) {
                    this.$router.push(this.$route.query.redirect)
                }
            },

            onClearUserSuccessMessage(goToStep = false) {
                this.clearMessages()

                if (goToStep) {
                    this.currentStep = goToStep
                }
            },

            onGoToStep(data) {
                this.currentStep = data.step

                this.onShowUserSuccessMessage(data.message ?? null)
            },

            onShowUserErrorMessage(message) {
                this.clearMessages()

                if (!this.inlineFlashMessage) {
                    this.$emit('flash-message', { message: message, level: 'danger' })
                } else {
                    setTimeout(() => this.userErrorMessage = message, 400)
                }
            },

            onShowUserSuccessMessage(message) {
                this.clearMessages()

                if (!this.inlineFlashMessage) {
                    this.$emit('flash-message', { message: message })
                } else {
                    setTimeout(() => this.userSuccessMessage = message,400)
                }
            },

            onClose() {
                if (this.closeable) {
                    this.$emit('close')

                    this.currentStep = this.step
                }
            },

            onSignUpMethodSelected(method) {
                if (!this.inArray(method, this.signUpMethods)) {
                    console.error(`Sign up method '${method}' not supported!`)

                    this.currentStep = 'signUpPreference'

                    return
                }

                this.currentStep = method
            },

            clearMessages() {
                this.userErrorMessage = null
                this.userSuccessMessage = null
            }
        }
    }
</script>
