<template>
    <div class="bg-wz-black">
        <div class="container flex items-center justify-between">
            <div>
                <router-link :to="{ name: 'home' }">Home</router-link>
            </div>
            
            <div class="ml-auto">
                <ul class="-mx-3 flex leading-none">
                    <li
                        class="relative after:content-[''] after:block after:absolute after:top-1/2 after:right-0 after:w-px after:h-3 after:bg-white after:-translate-y-1/2"
                        @mouseover="showHelpDropdown = true"
                        @mouseleave="showHelpDropdown = false"
                    >
                        <router-link :to="{ name: 'help' }" class="inline-block text-white text-xs p-3">
                            Help
                        </router-link>

                        <dropdown :show="showHelpDropdown">
                            <dropdown-title title="Help" />

                            <ul class="-my-1.5">
                                <li>
                                    <dropdown-link :to="{ name: 'help', hash: 'delivery' }">
                                        Dispatch &amp; Delivery
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'help', hash: 'returns' }">
                                        Returns
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'get-in-touch' }">
                                        Contact Us
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'privacy-policy' }">
                                        Privacy Policy
                                    </dropdown-link>
                                </li>
                            </ul>
                        </dropdown>
                    </li>

                    <li
                        class="relative"
                        @mouseover="showAccountDropdown = true"
                        @mouseleave="showAccountDropdown = false"
                    >
                        <router-link v-if="!authenticated" :to="{ name: 'login' }" class="inline-block text-white text-xs p-3">
                            Sign In
                        </router-link>

                        <router-link v-else :to="{ name: 'dashboard' }" class="inline-block text-white text-xs p-3">
                            Hi, {{ user.first_name }}
                        </router-link>

                        <dropdown :show="showAccountDropdown && authenticated">
                            <dropdown-title title="Account" />

                            <ul class="-my-1.5">
                                <li>
                                    <dropdown-link :to="{ name: 'profile' }">
                                        Profile
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'orders' }">
                                        Orders
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'favorites' }">
                                        Favorites
                                    </dropdown-link>
                                </li>

                                <li>
                                    <dropdown-link :to="{ name: 'settings' }">
                                        Settings
                                    </dropdown-link>
                                </li>

                                <li>
                                    <button type="button" class="inline-block font-medium text-grey text-sm py-1.5" @click="$emit('log-out')">
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Dropdown from "@/components/Dropdown/Dropdown"
    import DropdownLink from "@/components/Dropdown/DropdownLink"
    import DropdownTitle from "@/components/Dropdown/DropdownTitle"

    export default {
        name: 'TopNavbar',

        props: {
            user: {
                default: false
            }  
        },

        components: {
            Dropdown,
            DropdownLink,
            DropdownTitle
        },

        data() {
            return {
                showHelpDropdown: false,
                showAccountDropdown: false
            }
        },

        computed: {
            authenticated() {
                return !! this.user
            }
        }
    }
</script>
