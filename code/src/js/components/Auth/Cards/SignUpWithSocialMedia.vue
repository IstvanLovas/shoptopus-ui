<template>
    <div>
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Create Account
        </h2>

        <social-login-links />

        <p class="text-xs text-center text-wz-turquoise mt-4">
            <button type="button" class="inline-block underline underline-offset focus:outline-none" @click="$emit('show-create-account')">Sign up with email</button>
        </p>
    </div>
</template>

<script>
    import SocialLoginLinks from '@/components/Auth/Cards/SocialLoginLinks'

    export default {
        name: 'SignUpWithSocialMedia',

        components: { SocialLoginLinks }
    }
</script>
