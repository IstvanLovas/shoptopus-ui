<template>
    <div>
        <img :src="src" :alt="alt">
    </div>
</template>

<script>
    import { getImageBaseUrl } from '@/imageBaseUrl'

    export default {
        name: 'ShoptopusImage',

        props: {
            path: {
                default: false
            },

            alt: {
                default: ''
            }
        },

        computed: {
            src() {
                if (!this.path) {
                    return `/assets/placeholder.svg`
                }

                return this.path.includes('http')
                    ? this.path
                    : getImageBaseUrl() + this.path
            }
        }
    }
</script>
