<template>
	<div id="home" class="min-h-screen md:py-12">
		<inner-content>
			<h1 class="font-paralucent text-4xl text-wz-black text-shadow mb-3">
				Shoptopus
			</h1>

			<p class="font-medium text-wz-black max-w-lg mb-6">
				Contrary to popular belief, Lorem Ipsum is not simply random text.
				It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
			</p>

			<router-link class="inline-block w-56 font-bold text-white text-center border-2 py-2.5 px-4 rounded-full shadow-xs focus:outline-none transition ease-in-out duration-150 bg-wz-green border-wz-green" :to="{ name: 'home' }">
				Find out more
			</router-link>
		</inner-content>

		<inner-content class="mt-12">
			<!-- <amazon order-id="964c46bd-829b-4b5d-9150-7fe096d3922f" />
			<paypal order-id="964c46bd-829b-4b5d-9150-7fe096d3922f" />
			<stripe order-id="964c46bd-829b-4b5d-9150-7fe096d3922f" /> -->
			<page-sub-title>Featured products</page-sub-title>

			<product-archive class="mt-12" />
		</inner-content>
	</div>
</template>

<script>
	// import Paypal from '@/components/Payment/Methods/Paypal'
	// import Amazon from '@/components/Payment/Methods/Amazon'
	// import Stripe from '@/components/Payment/Methods/Stripe'
	import ProductArchive from '@/components/ProductArchive'

	export default {
		name: 'Home',

		metaInfo() {
			return {
				titleTemplate: null
			}
		},

		components: {
			ProductArchive
		}
	}
</script>
