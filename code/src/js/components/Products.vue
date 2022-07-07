<template>
	<ul class="grid gap-6 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
		<li v-for="(product, index) in products" :key="index">
			<product :product="product" />
		</li>
	</ul>
</template>

<script>
	import Product from '@/components/Tiles/Product'

	export default {
		name: 'Products',

		props: {
			products: {
				default: []
			}
		},

		components: { Product },

		// methods: {
		// 	onFavorited(productId, favorited) {
		// 		this.products.find(p => p.id === productId).favorited = favorited
		// 	}
		// }
	}
</script>
