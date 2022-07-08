<template>
	<div id="product-category" class="py-12 min-h-screen">
		<inner-content v-if="product_category">
			<h1 v-html="trans(this.product_category.name)" class="mb-6"></h1>

			<product-archive class="mt-12" :product-category="product_category" />
		</inner-content>
	</div>
</template>

<script>
	import ProductArchive from '@/components/ProductArchive'

	export default {
		name: 'Shop',

		metaInfo() {
			return {
				title: 'Shop'
			}
		},

		components: {
			ProductArchive
		},

		data() {
			return {
				product_category: null
			}
		},

		mounted() {
			this.fetchData()
		},

		methods: {
			fetchData() {
				axios.get('product_category/slug/' + this.$route.params['categorySlug'])
	                .then(response => response.data.data)
	                .then(data => {
	                 	if (!data.length) return

	                	this.product_category = data[0]
		            })
		            .catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
			}
		}
	}
</script>
