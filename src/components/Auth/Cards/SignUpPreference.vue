<template>
    <div>
        <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black mb-6">
            Create an account
        </h2>

        <green-button text="Sign up with email" fontSize="xs" padding-y="3" @click.native="$emit('sign-up-method-selected', 'createAccount')" />

        <div class="w-56 mx-auto flex items-center justify-between my-2">
            <span class="inline-block h-px flex-1 border border-dashed border-wz-grey"></span>
            <span class="px-4">or</span>
            <span class="inline-block h-px flex-1 border border-dashed border-wz-grey"></span>
        </div>

        <green-button text="Sign up with social media" fontSize="xs" padding-y="3" @click.native="$emit('sign-up-method-selected', 'socialMediaSignUp')" />
    </div>
</template>

<script>
    export default {
        name: 'SignUpPreference'
    }
</script>
