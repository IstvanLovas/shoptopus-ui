export default {
    data() {
        return {
            prevRoute: null
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from
        })
    },

    methods: {
        goBack() {
            this.$router.push(this.prevRoute.path)
        }
    }
}
