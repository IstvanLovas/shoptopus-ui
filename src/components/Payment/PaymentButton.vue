<template>
	<button type="button" @click="$emit('submit')" :class="[{ 'bg-wz-grey': !isSelected }, 'text-xl w-12 h-12 flex items-center justify-center bg-wz-yellow text-black rounded-full focus:outline-none']">
		<i :class="iconClasses"></i>
	</button>
</template>

<script>
	export default {
		name: 'PaymentButton',
		
		props: {
			name: {
				required: true,
				type: String,
				validator: function (value) {
					return ['stripe', 'paypal', 'amazon'].indexOf(value) !== -1
				}
			},

			isSelected: {
				default: false
			}
		},

		computed: {
			iconClasses() {
				return {
					'stripe': 'far fa-credit-card translate-y-0.5',
					'paypal': 'fab fa-paypal',
					'amazon': 'fab fa-amazon-pay translate-y-0.5'
				}[this.name]
			}
		}
	}
</script>
