<template>
    <div :class="[{ loaded: loaded }, 'relative', getMainBackgroundColor]">
        <app-header
            :open="menuOpen"
            :user="user"
            :cart-items="getCartItems"
            @toggle-show-menu="menuOpen = !menuOpen"
            @close-show-menu="menuOpen = false"
            @log-out="onLogOut"
        />

        <main class="relative w-full overflow-hidden z-[11]">
            <transition>
                <router-view
                    :key="$route.path"
                    :user="user"
                    :cart="cart"
                    :authenticated="authenticated"
                    @update-cart="handleCartUpdate"
                    @show-auth="onShowAuth"
                    @hide-auth="onHideAuth"
                    @logged-in="onLoggedIn"
                    @log-out="onLogOut"
                    @remove-product-from-cart="onRemoveProductFromCart"
                    @flash-message="onShowFlashMessage"
                ></router-view>
            </transition>
        </main>

        <app-footer />

        <flash-message
            :show="flashMessageData.show"
            :message="flashMessageData.message"
            :level="flashMessageData.level"
            :timeout="flashMessageData.timeout"
            :max-viewport="flashMessageData.maxViewport"
            @hide="onHideFlashMessage"
        />

        <modal :show="authData.show" max-width="18" @close="authData.show = false">
            <auth-cards
                :inline-flash-message="true"
                :step="authData.step"
                :user="user"
                @logged-in="onLoggedIn"
                @log-out="onLogOut"
                @close="onHideAuth"
                @flash-message="onShowFlashMessage"
            />
        </modal>

        <svg class="hidden absolute w-0 h-0 pointer-events-none select-none checkbox-symbol">
            <symbol id="symbol-check" viewbox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
            </symbol>
        </svg>
    </div>
</template>

<script>
    import Modal from '@/components/Modal'
    import AuthCards from '@/components/Auth/AuthCards'
    import AppHeader from '@/components/AppHeader/AppHeader'
    import AppFooter from '@/components/AppFooter/AppFooter'
    import FlashMessage from "@/components/FlashMessage"
    import { setImageBaseUrl } from '@/imageBaseUrl'
    import { setCart, getCart, clearCart } from '@/cart'
    import { isLoggedIn, logoutUser, getAuthToken, setAuthToken, setVerifiedToken } from '@/auth'

    export default {
        name: 'App',

        metaInfo() {
            return {
                htmlAttrs: {
                    lang: 'en'
                },
                meta: [
                    { charset: 'utf-8' },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { name: 'description', content: `` },
                    { name: 'author', content: 'Shoptopus' },
                    { name: 'og:type', content: 'website' },
                    { name: 'og:url', content: window.location.href },
                    { name: 'og:image', content: '' },
                ],
                // if no subcomponents specify a metaInfo.title, this title will be used
                title: '',
                // all titles will be injected into this template
                titleTemplate: 'Shoptopus - %s'
            }
        },

        components: {
            Modal,
            AuthCards,
            AppHeader,
            AppFooter,
            FlashMessage
        },

        data() {
            return {
                settings: false,
                imageBaseUrl: '',
                loaded: false,
                menuOpen: false,
                user: false,
                cart: null,
                authData: {
                    show: false,
                    step: 'login'
                },
                flashMessageData: {
                    show: false,
                    message: false,
                    level: 'info',
                    timeout: 5000,
                    maxViewport: ''
                }
            }
        },

        computed: {
            authenticated() {
                return !! this.user
            },

            verified() {
                return this.authenticated && this.user.is_verified
            },

            getCartItems() {
                return this.cart ? this.cart.products : []
            },

            getMainBackgroundColor() {
                return 'bg-wz-light-grey'
            },

            mainBgClass() {
                return 'bg-wz-yellow'
            }
        },

        mounted() {
            this.loaded = true

            this.getSiteSettings()
            this.setUpUser()
        },

        watch: {
            '$route': {
                immediate: true, handler() {
                    this.menuOpen = false

                    this.authData.show = false
                    this.authData.step = 'login'
                }
            }
        },

        methods: {
            onRemoveProductFromCart(productIds) {
                if (!(productIds instanceof Array)) {
                    productIds = [productIds]
                }

                this.cart.products = this.cart.products.filter(product => !this.inArray(product.id, productIds))

                this.handleCartUpdate(this.cart)
            },

            getSiteSettings() {
                // axios.get('site_settings')
                //     .then(response => {
                //         this.settings = response.data.data[0].settings
                //         this.imageBaseUrl = response.data.data[0].images.s3_bucket_url

                //         if (this.imageBaseUrl) {
                //             setImageBaseUrl(this.imageBaseUrl)
                //         }


                //     })
                //     .catch(err => {
                //         let message = err.response.data.user_message ?? this.fallbackErrorMessage
                //         this.$emit('flash-message', { message: message, level: 'danger' })
                //     })
            },

            onHideFlashMessage() {
                this.flashMessageData.show = false
            },

            onShowFlashMessage(data) {
                this.flashMessageData.message = data.message ?? ''
                this.flashMessageData.level = data.level ?? 'info'
                this.flashMessageData.timeout = data.timeout ?? 5000
                this.flashMessageData.maxViewport = data.maxViewport ?? ''

                this.flashMessageData.show = true
            },

            onLoggedIn(data) {
                this.user = data.authData.user
                this.cart = data.authData.user.cart

                setAuthToken(data.authData.token)
                setVerifiedToken(data.authData.user.is_verified)

                if (data.flashMessage) {
                    this.flashMessageData.message = data.flashMessage.message
                    this.flashMessageData.level = data.level ?? 'info'

                    this.flashMessageData.show = true
                }
            },

            handleCartUpdate(cart) {
                if (cart) {
                    setCart(cart)

                    this.cart = cart

                    if (this.user) {
                        this.user.cart = cart
                    }
                }
            },

            onShowAuth(data = false) {
               if (data) {
                   this.authData.step = data.step ?? 'login'
               } else {
                   this.authData.step = 'login'
               }

                this.authData.show = true
            },

            onHideAuth() {
                this.authData.show = false
            },

            setUpUser() {
                setAuthToken(getAuthToken() ?? '')

                if (isLoggedIn()) {
                    if (!this.authenticated) {
                        axios.get('auth/details')
                            .then(response => response.data.data.auth.user)
                            .then(user => {
                                this.user = user

                                this.cart = user.cart

                                setVerifiedToken(user.is_verified)
                            })
                            .catch(() => {
                                logoutUser()

                                this.user = false
                            })
                    } else {
                        this.cart = this.user.cart
                    }
                } else {
                    this.cart = getCart()
                }
            },

            onLogOut() {
                if (isLoggedIn()) {
                    axios.post('auth/logout')
                        .finally(() => this.handleAfterLoggedOut())
                } else {
                    this.handleAfterLoggedOut()
                }
            },

            handleAfterLoggedOut() {
                logoutUser()

                this.menuOpen = false
                this.user = false

                this.$router.push({ name: 'home' })
            }
        }
    }
</script>
