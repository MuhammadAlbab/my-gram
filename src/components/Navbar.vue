<template>
    <nav>
        <v-app-bar
            app
            height="65"
        >
            <v-app-bar-nav-icon @click="goHome" class="ml-10">
                <img :src="imageLink.logo" alt="Logo-SellArt" height="65" width="65">
            </v-app-bar-nav-icon>
            <v-app-bar-title class="mx-0">
                <h2 class="orange--text text--lighten-2" style="text-shadow: -3px 2px white">MyGram</h2>
            </v-app-bar-title>
            <v-spacer />
            <v-toolbar-items v-if="!isAuthenticated">
                <v-btn
                    small
                    dark
                    @click="loginDialog = !loginDialog" 
                    color="orange lighten-2"
                >
                    Login
                </v-btn>
                <v-dialog
                v-model="loginDialog"
                transition="dialog-bottom-transition"
                max-width="400"
                >
                    <LoginDialog/>
                </v-dialog>
            </v-toolbar-items>
            <v-toolbar-items v-else>
                <v-btn
                    small
                    text dark class="red lighten-2"
                    @click="logOut"
                >
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </nav>
</template>

<script>
import {auth} from'../firebase'
import { mapActions } from 'vuex'
import LoginDialog from '@/views/LoginDialog.vue'
export default {
    name: 'Navbar',
    components: {
        LoginDialog,
    },
    data(){
        return{
            loginDialog: false,
            cartDrawer: false,
            isAuthenticated: '',
            imageLink: {
                logo: require('@/assets/logo-bar.png'),
            },
        }
    },
    computed: {
        
    },
    methods: {
        ...mapActions(['getCartItems']),
        logOut(){
            this.$store.dispatch('logout')
        },
        goHome(){
            this.$router.push('/')
        }
    },
    async created(){
        
    },
    mounted(){
        this.isAuthenticated = auth.currentUser;
    },
}
</script>

<style>

</style>