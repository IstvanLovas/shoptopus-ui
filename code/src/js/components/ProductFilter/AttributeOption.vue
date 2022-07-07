<template>
	<div class="attribute-option-container">
		<input class="peer absolute invisible checkbox-input" :id="getId" type="checkbox" v-model="selected" />

		<label v-if="type === 'text'" class="group flex cursor-pointer select-none p-2 rounded-lg overflow-hidden transition duration-300 hover:bg-wz-light-blue checkbox" :for="getId">
			<span class="relative shrink-0 w-[18px] h-[18px] rounded-[4px] border border-wz-grey align-middle transform-gpu transition duration-300 group-hover:border-wz-blue">
				<svg class="absolute top-[3px] left-[2px] transition-all duration-300" width="12px" height="10px" fill="none" stroke="#fff" stroke-dasharray="16px" stroke-dashoffset="16px">
					<use xlink:href="#symbol-check"></use>
				</svg>
		    </span>

		    <span class="text-sm pl-2 leading-[18px] align-middle" v-text="ucfirst(trans(option.name))"></span>
		</label>

		<label v-else-if="type === 'color'" class="flex flex-col items-center gap-2 cursor-pointer select-none" :for="getId">
			<span class="block relative w-8 h-8 rounded-full" :style="'background-color: ' + option.value">
				<span v-show="selected" class="inline-block text-white z-[1] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[13px] h-[13px] before:content-[''] before:block before:bg-white before:absolute before:top-[5px] before:left-[1px] before:h-[2px] before:w-[6px] before:origin-[left_center] before:rotate-[49deg] before:rounded-l-[1px] after:content-[''] after:block after:absolute after:origin-[left_center] after:rotate-[-49deg] after:rounded-l-[1px] after:bg-white after:top-[10px] after:left-[4px] after:h-[2px] after:w-[13px]"></span>
			</span>

			<span class="text-sm leading-[18px]" v-text="ucfirst(trans(option.name))"></span>
		</label>
	</div>
</template>

<script>
	export default {
		name: 'AttributeOption',

		props: {
			type: {
				default: 'text'
			},

			option: {
				required: true
			},

			clearAllCount: {
				default: 0
			}
		},

		data() {
			return {
				selected: false,
				cachedClearAllCount: 0
			}
		},

		watch: {
			clearAllCount: function() {
				this.selected = false
			},

			selected: function(state) {
				this.$emit('toggled', state)
			}
		},

		computed: {
			getId() {
				return `option-input-${this.option.id}`
			}
		}
	}
</script>

<style scoped>
	.checkbox-input:checked + .checkbox span:first-child {
		background: #0077ff;
		border-color: #0077ff;
		animation: zoom-in-out 0.3s ease;
	}

	.checkbox-input:checked + .checkbox span:first-child svg {
		stroke-dashoffset: 0;
	}

	@keyframes zoom-in-out {
		50% {
			transform: scale(0.9);
		}
	}
</style>
