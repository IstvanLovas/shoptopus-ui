<template>
	<header class="bg-white sticky top-0 z-[1000] shadow-xs" id="app-header">
		<top-navbar :user="user" @log-out="$emit('log-out')" />

		<div class="container flex items-center justify-center">
			<div class="flex items-center justify-between lg:block">
				<shoptopus-logo class="w-32 lg:hidden" />

				<!-- <button
					type="button"
					class="p-4 text-4xl text-wz-black translate-x-4 focus:outline-none lg:p-6 lg:translate-x-12"
					@click="$emit('toggle-show-menu')"
				>
					<i class="fal fa-times"></i>
				</button> -->
			</div>

			<nav class="py-5" aria-labelledby="primary-navigation" id="primary-navigation-nav">
				<h2 id="primary-navigation" class="sr-only">Primary Navigation</h2>

				<ul class="flex gap-6">						
					<li v-for="product_category in getFeaturedCategories" :key="product_category.id">
						<primary-nav-link :to="{ name: 'shop', params: { categorySlug: product_category.slug } }" v-text="trans(product_category.name)"></primary-nav-link>
					</li>
				</ul>
			</nav>

			<div class="ml-auto flex gap-4 text-wz-black text-2xl">
				<router-link :to="{ name: 'favorites' }" class="relative">
					<i class="fal fa-heart"></i>
				</router-link>

				<router-link :to="{ name: 'cart' }" class="relative">
					<i class="relative fal fa-shopping-bag z-[1]"></i>

					<span v-if="getCartItemsCount" class="font-medium text-[8px] leading-none flex items-center justify-center absolute top-0 right-0 z-[2] translate-x-[5px] -translate-y-[2px] w-4 h-4 p-[1px] rounded-full bg-wz-orange text-white" v-text="getCartItemsCount"></span>
				</router-link>
			</div>
		</div>

		<!-- <button type="button" @click="$emit('toggle-show-menu')" class="p-4 -ml-4 text-wz-black text-2xl translate-x-4 focus:outline-none">
			<i class="fal fa-bars"></i>
		</button> -->

		<!-- <notifications
            :user="user"
            :items="notifications"
            @flash-message="$emit('flash-message', $event)"
        /> -->
	</header>
</template>

<script>
	import TopNavbar from './TopNavbar'
	import PrimaryNavLink from './PrimaryNavLink'
	import Notifications from "@/components/Notifications/Notifications"

	export default {
		name: 'AppHeader',

		props: {
			open: {
				default: false
			},

			user: {
				default: false
			},

			cartItems: {
				default: []
			},
		},

		components: {
			TopNavbar,
			PrimaryNavLink,
			Notifications
		},

		data() {
			return {
				error: null,
                loading: false,
				notifications: [],
				product_categories: [],
				showHelpDropdown: false,
				showAccountDropdown: false
			}
		},

		computed: {
			getCartItemsCount() {
				return this.cartItems.length
			},

			getFeaturedCategories() {
				return this.product_categories.filter(cat => cat.product_ids.length)
			},

			isHomePage() {
				return this.$route.name === 'home'
			},

			isHowItWorksPage() {
				return this.$route.name === 'turn-fans-into-customers' || this.$route.name === 'when-you-want-to-win'
			}
		},

		mounted() {
			this.getProductCategories()
            //this.fetchNotifications()
        },

        methods: {
        	getProductCategories() {
                axios.get('product_categories?page[limit]=6')
                    .then(response => this.product_categories = response.data.data)
                    .catch(err => {
                        let message = err.response.data.user_message ?? this.fallbackErrorMessage
                        this.$emit('flash-message', { message: message, level: 'danger' })
                    })
            },

            fetchNotifications() {
                this.loading = true
                this.error = null

                axios.get('user/notifications')
                    .then(response => response.data.data)
                    .then(data => this.notifications = data.map(notification => {
                        let data = JSON.parse(notification.data)
                        notification.category = data.category
                        notification.content = data.content
                        notification.level = data.level
                        notification.icon = data.icon
                        delete notification.data
                        return notification
                    }))
                    .catch(err => this.error = err.response.data.user_message)
                    .finally(() => this.loading = false)
            },
        },
	}
</script>
