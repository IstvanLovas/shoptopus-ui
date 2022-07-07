<template>
    <ul :class="[fontSizeClass, colorClass, gapClass, 'flex items-center justify-center']">
        <li>
            <ShareNetwork
                network="facebook"
                :url="getHref"
                :title="getTitle"
                :description="getDescription"
                :hashtags="getHashtags"
              >
                <i class="fab fa-facebook"></i>
            </ShareNetwork>
        </li>
        <li>
            <ShareNetwork
                network="twitter"
                :url="getHref"
                :title="getTitle"
                :hashtags="getHashtags"
              >
                <i class="fab fa-twitter"></i>
            </ShareNetwork>
        </li>

        <li>
            <ShareNetwork
                network="whatsapp"
                :url="getHref"
                :title="getTitle"
                :description="getDescription"
              >
                <i class="fab fa-whatsapp"></i>
            </ShareNetwork>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'SocialShareButtons',

        props: {
            show: {
                default: false
            },

            size: {
                default: '4xl'
            },

            color: {
                default: 'grey'
            },

            gap: {
                default: '4'
            },

            url: {
                default: null
            },

            title: {
                default: null
            },

            description: {
                default: null
            },

            hashtags: {
                default: null
            }
        },

        computed: {
            fontSizeClass() {
                return {
                    'xl': 'text-xl',
                    '4xl': 'text-4xl'
                }[this.size]
            },

            colorClass() {
                return {
                    'grey': 'text-wz-grey',
                    'white': 'text-white'
                }[this.color]
            },

            gapClass() {
                return {
                    '2': 'gap-2',
                    '4': 'gap-4',
                }[this.gap]
            },

            getHref() {
                return this.url ?? window.location.href
            },

            getTitle() {
                return this.title ?? 'Win festival tickets, event tickets, merchandise and more!'
            },

            getDescription() {
                this.description ?? ''
            },

            getHashtags() {
                return 'winzum'
            }
        }
    }
</script>
