<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert
                v-model="$store.state.welcomeNotif"
                dismissible
                color="orange"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-check-circle"
                >
                Welcome to SellArt, {{userProfile.username}}! 
                </v-alert>
            </v-col>  
        </v-row>
        <!--  -->
        <v-row>
            <ItemsForm />
        </v-row>
        <!--  -->
        <v-row>
            <DisplayItems />
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ItemsForm from '../user/ItemsForm'
import DisplayItems from '../user/DisplayItems'

export default {
    name: 'Dashboard',
    components: {
        ItemsForm,
        DisplayItems
    },
    data(){
        return{
            
        }
    },
    computed: {
        ...mapState(['userProfile'])
    },

}
</script>