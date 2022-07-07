<template>
    <div class="text-center flex flex-col items-center justify-center w-56 mx-auto p-4 bg-wz-thin-grey rounded-3xl">
        <h3 class="text-xs leading-7 text-wz-medium-grey mb-2.5">Sign up with</h3>

        <ul class="w-full flex flex-col items-center justify-center">
            <li class="w-full mb-2">
                <button type="button" title="Facebook" @click="singUpWith('facebook')" class="font-semibold w-full h-8 flex items-center justify-center text-white rounded-lg bg-[#4683D6] focus:outline-none">
                    <span class="text-lg mr-2">
                        <i class="fab fa-facebook-f"></i>
                    </span>
                    <span>Facebook</span>
                </button>
            </li>

            <li class="w-full">
                <button type="button" title="Google" @click="singUpWith('google')" class="font-semibold w-full h-8 flex items-center justify-center text-white rounded-lg bg-black focus:outline-none">
                    <span class="text-lg mr-2">
                        <i class="fab fa-google"></i>
                    </span>
                    <span>Google</span>
                </button>
            </li>
        </ul>

        <!-- <div>
            <p class="text-xs text-center text-wz-turquoise mt-4 mb-2">
                Have a referral code? Enter below
            </p>

            <input type="text" name="referral_code" placeholder="Referral code" v-model="referral_code" class="w-full text-xs px-4 py-3 text-center border-2 border-wz-grey rounded-full focus:outline-none">

            <span v-if="error" class="inline-block mt-1 text-red-400 text-xs" v-text="error"></span>
        </div> -->
    </div>
</template>

<script>
    import { setRedirectUri } from '@/redirectUri'

    export default {
        name: 'SocialLoginLinks',

        data() {
            return {
                referral_code: null,
                error: false
            }
        },

        mounted() {
            const referralCodeErrorMsg = this.$route.query.hasOwnProperty('referralCodeErrorMsg') ? this.$route.query.referralCodeErrorMsg : null
            
            if (referralCodeErrorMsg) {
                this.error = referralCodeErrorMsg
            }
        },

        methods: {
            singUpWith(provider) {
                if (this.$route.name !== 'login' && this.$route.name !== 'register' && this.$route.name !== 'verify') {
                    setRedirectUri(this.$route.fullPath)
                }

                axios.get(`auth/login/${provider}`)
                    .then(res => {
                        if (this.referral_code) {
                            localStorage.setItem('wz_referral_code', this.referral_code)
                        } else if (this.$route.query.hasOwnProperty('referral_code')) {
                            localStorage.setItem('wz_referral_code', this.$route.query.referral_code)
                        }

                        window.location.assign(res.data.data.targetUrl)
                    })
                    .catch(err => this.$emit('show-user-error-message', err.response.data.user_message))
                    .finally(() => clearRedirectUri())
            }
        }
    }
</script>
