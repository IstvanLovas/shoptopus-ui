<template>
	<div id="account-favorites">
		<inner-content>
			<h1 class="font-paralucent font-bold leading-none text-5xl text-white text-shadow md:text-6xl md:tracking-tight">
				Favorites
			</h1>

			<div class="mt-8">
				<products :products="products" />
			</div>
		</inner-content>
	</div>
</template>

<script>
	import Products from '@/components/Products'
	import ProductModel from '@/Models/Product'

	export default {
		name: 'Favorites',

		metaInfo() {
			return {
				title: 'Favorites'
			}
		},

		components: {
			Products,
			ProductModel
		},

		data() {
			return {
				products: []
			}
		},

		mounted() {
			this.fetchData()
		},

		methods: {
			fetchData() {
				axios.get('user/favorites')
					.then(res => {
						this.products = res.data.data.map(product => new ProductModel(product))
					})
					.catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }))
			}
		}
	}
</script>
