<template>
    <div class="sr-root">
        <form id="payment-form" class="sr-payment-form">
            <div id="card-number" class="sr-input sr-card-element leading-6 p-3 mb-4 h-12 bg-white rounded-none border-2 border-wz-dark-grey"></div>
            <div id="card-expiry" class="sr-input sr-card-element leading-6 p-3 mb-4 h-12 bg-white rounded-none border-2 border-wz-dark-grey"></div>
            <div id="card-cvc" class="sr-input sr-card-element leading-6 p-3 mb-4 h-12 bg-white rounded-none border-2 border-wz-dark-grey"></div>
            <div id="cart-postal-code" class="sr-postal-code">
                <input type="text" name="postal-code" placeholder="Zip" autocomplete="postal-code" class="antialiased text-wz-black w-full leading-6 p-3 mb-4 h-12 bg-white rounded-none border-2 border-wz-dark-grey focus:outline-none" v-model="postal_code" required>
            </div>

            <div v-if="errorMsg" v-text="errorMsg" class="text-sm text-wz-orange mt-2 mb-4" role="alert"></div>

            <green-button type="submit" text="Pay now" :disabled="cantSubmit" />
        </form>

        <div id="payment-request-button" class="w-56 mx-auto mt-4 mb-8">
            <!-- A Stripe Element will be inserted here. -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Stripe',

        props: {
            orderId: {
                required: true,
                type: String
            },

            orderUpdatedCount: {
                default: 0
            }
        },

        data() {
            return {
                postal_code: '',
                disabled: true,
                validating: false,
                errorMsg: null
            }
        },

        computed: {
            cantSubmit() {
                return this.disabled || this.validating
            }
        },

        watch: {
            orderUpdatedCount: function() {
                this.fetchData()
            }
        },

        mounted() {
            this.fetchData()
        },

        methods: {
            fetchData() {
                axios.get(`payment/stripe/settings?orderId=${this.orderId}`)
                    .then(response => response.data.data[0])
                    .then(data => this.setupElements(data))
                    .then(({ stripe, cardNumber, clientSecret, paymentRequest }) => {
                        this.disabled = false

                        this.setUpPaymentRequest(stripe, clientSecret, paymentRequest)

                        document.getElementById("payment-form").addEventListener('submit', e => {
                            e.preventDefault()

                            this.pay(stripe, cardNumber, clientSecret)
                        })
                    })
            },
            
            setUpPaymentRequest(stripe, clientSecret, paymentRequest) {
                let elements = stripe.elements()

                // Check the availability of the Payment Request API first.
                paymentRequest.canMakePayment()
                    .then(result => {
                        if (result) {
                            // Create Payment Request buttons
                            elements.create('paymentRequestButton', {
                                paymentRequest: paymentRequest
                            }).mount('#payment-request-button')
                        } else {
                            document.getElementById('payment-request-button').style.display = 'none'
                        }
                    })

                paymentRequest.on('paymentmethod', ev => {
                    // Confirm the PaymentIntent without handling potential next actions (yet).
                    stripe.confirmCardPayment(
                        clientSecret,
                        { payment_method: ev.paymentMethod.id },
                        { handleActions: false }
                    ).then(confirmResult => {
                        if (confirmResult.error) {
                            // Report to the browser that the payment failed, prompting it to
                            // re-show the payment interface, or show an error message and close
                            // the payment interface.
                            ev.complete('fail')
                        } else {
                            // Report to the browser that the confirmation was successful, prompting
                            // it to close the browser payment method collection interface.
                            ev.complete('success')
                            // Check if the PaymentIntent requires any actions and if so let Stripe.js
                            // handle the flow. If using an API version older than "2019-02-11"
                            // instead check for: `paymentIntent.status === "requires_source_action"`.
                            if (confirmResult.paymentIntent.status === "requires_action") {
                                // Let Stripe.js handle the rest of the payment flow.
                                stripe.confirmCardPayment(clientSecret)
                                    .then(result => {
                                        if (result.error) {
                                            // The payment failed -- ask your customer for a new payment method.
                                            // Show error to your customer
                                            this.showError(result.error.message)
                                        } else {
                                            // The payment has succeeded.
                                            this.orderComplete(clientSecret, stripe)
                                        }
                                    })
                            } else {
                                // The payment has succeeded.
                                this.orderComplete(clientSecret, stripe)
                            }
                        }
                    })
                })
            },

            setupElements(data) {
                // const appearance = {
                //     theme: 'stripe'
                // };

                let stripe = Stripe(data.publishableKey),
                    elements = stripe.elements(),
                    // elements = stripe.elements({data.clientSecret, appearance}),
                    style = {
                        base: {
                            color: "#272727",
                            fontFamily: 'paralucent-text, "Helvetica Neue", Helvetica, sans-serif',
                            fontSmoothing: "antialiased",
                            fontSize: "16px",
                                "::placeholder": {
                                    color: "#aab7c4"
                                }
                        },
                        invalid: {
                            color: "#FF8A76",
                            iconColor: "#FF8A76"
                        }
                    };

                const cardNumber = elements.create('cardNumber', { style: style })
                    cardNumber.mount('#card-number')
                const cardExpiry = elements.create('cardExpiry', { style: style })
                    cardExpiry.mount('#card-expiry')
                const cardCvc = elements.create('cardCvc', { style: style })
                    cardCvc.mount('#card-cvc')

                let paymentRequest = stripe.paymentRequest({
                    country: 'GB',
                    currency: 'gbp',
                    total: {
                        label: 'Demo total',
                        amount: data.order_total
                    },
                    requestPayerName: true,
                    requestPayerEmail: true
                })

                return {
                    stripe: stripe,
                    cardNumber: cardNumber,
                    clientSecret: data.clientSecret,
                    paymentRequest: paymentRequest
                }
            },

            /*
             * Calls stripe.confirmCardPayment which creates a pop-up modal to
             * prompt the user to enter extra authentication details without leaving your page
             */
            pay(stripe, cardNumber, clientSecret) {
                let vm = this

                this.changeLoadingState(true)

                // Initiate the payment.
                // If authentication is required, confirmCardPayment will automatically display a modal
                // @see https://stripe.com/docs/js/payment_intents/confirm_card_payment
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardNumber,
                        billing_details: {
                            address: {
                                postal_code: vm.postal_code
                            }
                        }
                    }
                }).then(result => {
                    if (result.error) {
                        // Show error to your customer
                        this.showError(result.error.message)
                    } else {
                        // The payment has been processed!
                        this.orderComplete(clientSecret, stripe)
                    }
                })
            },

            /* ------- Post-payment helpers ------- */

            /* Shows a success / error message when the payment is complete */
            orderComplete(clientSecret, stripe) {
                // Just for the purpose of the sample, show the PaymentIntent response object
                stripe.retrievePaymentIntent(clientSecret)
                    .then(result => {
                        return {
                            provider: 'stripe',
                            orderId: this.orderId,
                            provider_payload: result.paymentIntent
                        }
                    })
                    .then(data => {
                        axios.post('payment/execute', data)
                            .then(res => res.data.data[0])
                            .then(data => {
                                if(data.success) {
                                    this.$emit('success', data)
                                }
                            })
                            .catch(err => {
                                this.$emit('payment-error', err.response.data)
                            })
                            .finally(() => this.changeLoadingState(false))
                    })
            },

            showError(errorMsgText) {
                this.changeLoadingState(false)

                this.errorMsg = errorMsgText

                setTimeout(() => this.errorMsg = null, 5000)
            },

            changeLoadingState(isLoading) {
                if (isLoading) {
                    this.disabled = this.validating = true
                } else {
                    this.disabled = this.validating = false
                }
            }
        }
    }
</script>

<style scoped>
    input[name="postal-code"]::placeholder {
        color: #aab7c4;
    }

    input[name="postal-code"]::invalid {
        color: #FF8A76;
    }
</style>
