<template>
	<div class="flex cart-item-product" :id="`cart-item-product-${product.id}`">
		<router-link :to="{ name: 'product', params: { productSlug: product.slug }}" class="block max-w-[180px]">
			<shoptopus-image :path="product.imageObj.url" :alt="product.imageObj.caption" class="w-full h-full object-cover object-center" />
		</router-link>

		<div class="ml-4 flex w-full">
			<div class="flex flex-col justify-between">
				<div>
					<span v-if="trans(product.headline)" class="block text-sm font-medium text-wz-orange" v-text="trans(product.headline)"></span>
				
					<h3 class="font-bold text-wz-black mb-1">
						<router-link :to="{ name: 'product', params: { productSlug: product.slug }}" class="block" v-text="trans(product.name)"></router-link>
					</h3>

					<p v-text="trans(product.subtitle)" class="font-light text-sm text-wz-wz-black-secondary line-clamp-2"></p>

					<div class="mt-2">
						<span class="text-sm inline-block">Quantity</span>
						<select v-model="quantity" class="text-sm ml-3 p-1">
							<option v-for="n in selectableQuantityCount" :key="n" v-text="n"></option>
						</select>
					</div>
				</div>

				<div>
					<button type="button" class="text-sm leading-5 text-wz-wz-black-secondary underline" @click="$emit('remove')">Remove</button>
				</div>
			</div>

			<div class="ml-auto pl-4 shrink-0">
				<div v-text="financial(product.price)" class="font-medium text-wz-black"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CartItemProduct',
		
		props: {
			product: {
				required: true
			}
		},

		data() {
			return {
				quantity: this.product.quantity
			}
		},

		watch: {
			quantity: function(newValue, oldValue) {
				this.$emit('update-quantity', newValue)
			}
		},

		computed: {
			maxStock() {
				return this.product.stock + this.product.backup_stock
			},

			selectableQuantityCount() {
				return this.maxStock < 10 ? this.maxStock : 10
			}
		}
	}
</script>
