<template>
	<div class="relative bg-wz-yellow py-12 min-h-screen" id="account">
		<inner-content>
			<nav class="mb-12">
				<ul class="flex items-center gap-6">
					<li>
						<router-link :to="{ name: 'dashboard' }" class="font-medium text-white">
							Dashboard
						</router-link>
					</li>

					<li>
						<router-link :to="{ name: 'profile' }" class="font-medium text-white">
							Profile
						</router-link>
					</li>

					<li>
						<router-link :to="{ name: 'favorites' }" class="font-medium text-white">
							Favorites
						</router-link>
					</li>

					<li>
						<router-link :to="{ name: 'settings' }" class="font-medium text-white">
							Settings
						</router-link>
					</li>
				</ul>
			</nav>
		</inner-content>

		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'Account'
	}
</script>
