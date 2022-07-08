<template>
    <div :class="['relative text-sm text-white leading-4 p-4 rounded-2xl shrink-0 shadow-sm', bgClass]">
        <div class="flex items-center">
            <span class="text-3xl inline-block mr-3">
                <i :class="iconClassName"></i>
            </span>

            <div class="w-full font-medium text-sm leading-4 shrink-0 pr-8">
                <div class="pr-4" v-html="content"></div>
            </div>
        </div>

        <div class="absolute top-0 right-0 z-10">
            <button
                type="button"
                class="text-base leading-6 text-wz-white py-2 px-4 focus:outline-none"
                :disabled="validating"
                @click="markAsRead"
            >
                <i class="fal fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotificationCard',

        props: {
            id: {
                required: true,
                type: String
            },

            category: {
                required: true,
                type: String
            },

            content: {
                required: true,
                type: String
            },

            level: {
                default: 'info'
            },

            icon: {
                default: null
            }
        },

        data() {
            return {
                validating: false
            }
        },

        computed: {
            iconClassName() {
                return this.icon ? this.icon : 'fal fa-bell'
            },

            bgClass() {
                return {
                    'product': 'bg-wz-green',
                    'favorite': 'bg-wz-orange',
                    'setting': 'bg-wz-yellow'
                }[this.category]
            }
        },

        methods: {
            markAsRead() {
                if (this.validating) return

                this.validating = true

                axios.patch('user/notifications/' + this.id)
                    .then(() => this.$emit('read'))
                    .catch(err => this.$emit('flash-message', {
                        message: err.response.data.user_message,
                        level: 'danger'
                    }))
                    .finally(() => this.validating = false)
            }
        }
    }
</script>
