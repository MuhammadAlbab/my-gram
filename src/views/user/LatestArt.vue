<template>
  <v-container>
    <v-row
    class="text-center">
        <v-col
        cols="12">
            <h1>Latest Arts for you!</h1>
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
    <div>
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
                class="white--text align-start"
                lazy-src="https://via.placeholder.com/400">
                <v-card-title>
                    {{item.name}}
                </v-card-title>
                </v-img>
                <v-card-actions>
                    <v-btn 
                    text
                    @click="moreDetails = index">
                        More details
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn 
                    icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn 
                    icon>
                        <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-expand-transition>
                    <v-card
                    v-show="moreDetails == index"
                    class="transition-fast-in-fast-out v-card--moreDetails"
                    
                    >
                        <v-card-text>
                            <p class="display-1 text--primary">{{item.name}}</p>
                            <p>{{item.description}}</p>
                            <p>Rp.{{item.price}}</p>
                            <p>Posted by: {{item.author}}</p>
                            <p><a :href="item.image" target="_blank">Full Size Image</a></p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
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
    </div>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'LatestArt',
    data(){
        return{
            moreDetails: -1,
        }
    },
    computed:{
        ...mapState(['allItems'])
    },
    methods: {
        ...mapActions(['getAllItems']),
    },
    async created(){
        await this.getAllItems()
    }
}
</script>

<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }

    .v-card--moreDetails {
        /* height: 100%; */
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
    }
</style>