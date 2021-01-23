<template>
    <nav app>
    <v-toolbar>
        <img :src="imageLink.logo" alt="Logo-SellArt" height="65">
        <v-toolbar-title class="mx-0">
            <strong>Sell-Art</strong>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items v-if="!isAuthenticated">
            <v-dialog
            :value="loginDialog"
            transition="dialog-bottom-transition"
            max-width="400"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    text dark class="orange lighten-2"
                    v-bind="attrs"
                    v-on="on"
                    >Login</v-btn>
                </template>
                <LoginDialog/>
            </v-dialog>
        </v-toolbar-items>
        <v-toolbar-items v-else>
            <v-btn
            text dark class="red lighten-2"
            @click="logOut"
            >Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
import {auth} from'../firebase'
import LoginDialog from '@/views/LoginDialog.vue'
export default {
    name: 'Navbar',
    components: {
        LoginDialog,
    },
    data(){
        return{
            isAuthenticated: '',
            imageLink: {
                logo: require('@/assets/logo-bar.png'),
            },
        }
    },
    methods: {
        logOut(){
            this.$store.dispatch('logout')
        }
    },
    computed: {
        ...mapState(['loginDialog'])
    },
    mounted(){
        this.isAuthenticated = auth.currentUser;
    }
}
</script>

<style>
    .btn-nav {
        margin: 0px 10px;
    }
</style>