<template>
    <modal :show="show" max-width="18" @close="$emit('close')">
        <div class="bg-white rounded-lg shadow-md transition-all">
            <div class="relative flex flex-col items-center justify-between pt-12 pb-9 px-5 sm:max-w-18 sm:px-6">
                <button type="button" class="absolute -top-2 right-0 p-4 text-2xl text-wz-dark-grey focus:outline-none" @click="$emit('close')">
                    <i class="fal fa-times"></i>
                </button>

                <h2 class="font-paralucent leading-6 text-xl text-center text-wz-black">
                    <slot name="title"></slot>
                </h2>

                <div class="text-sm mt-4 flex flex-col items-center justify-center">
                    <div class="mb-6">
                        <slot name="text"></slot>
                    </div>

                    <orange-button :text="confirmButtonText" @click.native="$emit('confirmed')" class="mb-4" />
                    <grey-button :text="cancelButtonText" @click.native="$emit('close')" />
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    import Modal from "@/components/Modal"

    export default {
        name: 'ConfirmationDialogue',

        props: {
            show: {
                default: false
            },

            confirmButtonText: {
                default: 'Ok, understood'
            },

            cancelButtonText: {
                default: 'Cancel'
            }
        },

        components: { Modal }
    }
</script>
