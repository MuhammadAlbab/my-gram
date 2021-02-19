<template>
  <v-container class="fill-height">
    <template v-if="itemsByUser.length == 0">
        <v-row align="center" justify="center">
            <v-progress-circular
                :size="50"
                color="orange"
                indeterminate
            >
            </v-progress-circular>
        </v-row>
    </template>
    <template v-else>
        <v-row
        align="center"
        justify="center">
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
                        <EditItem :item="item" :index="index"/>
                        <DeleteItem :item="item" :index="index"/>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-row>  
    </template>
</v-container>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import moment from 'moment'
import EditItem from '../user/manageData/EditItem'
import DeleteItem from '../user/manageData/DeleteItem'

export default {
    name: 'tesmypost',
    components: {
        EditItem,
        DeleteItem,
    },
    data(){
        return{
            
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

<style>

</style>