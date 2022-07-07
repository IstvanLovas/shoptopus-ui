<template>
    <div></div>
</template>

<script>
    import { getRedirectUrl, clearRedirectUri } from '@/redirectUri'

    export default {
        name: 'SocialLogin',

        metaInfo() {
            return {
                title: 'Social Login'
            }
        },

        mounted() {
            const code = this.$route.query.hasOwnProperty('code') ? this.$route.query.code : null

            if (code) {
                const referral_code = localStorage.getItem('wz_referral_code') ?? null

                localStorage.removeItem('wz_referral_code')

                axios.post(`auth/login/${this.$route.params.provider}/callback`, {
                    code: code,
                    referral_code: referral_code
                })
                    .then(res => {
                        let payload = {
                            authData: res.data.data.auth
                        }

                        this.$emit('logged-in', payload)

                        this.$router.push(getRedirectUrl() ?? { name: 'home' })
                    })
                    .catch(err => {
                        let baseUrlWithoutATrailingSlash = axios.defaults.baseURL.endsWith('/') ? axios.defaults.baseURL.slice(0, -1) : axios.defaults.baseURL
                        let errorData = err.response.data
                        let redirectUrl = getRedirectUrl()
                        let userMessage = errorData.user_message,
                            status = 500,
                            step = 'socialMediaSignUp';

                        let referralCodeErrorMsg = errorData.errors && errorData.errors.referral_code[0]
                            ? errorData.errors.referral_code[0]
                            : false

                        if (redirectUrl) {
                            let url = new URL(baseUrlWithoutATrailingSlash + redirectUrl)

                            if (url.searchParams.has('referralCodeErrorMsg')) {
                                url.searchParams.delete('referralCodeErrorMsg')
                            }

                            if (url.searchParams.has('message')) {
                                url.searchParams.delete('message')
                            }

                            if (referralCodeErrorMsg) {
                                url.searchParams.append('referralCodeErrorMsg', referralCodeErrorMsg)
                            }

                            url.searchParams.append('message', userMessage)

                            redirectUrl = url.href.replace(baseUrlWithoutATrailingSlash, "")
                        }

                        let queryData = {
                            message: userMessage,
                            status: status,
                            step: step
                        }

                        if (referralCodeErrorMsg) {
                            queryData.referralCodeErrorMsg = referralCodeErrorMsg
                        }

                        this.$router.push(redirectUrl ?? {
                            name: 'login',
                            query: queryData
                        })
                    })
                    .finally(() => clearRedirectUri())
            } else {
                this.$router.push({ name: 'login' })
            }
        }
    }
</script>
