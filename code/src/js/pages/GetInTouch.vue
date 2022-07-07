<template>
    <div class="relative bg-wz-yellow pt-44 lg:bg-wz-dark-orange 2xl:pb-20" id="get-in-touch">
        <inner-content class="relative">
            <div class="relative z-[3] lg:w-[645px]">
                <h1 class="font-paralucent font-bold leading-none text-5xl text-white text-shadow md:text-6xl md:tracking-tight lg:text-[130px]">
                    Contact
                </h1>

                <div class="mt-8 pb-7 mb-7 border-b border-dashed border-[#333333] lg:x-1/2 lg:pb-14 lg:mb-14">
                    <div class="flex flex-col gap-3 mb-3 lg:flex-row lg:justify-between lg:mb-6">
                        <link-email color="black" size="lg" />

                        <link-phone color="black" size="lg" />
                    </div>

                    <link-address color="black" size="lg" align="start" class="items-start lg:items-center" />
                </div>

                <form @submit.prevent="submit" @keydown="clearError($event.target.name)">
                    <h2 class="font-paralucent text-white !leading-none text-2xl text-shadow-lg mb-7 md:text-4xl">Leave a message</h2>

                    <div v-show="successMsg" class="text-wz-blue font-semibold leading-6 p-6 my-6 flex items-start bg-wz-light-blue" @click="successMsg = null">
                        <span class="flex text-2xl translate-y-1">
                            <i class="fal fa-check-circle"></i>
                        </span>

                        <span v-html="successMsg" class="ml-2"></span>
                    </div>

                    <div class="space-y-4 mb-4">
                       <div class="lg:flex lg:gap-4">
                            <div class="mb-4 w-full lg:mb-0">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Name*"
                                    v-model="form.name"
                                    class="w-full text-sm text-wz-black px-5 h-[50px] rounded-full placeholder:text-wz-black-secondary focus:outline-none"
                                    :class="{ 'border-2 border-red-400 text-red-400' : hasError('telephone') }"
                                >

                                <span v-if="hasError('name')" class="inline-block py-0.5 px-1 mt-1.5 bg-red-500 text-white text-sm font-medium" v-text="getError('name')"></span>
                            </div>

                            <div class="w-full">
                                <input
                                    type="text"
                                    name="telephone"
                                    required
                                    placeholder="Telephone*"
                                    v-model="form.telephone"
                                    class="w-full text-sm text-wz-black px-5 h-[50px] rounded-full placeholder:text-wz-black-secondary focus:outline-none"
                                    :class="{ 'border-2 border-red-400 text-red-400' : hasError('telephone') }"
                                >

                                <span v-if="hasError('telephone')" class="inline-block py-0.5 px-1 mt-1.5 bg-red-500 text-white text-sm font-medium" v-text="getError('telephone')"></span>
                            </div>
                       </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email*"
                                v-model="form.email"
                                class="w-full text-sm text-wz-black px-5 h-[50px] rounded-full placeholder:text-wz-black-secondary focus:outline-none"
                                :class="{ 'border-2 border-red-400 text-red-400' : hasError('email') }"
                            >

                            <span v-if="hasError('email')" class="inline-block py-0.5 px-1 mt-1.5 bg-red-500 text-white text-sm font-medium" v-text="getError('email')"></span>
                        </div>

                        <div>
                            <textarea
                                name="message"
                                id="message"
                                required
                                placeholder="Your message*"
                                rows="6"
                                v-model="form.message"
                                class="w-full text-sm text-wz-black px-5 py-3 min-h-[160px] shadow-md rounded-[21px] placeholder:text-wz-black-secondary focus:outline-none"
                                :class="{ 'border-2 border-red-400 text-red-400' : hasError('message') }"
                            ></textarea>

                            <span v-if="hasError('message')" class="inline-block py-0.5 px-1 mt-1.5 bg-red-500 text-white text-sm font-medium" v-text="getError('message')"></span>
                        </div>
                    </div>

                    <dark-green-button type="submit" text="Submit" font-size="xl" width="mobile-full" margin-x="align-right" :validating="validating" />
                </form>
            </div>
        </inner-content>
    </div>
</template>

<script>
    import LinkEmail from '@/components/ContactLinks/LinkEmail'
    import LinkPhone from '@/components/ContactLinks/LinkPhone'
    import LinkAddress from '@/components/ContactLinks/LinkAddress'

    import FormMixin from "@/components/FormMixin"

    export default {
        name: 'GetInTouch',

        mixins: [FormMixin],
        
        metaInfo() {
            return {
                title: 'Get in touch'
            }
        },

        components: {
            LinkEmail,
            LinkPhone,
            LinkAddress
        },

        data() {
            return {
                uri: 'contact_form',
                form: {
                    name: '',
                    telephone: '',
                    email: '',
                    message: ''
                },
                successMsg: null
            }
        },

        computed: {
            hasValidEmail () {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            },

            canSubmitForm() {
                return this.hasValidEmail &&
                    !this.hasUserErrorMessage &&
                    !this.hasAnyErrors() &&
                    !this.validating
            }
        },

        methods: {
            onSuccess(data) {
                this.successMsg = data.data[0]['message']

                this.form = {
                    name: '',
                    telephone: '',
                    email: '',
                    message: ''
                }

                setTimeout(() => this.successMsg = null, 10000)
            }
        }
    }
</script>
