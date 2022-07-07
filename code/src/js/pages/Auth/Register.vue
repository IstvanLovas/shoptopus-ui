<template>
    <page-template>
        <auth-cards
            step="signUpPreference"
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
        name: 'Register',

        metaInfo() {
            return {
                title: 'Register'
            }
        },

        components: {
            AuthCards,
            PageTemplate
        },

        methods: {
            onLoggedIn(data) {
                this.$emit('logged-in', data)

                this.$router.push(this.$route.query.redirect ?? { name: 'home' })
            }
        }
    }
</script>
