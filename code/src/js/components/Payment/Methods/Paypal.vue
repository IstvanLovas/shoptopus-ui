<template>
	<div id="paypal-button-container"></div>
</template>

<script>
	import { loadScript } from "@paypal/paypal-js"

	export default {
		name: 'Paypal',

		props: {
			orderId: {
				required: true,
				type: String
			},

			orderUpdatedCount: {
				default: 0
			}
		},

		watch: {
			orderUpdatedCount: function() {
				let container = document.getElementById('paypal-button-container')
				if (container) {
					container.innerHTML = ''

					setTimeout(() => this.fetchData(), 300)
				}
			}
		},

		mounted() {
			this.fetchData()
		},
	
		methods: {
			fetchData() {
				let vm = this

				loadScript({
					"client-id": process.env.NODE_ENV === 'development'
						? process.env.MIX_PAYPAL_CLIENT_ID_SANDBOX
						: process.env.MIX_PAYPAL_CLIENT_ID_LIVE,
					"currency": "GBP"
				})
					.then((paypal) => {
						paypal.Buttons({
							createOrder: function() {
								return axios.get(`payment/paypal/settings?orderId=${vm.orderId}`)
									.then(response => response.data.data[0])
									.then(data => {
										return data.pay_pal_order_creation.result.id
									})
							},

							onApprove: function(data, actions) {
								return axios.post('payment/execute', {
									'provider' :'paypal',
									'orderId' : vm.orderId,
									'provider_payload' : [
										{
											'paypal_order_id_token' : data.orderID
										}
									]
								}).then(function(res) {
									return res.data.data[0]
								}).then(function(data) {
									if(data.success) {
										vm.$emit('success', data)
									}
								})
								.catch(err => vm.$emit('payment-error', err.response.data))
							}
						}).render('#paypal-button-container')
					})
					.catch((error) => {
						console.error("failed to load the PayPal JS SDK script", error)
					})
			}
		}
	}
</script>
