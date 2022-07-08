<template>
	<div class="pr-6 lg:shrink-0 lg:w-[260px]" :class="{ 'pointer-events-none opacity-40' : loading }">
		<div v-if="subcategories" class="mb-6">
			<ul>
				<li v-for="(subcategory, index) in subcategories" :key="index" class="mb-1 last:mb-0">
					<router-link
						:to="{ name: 'shop', params: { categorySlug: subcategory.slug }}"
						class="font-bold text-lg text-wz-black"
						v-text="trans(subcategory.name)"
					></router-link>
				</li>
			</ul>
		</div>

		<button v-if="selectedAttributes.length" type="button" class="flex items-center gap-6 px-6 py-2 bg-red-500 text-white mb-6" @click="clearSelectedOptions">
			<span>&#x2715</span>
			<span>Clear filters</span>
		</button>

		<ul>
			<li v-for="(attribute, index) in productAttributes" :key="index" class="py-3 mb-3 border-t border-wz-grey last:mb-0">
				<div v-text="ucfirst(trans(attribute.name))" class="font-bold text-lg text-wz-black"></div>

				<ul v-if="attribute.type === 'color'" class="mt-2 flex flex-wrap">
					<li v-for="(attribute_option, index) in attribute.options" :key="index" class="w-1/3 shrink-0">
						<attribute-option
							type="color"
							:option="attribute_option"
							:clear-all-count="clearAllCount"
							@toggled="onOptionToggled(attribute_option.id,$event)"
						/>
					</li>
				</ul>

				<ul v-else class="mt-2">
					<li v-for="(attribute_option, index) in attribute.options" :key="index">
						<attribute-option
							:option="attribute_option"
							:clear-all-count="clearAllCount"
							@toggled="onOptionToggled(attribute_option.id,$event)"
						/>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import AttributeOption from '@/components/ProductFilter/AttributeOption'

	export default {
		name: 'ProductFilter',

		props: {
			productCategory: {
				required: false
			},

			loading: {
				default: false
			}
		},

		components: {
			AttributeOption
		},

		data() {
			return {
				productAttributes: [],
				selectedAttributes: [],
				clearAllCount: 0,
			}
		},

		computed: {
			subcategories() {
				return this.productCategory ? this.productCategory.subcategories : false
			}
		},

		watch: {
			'$route': 'fetchAttributes',

			selectedAttributes: function() {
				this.$emit('filter-attributes', this.selectedAttributes)
			}
		},

		mounted() {
		   this.fetchAttributes()
		},

		methods: {
			getIsSelected(optionId) {
				return this.selectedAttributes.includes(optionId)
			},

			fetchAttributes() {
				let uri = 'product_attributes'

				if (this.productCategory) {
					uri += `/product_category/${this.productCategory.id}`
				}

				axios.get(uri)
					.then(response => this.productAttributes = response.data.data)
					.catch(err => {
						let message = err.response.data.user_message ?? this.fallbackErrorMessage
						this.$emit('flash-message', { message: message, level: 'danger' })
					})
			},

			onOptionToggled(optionId, selected) {
				if (!selected) {
					for(let i = 0; i < this.selectedAttributes.length; i++){ 
	                    if (this.selectedAttributes[i] === optionId) {
	                        this.selectedAttributes.splice(i, 1)
	                    }
	                }
				} else {
					this.selectedAttributes.push(optionId)
				}
			},

			clearSelectedOptions() {
				this.selectedAttributes = []

				this.clearAllCount++
			}
		}
	}
</script>
