<template>
    <v-container>
        <v-row>
           <v-col
                cols="12"
                class="text-center"
            >
                <h1>Your Post</h1>
            </v-col> 
        </v-row>
        <template v-if="itemsByUser.length == 0">
            <v-row align="center" justify="center">
                <v-col
                    class="text-center"
                    cols="12"
                >
                        <v-progress-circular
                            :size="50"
                            color="orange"
                            indeterminate
                        >
                        </v-progress-circular>
                </v-col>
                <v-col
                    class="text-center"
                    cols="12"
                >
                    <h2>If the loading takes too long, that means you have not posted anything yet!</h2>
                    <h3>Add one now</h3>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-row
                align="center"
                justify="center"
            >
                <v-col
                    cols="12"
                    class="text-center"
                >
                    <h1>Your Post</h1>
                </v-col>
                <v-col>
                    <v-card
                        class="d-flex flex-wrap justify-space-around"
                        flat
                        tile
                    >
                        <v-card
                            v-for="(item, index) in itemsByUser" :key="item.id"
                            class="ma-2"
                        >
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
                            <v-card-text class="pb-0">
                                <p class="subtittle-1">{{item.description | trimLengthDesc}}</p>
                                <p class="subtittle-1">{{item.price}}</p>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <EditPost :item="item" :index="index"/>
                                <DeletePost :item="item" :index="index"/>
                            </v-card-actions>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>  
        </template>
    </v-container>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import moment from 'moment'
import EditPost from '../user/manageData/EditPost'
import DeletePost from '../user/manageData/DeletePost'

export default {
    name: 'tesmypost',
    components: {
        EditPost,
        DeletePost,
    },
    data(){
        return{
            isLoading: true,
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

<style scoped>


</style>