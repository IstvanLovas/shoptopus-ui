<template>
    <div class="py-12 flex items-center justify-center min-h-[568px] md:py-20 xl:min-h-[768px]">
        <inner-content>
            <div class="flex items-center justify-center">
                <slot></slot>
            </div>
        </inner-content>
    </div>
</template>

<script>
    export default {
        name: 'PageTemplate'
    }
</script>
