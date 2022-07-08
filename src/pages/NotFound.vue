<template>
	<div class="relative bg-wz-dark-orange md:h-[740px] pt-44 md:h-[800px] xl:min-h-screen" id="not-found">
		<inner-content class="relative z-[2]">
			<div class="relative z-[3]">
				<h1 class="font-paralucent font-bold leading-none text-5xl text-white text-shadow md:text-6xl md:tracking-tight lg:text-[130px]">
                    Opps!
                </h1>

                <p class="font-semibold text-white leading-relaxed max-w-lg mt-8 mb-4 lg:text-lg">
                	The page you are looking for cannot be found.
                    Don't worry though, you'll always find great products on our home page.
                </p>

				<router-link
					:to="{ name: 'home'}"
					class="inline-block w-56 text-xl font-bold text-white text-center bg-wz-green py-3 px-9 my-6 rounded-full shadow-xs focus:outline-none"
				>Home</router-link>
			</div>
		</inner-content>
	</div>
</template>

<script>
	export default {
		name: 'NotFound',

		metaInfo() {
			return {
				title: 'Not Found'
			}
		}
	}
</script>
