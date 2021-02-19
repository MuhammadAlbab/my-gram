<template>
  <v-container>
    <v-row
    class="text-center">
        <v-col
        cols="12">
            <h1>Explore Page</h1>
        </v-col>
        <v-col
        cols="12">
            <v-progress-circular v-if="allItems.length == 0"
            :size="50"
            color="orange"
            indeterminate
            ></v-progress-circular>
        </v-col>
    </v-row>
    <template>
        <v-card
        class="d-flex flex-wrap justify-space-around"
        flat
        tile>
            <v-card v-for="(item, index) in allItems" :key="item.id"
            class="ma-2"
            >
                <v-img 
                v-if="item.image"
                height="400"
                width="400"
                :src="item.image"
                class="white--text align-end"
                lazy-src="https://via.placeholder.com/400">
                <v-card-title>
                    {{item.name | trimLengthName}}
                </v-card-title>
                <v-card-subtitle class="white--text">
                    {{item.createdOn | formatDate}}
                </v-card-subtitle>
                </v-img>
                <v-card-actions>
                    <v-btn 
                    text
                    @click="moreDetails = index">
                        More details
                    </v-btn>
                    <v-spacer> </v-spacer>
                    <v-list-item-action-text>
                        {{item.likes}}
                    </v-list-item-action-text>
                    <v-btn
                    icon
                    @click="likeButton(item.id, item.likes, index)"
                    :color="(item.likedItems.itemId == item.id) ? 'orange' : ''"
                    :disabled="isDisabled">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-expand-transition>
                    <v-card
                    v-show="moreDetails == index"
                    class="transition-fast-in-fast-out v-card--moreDetails">
                        <v-card-text>
                            <p class="display-1 text--primary">{{item.name}}</p>
                            <p>{{item.description | trimLengthDesc}}</p>
                            <p>Posted by: {{item.author}}</p>
                            <p><a :href="item.image" target="_blank">Full Size Image</a></p>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn
                            text
                            dark
                            color="red"
                            @click="moreDetails = -1">
                            Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-expand-transition>
            </v-card>
        </v-card>
    </template>
    </v-container>
</template>

<script>
// import {auth} from'../../firebase'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
    name: 'LatestArt',
    data(){
        return{
            moreDetails: -1,
            isDisabled: false,
        }
    },
    computed:{
        ...mapState(['allItems']),
    },
    methods: {
        ...mapActions(['getAllItems', 'likeItem']),

        async likeButton(id, likesCount, index){
            this.isDisabled = true
            await this.likeItem({id,likesCount,index})
            this.isDisabled = false
        },
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
        await this.getAllItems()
    },
    
}
</script>

<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }

    .v-card--moreDetails {
        /* height: 100%; */
        width: 100%;
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
    }
</style>