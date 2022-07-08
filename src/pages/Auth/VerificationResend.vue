<template>
    <page-template>
        <auth-cards
            step="verify"
            :user="user"
            :closeable="false"
            @log-out="$emit('log-out')"
            @flash-message="$emit('flash-message', $event)"
        />
    </page-template>
</template>

<script>
    import AuthCards from '@/components/Auth/AuthCards'
    import PageTemplate from '@/components/Auth/PageTemplate'

    export default {
        name: 'VerificationResend',

        metaInfo() {
            return {
                title: 'Verify'
            }
        },

        props: {
            user: {
                default: false
            }
        },

        components: {
            AuthCards,
            PageTemplate
        },

        mounted() {
            const status = this.$route.query.hasOwnProperty('status') ? this.$route.query.status : null
            const message = this.$route.query.hasOwnProperty('message') ? this.$route.query.message : null

            if (message && status) {
                const level = status !== 200 ? 'danger' : 'info'

                this.$emit('flash-message', { message: message, level: level })
            }
        }
    }
</script>
