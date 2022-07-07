<template>
    <page-template>
        <auth-cards
            step="reset-password"
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
        name: 'ResetPassword',

        metaInfo() {
            return {
                title: 'ResetPassword'
            }
        },

        components: {
            AuthCards,
            PageTemplate
        }
    }
</script>
