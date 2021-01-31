<template>
    <nav>
    <v-toolbar>
        <v-app-bar-nav-icon @click="goHome" class="ml-10">
            <img :src="imageLink.logo" alt="Logo-SellArt" height="65" width="65">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="mx-0">
            <strong>Sell-Art</strong>
        </v-toolbar-title>
        <v-spacer />
        <!-- Pending content without login
        <v-toolbar-items>
        </v-toolbar-items> -->
        <v-toolbar-items v-if="!isAuthenticated">
            <v-btn
            dark
            @click="loginDialog = !loginDialog" 
            color="orange lighten-2">
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
                text
                link to="/latestarts"
            >
                The latest arts
            </v-btn>
            <v-btn
                text
                link to="/yourfav"
            >
                Your Favorite
            </v-btn>
            <v-btn
                text
                link to="/dashboard"
            >
                Home
            </v-btn>
            <v-btn
                text dark class="red lighten-2"
                @click="logOut"
            >
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
    </nav>
</template>

<script>
import {auth} from'../firebase'
import LoginDialog from '@/views/LoginDialog.vue'
export default {
    name: 'Navbar',
    components: {
        LoginDialog,
    },
    data(){
        return{
            loginDialog: false,
            isAuthenticated: '',
            imageLink: {
                logo: require('@/assets/logo-bar.png'),
            },
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logout')
        },
        goHome(){
            this.$router.push('/')
        }
    },
    computed: {
        
    },
    mounted(){
        this.isAuthenticated = auth.currentUser;
    },
}
</script>

<style>

</style>