import Vue from 'vue'
import Router from 'vue-router'

import { isLoggedIn, isVerified } from '@/auth'

import Home from '@/pages/Home'
import ProductDetail from '@/pages/ProductDetail'
import Shop from '@/pages/Shop'
import Cart from '@/pages/Cart'
import GetInTouch from '@/pages/GetInTouch'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Help from '@/pages/Help'
import NotFound from '@/pages/NotFound'
import CompletePayment from '@/pages/Checkout/CompletePayment'

import Account from '@/pages/Account/Account'
import Dashboard from '@/pages/Account/Dashboard'
import Profile from '@/pages/Account/Profile'
import Favorites from '@/pages/Account/Favorites'
import Orders from '@/pages/Account/Orders'
import Settings from '@/pages/Account/Settings'

import Register from '@/pages/Auth/Register'
import Login from '@/pages/Auth/Login'
import VerificationResend from '@/pages/Auth/VerificationResend'
import Verification from '@/pages/Auth/Verification'
import ResetPassword from '@/pages/Auth/ResetPassword'
import SocialLogin from '@/pages/Auth/SocialLogin'

Vue.use(Router)

const router = new Router({
	mode: 'history',

	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (to.hash) {
				let elem = document.querySelector(to.hash)

				if (elem) {
					return {
						x: 0,
						y: elem.getBoundingClientRect().top + window.scrollY
					}
				} else {
					return {
						x: 0,
						y: 0
					}
				}
			} else {
				return {
					x: 0,
					y: 0
				}
			}
		}
	},

	routes: [
		{
			path: '/',
			name: "home",
			component: Home,
			meta: { requiresAuth: false }
		},
		{
			path: '/product/:productSlug',
			name: "product",
			component: ProductDetail,
			meta: { requiresAuth: false }
		},
		{
			path: '/shop/:categorySlug',
			name: "shop",
			component: Shop,
			meta: { requiresAuth: false }
		},
		{
			path: '/cart',
			name: "cart",
			component: Cart,
			meta: { requiresAuth: false }
		},
		{
			path: '/get-in-touch',
			name: "get-in-touch",
			component: GetInTouch,
			meta: { requiresAuth: false }
		},
		{
			path: '/privacy-policy',
			name: "privacy-policy",
			component: PrivacyPolicy,
			meta: { requiresAuth: false }
		},
		{
			path: '/help',
			name: "help",
			component: Help,
			meta: { requiresAuth: false }
		},
		{
			path: '/payment/complete',
			name: 'complete-payment',
			component: CompletePayment,
			meta: { requiresAuth: true }
		},
		{
			path: '/account',
			component: Account,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: "dashboard",
					component: Dashboard,
				},
				{
					path: 'profile',
					name: "profile",
					component: Profile,
				},
				{
					path: 'favorites',
					name: 'favorites',
					component: Favorites
				},
				{
					path: 'orders',
					name: 'orders',
					component: Orders
				},
				{
					path: 'settings',
					name: 'settings',
					component: Settings
				}
			]
		},
		{
			path: '*',
			name: "not-found",
			component: NotFound,
			meta: { requiresAuth: false }
		},
		{
			path: '/register',
			name: "register",
			component: Register,
			meta: { requiresAuth: false }
		},
		{
			path: '/login',
			name: "login",
			component: Login,
			meta: { requiresAuth: false }
		},
		{
			path: '/verify',
			name: "verify",
			component: VerificationResend,
			meta: { requiresAuth: false }
		},
		{
			path: '/verification',
			name: "verification",
			component: Verification,
			meta: { requiresAuth: false }
		},
		{
			path: '/reset-password',
			name: "reset-password",
			component: ResetPassword,
			meta: { requiresAuth: false }
		},
		{
			path: '/api/auth/login/:provider/callback',
			name: "social-login",
			component: SocialLogin,
			meta: { requiresAuth: false }
		}
	]
})

router.beforeEach(async(to, from, next) => {
	let authenticated = await isLoggedIn()
	let verified = await isVerified()

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!authenticated) {
			return next({ name: 'login', query: { redirect: to.fullPath, mustVerify: to.meta.mustVerify } })
		} else if (authenticated && to.meta.mustVerify && !verified) {
			return next({ name: 'verify' })
		} else {
			return next()
		}
	} else {
		if(to.name === 'verify' && verified) {
			if(!from.name) next({ name: 'home' })
			else next({ name: from.name })
		}

		if((to.name === 'login' || to.name === 'register') && authenticated) {
			if (verified) next({ name: 'my-dashboard' })
			else next({ name: 'home' })
		}
		else next()
	}
})

export default router
