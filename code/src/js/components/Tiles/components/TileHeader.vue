<template>
	<div class="relative min-h-48 md:h-60">
		<div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
			<div class="h-full">
				<div v-if="thumbnails" class="swiper h-full">
					<div class="swiper-wrapper">
						<div v-for="(thumbnail, index) in thumbnails" :key="index" class="swiper-slide">
							<shoptopus-image
								:path="thumbnail.base_url + '600/600'"
								:alt="thumbnail.caption" :class="['relative w-full h-full object-cover object-center rounded-2xl z-0 md:rounded-b-none', { 'rounded-b-none' : open }]"
							/>
						</div>
					</div>
				</div>

				<shoptopus-image
					v-else-if="imageUrl"
					:path="imageUrl"
					:alt="imageAlt"
					:class="['relative w-full h-full object-cover object-center rounded-2xl z-0 md:rounded-b-none', { 'rounded-b-none' : open }]"
				/>
			</div>

			<div :class="['absolute inset-0 rounded-2xl z-10 bg-wz-black/10 md:rounded-b-none', { 'rounded-b-none' : open }]"></div>
		</div>

		<div class="absolute inset-0 flex flex-col py-3 px-3 md:py-4 md:px-4">
			<div :class="['relative w-full text-center mt-auto transition-all ease-in-out duration-300 md:text-left', { 'opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0' : open }]">
				<h3 class="font-paralucent text-white text-lg leading-5 text-shadow line-clamp-2 md:hidden" v-text="title"></h3>

				<green-button
					v-if="isOngoing"
					text="Let's go"
					font-size="xs"
					width="28"
					padding-y="1.5"
					:class="[{'pointer-events-none': open}, 'mt-4 md:hidden']"
					@click.native="$emit('expand')"
				/>
			</div>

			<div class="w-full mt-auto md:flex md:items-center md:justify-between">
				<div class="hidden md:flex">
					<router-link
						:to="{ name: 'product', params: { productSlug: productSlug }}"
						class="flex items-center justify-center font-bold text-white text-center bg-wz-green border-2 border-wz-green py-1.5 px-4 mr-3 rounded-full shadow-xs focus:outline-none transition ease-in-out duration-150 md:hidden"
					>
						Add to cart
					</router-link>
				</div>

				<favorite-button
					class="ml-auto shrink-0"
					:favorited="favorited"
					:validating="favoriting"
					@submit="$emit('toggle-favorited')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper/bundle'

	export default {
		name: 'TileHeader',

		components: {
			Swiper
		},

		props: {
			open: {
				default: false
			},

			isOngoing: {
				default: true
			},

			thumbnails: {
				default: []
			},

			title: {
				required: true,
				type: String
			},

			fee: {
				required: false,
				default: '',
				type: String
			},

			imageUrl: {
				required: false,
				type: String
			},

			favorited: {
				default: false
			},

			favoriting: {
				default: false
			},

			imageAlt: {
				default: ''
			},

			primaryCtaText: {
				required: false,
				default: 'Let’s go',
				type: String
			}
		},

		data() {
			return {
				swiper: null,
				swiperOptions: {
					loop: false,
					autoplay: false,
					spaceBetween: 0,
					slidesPerView: 1,
					autoHeight: false,
					pagination: false,
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					}
				}
			}
		},

		mounted() {
			if (this.thumbnails.lengh > 0) {
				this.initSwiper()
			}
		},

		methods: {
			initSwiper() {
				this.swiper = new Swiper(this.$el.querySelector('.swiper'), this.swiperOptions)
			}
		}
	}
</script>

