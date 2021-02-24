<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
                class="text-center"
            >
                <h1>Explore Page</h1>
            </v-col>
        </v-row>
        <template v-if="allItems.length == 0">
            <v-row align="center" justify="center">
                <v-col
                    class="text-center"
                >
                    <v-progress-circular
                        :size="50"
                        color="orange"
                        indeterminate
                    >
                    </v-progress-circular>
                </v-col>
            </v-row>
        </template>
        <template v-else> 
            <v-row
                align="center"
                justify="center"
            >
                <v-col>
                    <v-card
                        class="d-flex flex-wrap justify-space-around"
                        flat
                        tile
                    >
                        <v-card v-for="(item, index) in allItems" :key="item.id"
                        class="ma-2"
                        >
                            <v-img 
                            v-if="item.image"
                            height="400"
                            width="400"
                            :src="item.image"
                            class="white--text align-start"
                            lazy-src="https://via.placeholder.com/400">
                                <v-card-title>
                                    {{item.name | trimLengthName}}
                                </v-card-title>
                                <v-card-subtitle class="white--text">
                                    {{item.createdOn | formatDate}}
                                </v-card-subtitle>
                            </v-img>
                            <v-card-actions class="pl-0">
                                <v-list-item class="grow">
                                    <v-list-item-avatar color="grey darken-3">
                                        <template v-if="item.avatar !== ''">
                                            <v-img
                                            class="elevation-6"
                                            alt="Avatar"
                                            :src="item.avatar"
                                            ></v-img>
                                        </template>
                                        <template v-else>
                                            <v-img
                                            class="elevation-6"
                                            alt="Avatar"
                                            :src="defaultAvi"
                                            ></v-img>
                                        </template>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{item.author}}
                                        </v-list-item-title>
                                    </v-list-item-content>

                                    <v-row
                                        align="center"
                                        justify="end"
                                    >
                                        <v-btn 
                                            icon
                                            @click="moreDetails = index"
                                        >
                                            ...
                                        </v-btn>
                                        <v-btn
                                            icon
                                            @click="likeButton(item.id, item.likes, index)"
                                            :color="(item.likedItems.itemId == item.id) ? 'orange' : ''"
                                            :disabled="isDisabled"
                                        >
                                            <v-icon>mdi-heart</v-icon>
                                            <v-list-item-action-text>
                                                {{item.likes}}
                                            </v-list-item-action-text>
                                        </v-btn>
                                    </v-row>
                                </v-list-item>
                            </v-card-actions>
                            <v-expand-transition>
                                <v-card
                                v-show="moreDetails == index"
                                class="transition-fast-in-fast-out v-card--moreDetails">
                                    <v-card-text class="mb-0 pb-0">
                                        <p class="display-1 text--primary mb-0 pt-0">{{item.name}}</p>
                                        <p class="mb-1">{{item.description | trimLengthDesc}}</p>
                                        <p><a :href="item.image" target="_blank">Full Size Image</a></p>
                                        <p class="mb-0 pb-0">Posted by: {{item.author}}</p>
                                    </v-card-text>
                                    <v-card-actions class="justify-end mt-0 pt-0">
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
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
    name: 'LatestArt',
    data(){
        return{
            moreDetails: -1,
            isDisabled: false,
            defaultAvi: require('@/assets/dummy-avatar.jpg'),
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
            if (val.length < 200) { return val }
            return `${val.substring(0, 200)}...`
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

    .v-card--moreDetails {
        /* height: 100%; */
        width: 100%;
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
    }
</style>