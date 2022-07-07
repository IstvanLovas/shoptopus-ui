<template>
	<div id="product-archive">
		<div class="lg:flex">
			<product-filter
				:loading="loading"
				:product-category="productCategory"
				@filter-attributes="onFilterAttributes"
			/>

			<products :products="products" />
		</div>

		<green-button v-if="hasNextPage" class="mt-8 lg:mt-12" text="Load more" :validating="loading" @click.native="loadMore" />
	</div>
</template>

<script>
	import smoothscroll from 'smoothscroll-polyfill'

	import ProductModel from '@/Models/Product'
	import Products from '@/components/Products'
	import ProductFilter from '@/components/ProductFilter/ProductFilter'

	export default {
		name: 'ProductArchive',

		props: {
			productCategory: {
				default: false
			}
		},

		components: {
			ProductModel,
			Products,
			ProductFilter
		},

		data() {
			return {
				baseUri: 'products',
				queryStrings: {
					categories: '',
					options: '',
					tags: ''
				},
				products: [],
				pagination: null,
				loading: false
			}
		},

		computed: {
			hasNextPage() {
				return this.pagination && this.pagination.next
			},

			getComputedQueryString() {
				let str = '?'

				for (let filter in this.queryStrings) {
					let query_string = this.queryStrings[filter]

					if (query_string) {
						str += `${query_string}&`
					}
				}

				if (str.length === 1) return ''

				return str.slice(0, -1)
			},

			getScrollOffsetTop() {
				let offsetTop = -100
				const appHeader = document.getElementById('app-header')

				if (appHeader) {
					let appHeaderStyle = getComputedStyle(appHeader)
					let appHeaderHeight = appHeader.offsetHeight + parseFloat(appHeaderStyle.marginTop) + parseFloat(appHeaderStyle.marginBottom)

					offsetTop += appHeaderHeight
				}

				return offsetTop
			}
		},

		mounted() {
			// Kicks for Safari only
			// @see https://github.com/iamdustan/smoothscroll
			smoothscroll.polyfill()

			if (this.$route.params.hasOwnProperty('categorySlug')) {
				if (this.productCategory) {
					this.queryStrings.categories = `product_categories=${this.productCategory.id}`
				} else {
					console.error(`No product category id was found!`)
					return;
				}
			}

			this.fetchProducts()
		},

		methods: {
			onFilterAttributes(attributes) {
				if (!attributes.length) {
					this.queryStrings.options = ''
				} else {
					this.queryStrings.options = `options=${attributes.join(',')}`
				}

				this.fetchProducts()
			},

			fetchProducts(paginationFilters = false) {
				let filters = ''

				this.loading = true

				if (paginationFilters) {
					if (!paginationFilters.includes('?')) {
						paginationFilters = '?' + paginationFilters
					}

					filters = paginationFilters
				} else {
					filters = this.getComputedQueryString
				}

				axios.get(this.baseUri + filters)
					.then(response => {
						this.pagination = this.omit(response.data, 'data', 'message')

						if (!response.data.data.length) {
							this.products = []
						} else {
							let products = response.data.data.map(product => new ProductModel(product))

							this.products = paginationFilters ? this.products.concat(products) : products
						}
					})
					.then(() => {
						if (this.products.length < 4) {
							window.scrollTo({
								top: 0, //this.getScrollOffsetTop,
								left: 0,
								behavior: 'smooth'
						    })
						}
					})
					.catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
					.finally(() => this.loading = false)
			},

			loadMore() {
				if (!this.hasNextPage) return

				let filters = this.pagination.next.substring(this.pagination.next.indexOf('?'))

				this.fetchProducts(filters)
			}
		}
	}
</script>
