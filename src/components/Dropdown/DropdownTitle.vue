<template>
    <span class="block font-paralucent leading-none text-xl text-wz-black mb-6" v-text="title"></span>
</template>

<script>
    export default {
        name: 'DropdownTitle',

        props: {
            title: {
                required: true,
                type: String
            }
        }
    }
</script>
