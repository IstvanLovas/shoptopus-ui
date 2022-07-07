export default {
    props: {
        hasUserErrorMessage: {
            default: false
        }
    },

    data() {
        return {
            method: 'post',
            minPasswordLength: 4,
            validating: false,
            errors: {},
            form: {}
        }
    },

    computed: {
        hasValidPasswords() {},

        hasValidEmail () {},

        canSubmitForm() {}
    },

    methods: {
        submit() {
            if (this.validating || this.uri === 'undefined') return

            this.validating = true

            axios[this.method](this.uri, this.form)
                .then(res => {
                    let successMessage = res.data.data['message']

                    this.$emit('clear-user-error-message')

                    this.errors = {}

                    if (successMessage) {
                        this.$emit('show-user-success-message', successMessage)
                    }

                    this.onSuccess(res.data)
                })
                .catch(err => {
                    this.$emit('clear-user-success-message')

                    let response = err.response

                    if (response) {
                        if (response.status === 422 && response.data.hasOwnProperty('errors')) {
                            this.errors = response.data.errors
                        } else if (response.status >= 500) {
                            if (response.data.developer_message === "Route [login] not defined.") {
                                this.$emit('log-out')

                                this.$emit('clear-user-success-message', 'login')
                            } else if (response.data.hasOwnProperty('user_message')) {
                                this.$emit('show-user-error-message', response.data.user_message)
                            }
                        }
                    }

                    this.onError(response.data)
                })
                .finally(() => this.validating = false)
        },

        getError(field) {
            if (this.errors[field]) {
                return this.errors[field][0]
            }
        },

        hasError(field) {
            return this.errors.hasOwnProperty(field)
        },

        hasAnyErrors() {
            return Object.keys(this.errors).length > 0
        },

        clearError(field) {
            if (this.errors.hasOwnProperty(field)) {
                delete this.errors[field]
            }

            this.$emit('clear-user-error-message')
        },

        onError() {},

        onSuccess() {}
    }
}
