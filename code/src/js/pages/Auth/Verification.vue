<template>
    <div>
        <h1 v-text="$route.query.api_verify_url"></h1>
    </div>
</template>

<script>
    export default {
        name: 'Verification',

        mounted() {
            const api_verify_url = this.$route.query.hasOwnProperty('api_verify_url') ? this.$route.query.api_verify_url : null

            if (api_verify_url) {
                axios.get(api_verify_url)
                    .then(res => window.location.href = res.data.url)
            }
        }
    }
</script>
