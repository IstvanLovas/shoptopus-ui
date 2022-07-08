<template>
	<div id="cart" class="py-12 min-h-screen">
		<inner-content>
			<div class="gap-6 lg:flex">
				<div class="lg:w-3/5">
					<h2 class="font-paralucent text-4xl text-wz-black text-shadow mb-4">
						Bag
					</h2>

					<div>
						<p v-if="!cart">There are no items in your bag.</p>

						<div v-else>
							<ul>
								<li v-for="(product, index) in products" :key="index">
									<cart-item-product :product="product" @update-quantity="handleQuantityChange(product.id, $event)" @remove="onRemove(product.id)" />
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="lg:w-2/5">
					<h2 class="font-paralucent text-4xl text-wz-black text-shadow mb-4">
						Summary
					</h2>

					<div>
						<div class="grid grid-cols-2">
							<span>Subtotal</span>
							<span class="ml-auto">{{ financial(cartSubTotal) }}</span>
						</div>

						<div class="grid grid-cols-2">
							<span>Estimated Delivery</span>
							<span class="ml-auto">{{ financial(deliveryCost) }}</span>
						</div>

						<div class="grid grid-cols-2 mt-4 py-4 font-medium text-wz-black border-y border-wz-grey">
							<span>Total</span>
							<span class="ml-auto">{{ financial(cartTotal) }}</span>
						</div>
					</div>

					<div class="mt-8">
						<green-button text="Checkout" />
					</div>
				</div>
			</div>
		</inner-content>
	</div>
</template>

<script>
	import Product from '@/Models/Product'
	import CartItemProduct from '@/components/Tiles/CartItemProduct'

	export default {
		name: 'Cart',

		metaInfo() {
			return {
				title: 'Cart'
			}
		},

		components: {
			Product,
			CartItemProduct
		},

		props: {
			user: {
				default: false
			},

			cart: {
				default: false
			}
		},

		computed: {
			products() {
				return !this.cart ? [] : this.cart.products.map(attributes => new Product(attributes))
			},

			deliveryCost() {
				return 0
			},

			cartSubTotal() {
				return this.products.reduce((prev,p) => prev + (Number(p.price) * p.quantity), 0)
			},

			cartTotal() {
				return this.cartSubTotal + this.deliveryCost
			}
		},

		methods: {
			onRemove(productId) {
				axios.delete('cart/removeItem', {
					data: {
						product_id: productId,
						cart_id: this.cart.id
					}
				})
					.then(() => this.$emit('remove-product-from-cart', productId))
					.catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
			},

			handleQuantityChange(productId, quantity) {
				axios.patch(`cart/${this.cart.id}/product/${productId}/quantity`, {
					quantity: quantity
				})
	                .then(response => response.data.data[0])
	                .then(data => this.$emit('update-cart', data))
		            .catch(err => this.$emit('flash-message', { message: err.response.data.user_message ?? this.fallbackErrorMessage,level: 'danger' }) )
			}
		}
	}
</script>
