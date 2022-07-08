<template>
    <router-link class="inline-block font-medium text-lg text-wz-black py-4" :to="to">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: 'PrimaryNavLink',

        props: {
            to: {
                required: true
            }
        }
    }
</script>
