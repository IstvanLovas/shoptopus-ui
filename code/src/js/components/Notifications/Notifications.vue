<template>
    <div class="swiper mb-12">
        <div class="swiper-wrapper -mx-2">
            <div v-for="(notification, index) in items" :key="index" class="swiper-slide px-2">
                <notification-card
                    :id="notification.id"
                    :category="notification.category"
                    :content="notification.content"
                    :level="notification.level"
                    :icon="notification.icon"
                    @read="onRead(index)"
                    @flash-message="$emit('flash-message', $event)"
                />
            </div>
        </div>

        <div class="swiper-scrollbar"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper/bundle'
    import NotificationCard from "@/components/Notifications/NotificationCard"

    export default {
        name: 'Notifications',

        props: {
            items: {
                required: false,
                type: Array
            },

            user: {
                required: true
            }
        },

        components: {
            Swiper,
            NotificationCard
        },

        data() {
            return {
                swiper: null,
                swiperOptions: {
                    loop: false,
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                    autoHeight: false,
                    pagination: false,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        dragSize: 'auto'
                    }
                }
            }
        },

        mounted() {
            this.initSwiper()
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.updateSwiper())
        },

        methods: {
            initSwiper() {
                this.swiper = new Swiper(this.$el, this.swiperOptions)

                window.addEventListener('resize', () => this.updateSwiper())
            },

            updateSwiper() {
                if (this.swiper) {
                    this.swiper.update()
                }
            },

            onRead(index) {
                this.swiper.destroy()
                this.items.splice(index, 1)
                this.initSwiper()
            }
        }
    }
</script>

<style scoped>
    .swiper {
        overflow: visible;
    }

    .swiper-slide {
        width: 100%;
        max-width: 290px;
    }

    .swiper-horizontal>.swiper-scrollbar {
        bottom: -22px;
        height: 7px;
    }
</style>
