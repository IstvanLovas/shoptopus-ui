<template>
    <page-template>
        <auth-cards
            :step="step"
            :closeable="false"
            @logged-in="onLoggedIn"
            @log-out="$emit('log-out')"
            @flash-message="$emit('flash-message', $event)"
        />
    </page-template>
</template>

<script>
    import AuthCards from '@/components/Auth/AuthCards'
    import PageTemplate from '@/components/Auth/PageTemplate'

    export default {
        name: 'Login',

        metaInfo() {
            return {
                title: 'Login'
            }
        },

        components: {
            AuthCards,
            PageTemplate
        },

        data() {
            return {
                step: 'login'
            }
        },

        mounted() {
            const status = this.$route.query.hasOwnProperty('status') ? this.$route.query.status : null
            const message = this.$route.query.hasOwnProperty('message') ? this.$route.query.message : null
            
            this.step = this.$route.query.hasOwnProperty('step') ? this.$route.query.step : 'login'

            if (message && status) {
                this.$emit('flash-message', {
                    message: message,
                    level: status != 200 ? 'danger' : 'info'
                })
            }
        },

        methods: {
            onLoggedIn(data) {
                this.$emit('logged-in', data)
                
                this.$router.push(this.$route.query.redirect ?? { name: 'home' })
            }
        }
    }
</script>
