<template>
    <button type="button" @click.stop="$emit('submit')" :disabled="validating"
        class="text-white flex shrink-0 text-2xl focus:outline-none md:text-3xl"
        :class="{'text-opacity-25 cursor-not-allowed': validating}">
        <i v-if="favorited" class="fas fa-heart"></i>
        <i v-else class="fal fa-heart"></i>
    </button>
</template>

<script>
    export default {
        name: 'FavoriteButton',

        props: {
            validating: {
                default: false
            },

            favorited: {
                required: true,
                type: Boolean
            }
        }
    }
</script>
