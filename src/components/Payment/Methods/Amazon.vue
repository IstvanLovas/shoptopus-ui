<template>
	<div class="w-full">
		<div id="AmazonPayButton_Wrapper">
			<div id="AmazonPayButton"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Amazon',

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
				let container = document.getElementById('AmazonPayButton_Wrapper')
				if (container) {
					container.innerHTML = '<div id="AmazonPayButton"></div>'

					this.fetchData()
				}                
			}
		},

		mounted() {
			this.fetchData()
		},

		methods: {
			fetchData() {
				axios.get(`payment/amazon/settings?orderId=${this.orderId}`)
					.then(response => response.data.data[0])
					.then(data => this.renderButton(data))
					.catch(err => console.log(err))
			},

			renderButton(data) {
				amazon.Pay.renderButton('#AmazonPayButton', {
					merchantId: data.merchantId,
					publicKeyId: data.publicKeyId,
					ledgerCurrency: data.ledgerCurrency,
					checkoutLanguage: data.checkoutLanguage,
					productType: data.productType,
					placement: data.placement,
					buttonColor: data.buttonColor,
					sandbox: true,
					// sandbox: process.env.NODE_ENV === 'development',
					createCheckoutSessionConfig: {
						payloadJSON: data.createCheckoutSessionConfig.payloadJSON,
						signature: data.createCheckoutSessionConfig.signature,
						publicKeyId: data.publicKeyId
					}
				})
			}
		}
	}
</script>
