<template>
    <v-container>
        <!-- Welcome Notif -->
        <v-row>
            <v-col cols="12">
                <v-alert
                v-model="welcomeNotif"
                dismissible
                color="orange"
                border="left"
                elevation="2"
                colored-border
                >
                Welcome to SellArt, {{userProfile.username}}! 
                </v-alert>
            </v-col>  
        </v-row>
        <!-- Loading Data -->
        <v-row>
            <v-col class="text-center">
                <AddItem />
            </v-col>
            <v-col
            class="text-center"
            cols="12">
                <v-progress-circular v-if="itemsByUser.length == 0"
                :size="50"
                color="orange"
                indeterminate>
                </v-progress-circular>
            </v-col>
        </v-row>
        <!-- Display -->
        <div>
            <v-card
            class="d-flex flex-wrap justify-space-around"
            flat
            tile>
                <v-card
                v-for="(item, index) in itemsByUser" :key="item.id"
                class="ma-2">
                    <v-img 
                    v-if="item.image"
                    height="400"
                    width="400"
                    class="white--text align-start"
                    :src="item.image"
                    lazy-src="https://via.placeholder.com/250">
                    <v-card-title>
                        {{item.name}}
                    </v-card-title>
                    </v-img>
                    <v-card-text>
                        <p class="subtittle-1">{{item.description}}</p>
                        <p class="subtittle-1">{{item.price}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <EditItem :item="item" :index="index"/>
                        <DeleteItem :item="item" :index="index"/>
                    </v-card-actions>
                </v-card>
            </v-card>        
        </div>
    </v-container>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import { auth } from '../../firebase'
import AddItem from '../user/AddItem'
import EditItem from '../user/EditItem'
import DeleteItem from '../user/DeleteItem'

export default {
    name: 'Dashboard',
    components: {
        AddItem,
        EditItem,
        DeleteItem,
    },
    data(){
        return{
            welcomeNotif: true,
        }
    },
    computed: {
        ...mapState(['userProfile', 'itemsByUser']),
    },
    methods: {
        ...mapActions(['getUserProfile', 'getItemsByUser']),
        
    },
    async created(){
        await this.getUserProfile(auth.currentUser)
        await this.getItemsByUser()
    },

}
</script>