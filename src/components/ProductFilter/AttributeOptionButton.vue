<template>
	<button
		type="button"
		:class="[buttonBaseClasses, buttonActiveStateClasses]"
		:title="getButtonText"
		:style="buttonStyle"
		v-text="getButtonText"
		@click="$emit('toggled')"
	></button>
</template>

<script>
	export default {
		name: 'AttributeOptionButton',

		props: {
			option: {
				required: true
			},

			active: {
				default: false
			},

			type: {
				default: 'text'
			}
		},

		computed: {
			getButtonText() {
				if (this.type === 'color') {
					return ""
				}

				return this.trans(this.option.name)
			},

			buttonBaseClasses() {
				if (this.type === 'text') {
					return 'text-lg uppercase rounded-md border border-2 py-1 px-3 border-wz-black text-wz-black'
				} else if(this.type === 'color') {
					return 'w-full h-full rounded-full'
				}

				return ''
			},

			buttonActiveStateClasses() {
				if (!this.active) return ''

				if (this.type === 'text') {
					return 'border-wz-dark-orange bg-wz-dark-orange text-white'
				} else if(this.type === 'color') {
					return 'outline outline-offset-2 outline-2 outline-wz-dark-orange'
				}

				return ''
			},

			buttonStyle() {
				if (this.type === 'color') {
					return {
						'background': this.option.value
					}
				}

				return {}
			}
		}
	}
</script>
