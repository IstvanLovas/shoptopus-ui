<template>
    <div class="relative bg-wz-yellow pt-44 lg:bg-wz-dark-orange 2xl:pb-20" id="payment-complete">
        <inner-content>
            <h1 v-if="success" class="font-paralucent font-bold leading-none text-5xl text-white text-shadow md:text-6xl md:tracking-tight">
                Thank you for your order
            </h1>
        </inner-content>
    </div>
</template>

<script>
    export default {
        name: 'CompletePayment',

        data() {
            return {
                success: false,
                validating: false
            }
        },

        mounted(){
            this.handleAmazonCheckoutSession()
        },

        methods: {
            handleAmazonCheckoutSession() {
                if (this.$route.query.hasOwnProperty('amazonCheckoutSessionId') && this.$route.query.hasOwnProperty('order_id')) {
                    this.validating = true

                    let data = {
                        provider: 'amazon',
                        orderId: this.$route.query.order_id,
                        provider_payload: {
                            checkout_session_id: this.$route.query.amazonCheckoutSessionId
                        }
                    }

                    // axios.post('payment/execute', data)
                    //     .then(res => res.data.data[0])
                    //     .then(data => {
                    //         if(data.success) {
                    //             this.onOrderCompleted(data)
                    //         }
                    //     })
                    //     .catch(err => this.onError(err.response.data))
                    //     .finally(() => this.validating = false)
                }
            },

            onOrderCompleted(data = null) {
                this.success = true
                console.log(data)
            },

            onError(data) {
                console.log(data)
                //this.handleMessaging(data.user_message ?? this.fallbackErrorMessage, 'error')
            },

            // handleMessaging(message, type = 'success', timeout = 10000) {
            //     let isSuccess = type === 'success'

            //     this.errorMessage = false
            //     this.successMessage = false
            //     this.validating = false

            //     if (isSuccess) {
            //         this.successMessage = message
            //     } else {
            //         this.errorMessage = message
            //     }

            //     this.$emit('flash-message', {
            //         message: message,
            //         level: isSuccess ? 'info' : 'danger',
            //         timeout: timeout,
            //         maxViewport: 'md'
            //     })

            //     setTimeout(() => {
            //         this.successMessage = false
            //         this.errorMessage = false
            //     }, timeout)
            // }
        }
    }
</script>
