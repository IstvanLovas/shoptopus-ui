<template>
    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
        <div v-show="show" class="origin-top-right absolute right-0 z-[100] w-56 mt-2 px-4 py-5 rounded-lg shadow-lg bg-white" role="menu">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Dropdown',

        props: {
            show: {
                default: false
            }
        }
    }
</script>
