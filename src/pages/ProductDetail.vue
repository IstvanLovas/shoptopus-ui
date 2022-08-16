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
							<div v-if="colorAttributes" class="mt-6">
								<p class="text-wz-black mb-2"><strong v-text="ucfirst(trans(colorAttributes.name))"></strong></p>

								<ul class="flex flex-wrap gap-4">
									<li v-for="(attribute_option, index) in colorAttributes.options" :key="index" class="w-14 h-14">
										<attribute-option-button
											type="color"
											:option="attribute_option"
											:active="isSelected(attribute_option.id)"
											@toggled="onOptionToggled(attribute_option.id)"
										/>
									</li>
								</ul>
							</div>

							<div v-if="sizeAttributes" class="mt-6">
								<p class="text-wz-black mb-2"><strong v-text="ucfirst(trans(sizeAttributes.name))"></strong></p>

								<ul class="flex flex-wrap gap-4">
									<li v-for="(attribute_option, index) in sizeAttributes.options" :key="index">
										<attribute-option-button
											:option="attribute_option"
											:active="isSelected(attribute_option.id)"
											@toggled="onOptionToggled(attribute_option.id)"
										/>
									</li>
								</ul>
							</div>

							<div v-if="textAttributes.length > 0" class="mt-6">
								<ul class="flex flex-col gap-6">
									<li v-for="(attr, index) in textAttributes" :key="index">
										<p class="text-wz-black mb-2"><strong v-text="ucfirst(trans(attr.name))"></strong></p>

										<ul class="flex flex-wrap gap-4">
											<li v-for="(attribute_option, index) in attr.options" :key="index">
												<attribute-option-button
													:option="attribute_option"
													:active="isSelected(attribute_option.id)"
													@toggled="onOptionToggled(attribute_option.id)"
												/>
											</li>
										</ul>
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
	import ProductModel from '@/Models/Product'
	import AttributeOptionButton from '@/components/ProductFilter/AttributeOptionButton'

	export default {
		name: 'ProductDetail',

		metaInfo() {
			return {
				title: 'PDP'
			}
		},

		components: {
			ProductModel,
			AttributeOptionButton
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
				favoriting: false,
				loading: false,
				selectedAttributes: [],
				//productVariants: []
			}
		},

		computed: {
			authenticated() {
				return !! this.user
			},

			productAttributes () {
				return this.product.product_variants.length > 0
					? this.getProductVariantsAttributes
					: this.product.product_attributes
			},

			getProductVariantsAttributes() {
				let attributes = []

				this.product.product_variants.forEach(varian => {
					varian.product_attributes.forEach(attr => {
						attributes.push(attr)
					})
				})

				return attributes
			},

			colorAttributes() {
				let colors = this.productAttributes.filter(attr => attr.type === 'color')

				return colors.length ? colors.filter(attr => attr.type === 'color')[0] : false
			},

			textAttributes() {
				const productAttributes = this.productAttributes.filter(attr => attr.type === 'text' && this.trans(attr.name) !== 'size')

				let unique_attribute_types = [...new Set(productAttributes.map(attr => this.trans(attr.name)))]

				let attributes = []

				for (let i = 0; i < unique_attribute_types.length; i++) {
					let attr_key = unique_attribute_types[i]
					let attribute = {}

					productAttributes.map(attr => {
						if (this.trans(attr.name) === attr_key) {
							if (Object.keys(attribute).length) {
								attribute.options.concat(attr.options)
							} else {
								attribute = attr
							}
						}
					})

					attributes.push(attribute)
				}

				return attributes.map(attr => {
					attr.options = [...new Set(attr.options.map(opt => opt))]

					return attr
				})
			},

			sizeAttributes() {
				let sizes = this.productAttributes.filter(attr => attr.type === 'text' && this.trans(attr.name) === 'size')

				return sizes.length ? sizes[0] : false
			}
		},

		watch: {
			user: function(user) {
				if (user && this.product) {
					this.favorited = this.inArray(this.product.id, user.favorites)
				}
			},

			//selectedAttributes: 'getProductVariant'
		},

		mounted() {
			this.fetchData()
		},

		methods: {
			// normalizeFilterAttributes() {
			// 	// variant attribute optiosn ...
			// },

			// getProductVariant() {
			// 	if (!this.selectedAttributes.length) {
			// 		this.productVariants = []

			// 		return
			// 	}

			// 	this.loading = true

			// 	axios.get(`products?options=${this.selectedAttributes.join(',')}`)
			// 		.then(response => {
			// 			if (response.data.data.length > 0) {
			// 				this.productVariants = response.data.data.map(product => {
			// 					if (product.id !== this.product.id) {
			// 						return new ProductModel(product)
			// 					}
			// 				})
			// 			} else {
			// 				this.productVariants = []
			// 			}
			// 		})
			// 		.then(() => this.normalizeFilterAttributes())
			// 		.catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }))
			// 		.finally(() => this.loading = false)
			// },

			onOptionToggled(optionId) {
				if (this.inArray(optionId, this.selectedAttributes)) {
					for(let i = 0; i < this.selectedAttributes.length; i++){ 
	                    if (this.selectedAttributes[i] === optionId) {
	                        this.selectedAttributes.splice(i, 1)
	                    }
	                }
				} else {
					this.selectedAttributes.push(optionId)
				}
			},

			isSelected(optionId) {
				return this.selectedAttributes.includes(optionId)
			},

			isDisabled() {
				// Filter attributes and options 
			},

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
