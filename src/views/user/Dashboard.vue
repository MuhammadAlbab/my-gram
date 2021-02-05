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
                    lazy-src="https://via.placeholder.com/400">
                    <v-card-title>
                        {{item.name | trimLengthName}}
                    </v-card-title>
                    <v-card-subtitle class="white--text">
                        {{item.createdOn | formatDate}}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-icon dark>mdi-heart</v-icon>
                        {{item.likes}}
                    </v-card-text>
                    </v-img>
                    <v-card-text>
                        <p class="subtittle-1">{{item.description | trimLengthDesc}}</p>
                        <p class="subtittle-1">{{item.price}}</p>
                    </v-card-text>
                    <v-card-actions class="justify-end">
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
import moment from 'moment'
import AddItem from '../user/manageData/AddItem'
import EditItem from '../user/manageData/EditItem'
import DeleteItem from '../user/manageData/DeleteItem'

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
        ...mapActions(['getItemsByUser']),
        
    },
    filters: {
        formatDate(val) {
            if (!val) { return '-' }
            let date = val.toDate()
            return moment(date).fromNow()
        },
        trimLengthDesc(val) {
            if (val.length < 50) { return val }
            return `${val.substring(0, 50)}...`
        },
        trimLengthName(val) {
            if (val.length < 20) { return val }
            return `${val.substring(0, 20)}...`
        }
    },
    async created(){
        await this.getItemsByUser()
    },

}
</script>