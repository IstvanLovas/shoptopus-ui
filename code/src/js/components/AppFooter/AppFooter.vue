<template>
	<footer class="relative z-[10] bg-wz-dark-orange text-white py-24">
		<div class="container">
			<span class="font-paralucent text-shadow text-4xl">Shoptopus Logo</span>

			<div class="grid grid-cols-2 gap-6 my-8 sm:my-12 md:my-14 md:grid-cols-4">
				<div>
					<h4 class="font-bold text-lg mb-2 sm:mb-4 lg:text-2xl">Highlights</h4>

					<ul class="font-medium text-sm leading-8 lg:text-base lg:leading-8">
						<li>
							<nav-link :to="{ name: 'home' }">
								Just in
							</nav-link>
						</li>

						<li>
							<nav-link :to="{ name: 'get-in-touch' }">
								Get in touch
							</nav-link>
						</li>
					</ul>
				</div>

				<div>
					<h4 class="font-bold text-lg mb-2 sm:mb-4 lg:text-2xl">Resources</h4>

					<ul class="font-medium text-sm leading-8 lg:text-base lg:leading-8">
						<li>
							<a href="#" target="_blank">
								Blog
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 class="font-bold text-lg mb-2 sm:mb-4 lg:text-2xl">Title here</h4>

					<ul class="font-medium text-sm leading-8 lg:text-base lg:leading-8">
						<li>
							<nav-link :to="{ name: 'home' }">
								Something
							</nav-link>
						</li>

						<li>
							<nav-link :to="{ name: 'home' }">
								Something else
							</nav-link>
						</li>
					</ul>
				</div>

				<div>
					<h4 class="font-bold text-lg mb-2 sm:mb-4 lg:text-2xl">Title Here</h4>

					<ul class="font-medium text-sm leading-8 lg:text-base lg:leading-8">
						<li>
							<a href="#" target="_blank">
								Lorem ipsum dolor
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="">
				<div class="xl:flex xl:items-center xl:gap-10">
					<div class="flex flex-col gap-6 md:flex-row md:items-center md:gap-10 2xl:gap-24">
						<span class="font-paralucent text-shadow text-xl">Shoptopus Logo</span>

						<link-email />

						<link-phone />
					</div>
				</div>

				<div class="text-xs mt-6 lg:text-sm">
					<p class="mb-1">Registered Office: 10A Couzens Place, Bristol, BS34 8PL, United Kingdom</p>
					<p>Shoptopus LTD Company no. 13672711. <router-link :to="{ name: 'privacy-policy' }" class="inline-block underline">Privacy Notice</router-link></p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import NavLink from './NavLink'
	import LinkEmail from '@/components/ContactLinks/LinkEmail'
	import LinkPhone from '@/components/ContactLinks/LinkPhone'

	export default {
		name: 'AppFooter',

		components: {
			NavLink,
			LinkEmail,
			LinkPhone
		}
	}
</script>
