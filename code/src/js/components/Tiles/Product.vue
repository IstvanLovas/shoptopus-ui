<template>
	<div class="product" :id="`product-${product.id}`">
		<router-link :to="{ name: 'product', params: { productSlug: product.slug }}" class="relative block w-full h-[300px] shadow-sm rounded-2xl overflow-hidden">
			<shoptopus-image v-if="product.imageObj" :path="product.imageObj.url" :alt="product.imageObj.caption" class="w-full h-full object-cover object-center" />

			<div class="absolute inset-0 z-[1] bg-wz-black/10"></div>
		</router-link>

		<div class="mt-3">
			<h3 class="font-bold text-xl text-wz-black mb-2" v-text="trans(product.name)"></h3>

			<p v-text="trans(product.short_description)" class="font-light text-wz-wz-black-secondary line-clamp-2"></p>

			<div v-text="financial(product.price)" class="font-bold text-wz-black mt-3"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Product',
		
		props: {
			product: {
				required: true
			}
		}
	}
</script>
