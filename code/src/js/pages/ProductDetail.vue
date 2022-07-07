<template>
	<div id="product" class="py-12 min-h-screen">
		<inner-content v-if="product">
			<div class="lg:flex lg:flex-row-reverse lg:justify-between lg:gap-10">
				<div class="lg:w-1/2">
					<span v-if="trans(product.headline)" class="block font-medium text-wz-orange" v-text="trans(product.headline)"></span>

					<h1 class="font-semibold text-2xl text-wz-black" v-text="trans(product.name)"></h1>

					<span v-if="trans(product.subtitle)" class="block font-light text-wz-black mt-1" v-text="trans(product.subtitle)"></span>

					<div class="mt-4">
						<div v-text="financial(product.price)" class="font-bold text-wz-black mt-3"></div>

						<div>
							<div v-if="colorAttribute" class="mt-6">
								<p class="text-wz-black font-semibold mb-2"><strong v-text="ucfirst(trans(colorAttribute.name))"></strong></p>

								<ul class="flex flex-wrap gap-4">
									<li
										v-for="(attribute_option, index) in colorAttribute.options"
										:key="index"
										class="w-14 h-14"
									>
										<button
											type="button"
											:style="'background: ' + attribute_option.value"
											class="w-full h-full rounded-full"
											:title="ucfirst(trans(attribute_option.name))"
										></button>
									</li>
								</ul>
							</div>

							<div v-if="sizeAttribute" class="mt-6">
								<p class="text-wz-black font-semibold mb-2"><strong v-text="ucfirst(trans(sizeAttribute.name))"></strong></p>

								<ul class="flex flex-wrap gap-4">
									<li v-for="(attribute_option, index) in sizeAttribute.options" :key="index">
										<button
											type="button"
											class="text-lg uppercase rounded-md border border-2 border-wz-black text-wz-black py-1 px-3"
											:title="trans(attribute_option.name)"
											v-text="attribute_option.value"
										></button>
									</li>
								</ul>
							</div>
						</div>

						<div class="flex flex-col gap-4 mt-8">
							<green-button text="Add to Bag" @click.native="addToBag" />

							<button
						        type="button"
						        :disabled="favoriting"
						        :class="['w-56 font-bold text-white flex items-center justify-center gap-3 shrink-0 text-center px-4 py-2.5 bg-wz-blue rounded-full shadow-xs focus:outline-none transition ease-in-out duration-150', { 'cursor-not-allowed pointer-events-none' : favoriting }]"
						        @click="favorite"
						    >
						        <span>Favorite</span>

						        <span class="text-lg">
						            <i v-if="favorited" class="fas fa-heart"></i>
						            <i v-else class="far fa-heart"></i>
						        </span>
						    </button>
						</div>
					</div>

					<div v-if="product.short_description" class="mt-8">
						<p v-text="trans(product.short_description)"></p>
					</div>
				</div>

				<div class="border-2 border-black p-5 lg:w-1/2"></div>
			</div>
		</inner-content>
	</div>
</template>


<script>
	import { getCart } from '@/cart'

	export default {
		name: 'ProductDetail',

		metaInfo() {
			return {
				title: 'PDP'
			}
		},

		props: {
			user: {
				default: false
			}
		},

		data() {
			return {
				product: null,
				favorited: false,
				favoriting: false
			}
		},

		computed: {
			authenticated() {
				return !! this.user
			},

			productAttributes () {
				return this.product.product_attributes
			},

			colorAttribute() {
				let colors = this.productAttributes.filter(attr => attr.type === 'color')

				return colors.length ? colors.filter(attr => attr.type === 'color')[0] : []
			},

			textAttributes() {
				return this.productAttributes.filter(attr => attr.type === 'text')
			},

			sizeAttribute() {
				let sizes = this.textAttributes.filter(size => this.trans(size.name) === 'size')

				return sizes.length ? sizes[0] : []
			}
		},

		watch: {
			user: function(user) {
				if (user && this.product) {
					this.favorited = this.inArray(this.product.id, user.favorites)
				}
			}
		},

		mounted() {
			this.fetchData()
		},

		methods: {
			favorite() {
				if (!this.authenticated) {
					this.$emit('show-auth')
					return
				}

				this.favoriting = true

				axios.post(`product/${this.product.id}/favorite`)
	                .then(response => this.favorited = response.data.data[0].favorited)
		            .catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
		            .finally(() => this.favoriting = false)
			},

			addToBag() {
				let payload = {
					product_id: this.product.id,
					quantity: 1
				}

				if (this.authenticated) {
					payload.user_id = this.user.id

					if (this.user.cart) {
						payload.cart_id = this.user.cart.id
					}
				} else {
					let storage_cart = getCart()
					if(storage_cart) {
						payload.cart_id = storage_cart.id
					}
				}

				axios.post('cart/addItem', payload)
	                .then(response => response.data.data[0])
	                .then(data => this.$emit('update-cart', data))
		            .catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
			},

			fetchData() {
				axios.get('product/slug/' + this.$route.params['productSlug'])
	                .then(response => response.data.data)
	                .then(data => {
	                 	if (!data.length) return

	                	this.product = data[0]
		            })
		            .catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
			}
		}
	}
</script>
