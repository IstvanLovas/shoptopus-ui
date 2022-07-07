import Vue from 'vue'

import ShoptopusLogo from '@/components/ShoptopusLogo'
import ShoptopusImage from '@/components/ShoptopusImage'
import InnerContent from '@/components/Layout/InnerContent'
import PageTitle from '@/components/Layout/Headers/PageTitle'
import PageSubTitle from '@/components/Layout/Headers/PageSubTitle'
import OrangeButton from "@/components/ActionButtons/OrangeButton"
import GreenButton from "@/components/ActionButtons/GreenButton"
import DarkGreenButton from "@/components/ActionButtons/DarkGreenButton"
import GreyButton from "@/components/ActionButtons/GreyButton"
import LightGreyButton from "@/components/ActionButtons/LightGreyButton"
import BlueButton from "@/components/ActionButtons/BlueButton"
import WhiteButton from "@/components/ActionButtons/WhiteButton"
import FavoriteButton from "@/components/ActionButtons/FavoriteButton"

import SocialShareButtons from '@/components/SocialShareButtons'

import IconTime from '@/components/Icons/Time'
import IconEnvelope from '@/components/Icons/Envelope'
import IconTel from '@/components/Icons/Tel'
import IconAddress from '@/components/Icons/Address'

import Products from '@/components/Products'

Vue.component('shoptopus-logo', ShoptopusLogo)
Vue.component('shoptopus-image', ShoptopusImage)
Vue.component('inner-content', InnerContent)
Vue.component('page-title', PageTitle)
Vue.component('page-sub-title', PageSubTitle)
Vue.component('orange-button', OrangeButton)
Vue.component('green-button', GreenButton)
Vue.component('dark-green-button', DarkGreenButton)
Vue.component('grey-button', GreyButton)
Vue.component('light-grey-button', LightGreyButton)
Vue.component('blue-button', BlueButton)
Vue.component('white-button', WhiteButton)
Vue.component('favorite-button', FavoriteButton)
// Vue.component('social-share-buttons', SocialShareButtons)

Vue.component('icon-time', IconTime)
Vue.component('icon-envelope', IconEnvelope)
Vue.component('icon-tel', IconTel)
Vue.component('icon-address', IconAddress)

Vue.component('products', Products)
