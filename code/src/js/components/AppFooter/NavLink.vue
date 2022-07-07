<template>
    <router-link :to="to" class="lg:hover:text-wz-black-secondary">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: 'NavLink',

        props: {
            to: {
                required: true,
                type: Object
            }
        }
    }
</script>
