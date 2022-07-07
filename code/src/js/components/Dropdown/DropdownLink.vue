<template>
    <router-link :to="to" class="inline-block font-medium text-grey text-sm py-1.5">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: 'DropdownLink',

        props: {
            to: {
                required: true
            }
        }
    }
</script>
