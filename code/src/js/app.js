require('./bootstrap')

import Vue from 'vue'

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing)

Vue.config.productionTip = false

Vue.mixin({
	data() {
		return {
			fallbackErrorMessage: 'Sorry there was a system error, the administrator has been informed.'
		}
	},

	methods: {
		trans(value, lang = 'en') {
			if (!this.inArray(lang, ['en', 'de', 'fr'])) {
				console.error(`'${lang}' language not supported!`)
			}

			let obj = JSON.parse(value)

			return obj.hasOwnProperty(lang) ? obj[lang] : obj['en']
		},

		ucfirst(string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		},

		financial(value, currencySymbol = '£') {
			if (!this.inArray(currencySymbol, ['£'])) {
				console.error(`'${lang}' currency not supported!`)
			}

			return currencySymbol + Number.parseFloat(value).toFixed(2)
		},

		formatDigits(digit) {
			return (digit).toLocaleString('en-GB', {
				minimumIntegerDigits: 2, useGrouping: false
			})
		},

		inArray(needle, haystack) {
			for(let i = 0; i < haystack.length; i++) {
				if(haystack[i] === needle) return true
			}

			return false
		},

		omit(obj, ...keys) {
			return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)))
		}
	}
})

import router from './routes'

import '@/components'

import App from '@/components/App'

const app = new Vue({
	components: { App },

	router

}).$mount('#app')
