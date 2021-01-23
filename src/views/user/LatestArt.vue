<template>
  <v-container>
      <h1>Latest Arts for you!</h1>
      <p v-if="items.length == 0">Sorry, no arts found!</p>
      <v-col 
        sm="4"
        md="6">
        <v-card
        v-for="item in items" :key="item.id">
            <v-img 
            v-if="item.image"
            height="250"
            :src="item.image"
            lazy-src="https://via.placeholder.com/250">
            </v-img>
            <v-card-title>
                {{item.name}}
            </v-card-title>
            <v-card-text>
                <p class="body-1">{{item.description}}</p>
                <p class="body-1">{{item.price}}</p>
                <p class="body-1">Posted by: {{item.author}}</p>
            </v-card-text>
            <v-btn block dark color="orange lighten-2">See more details</v-btn>
        </v-card>
        </v-col>
  </v-container>
</template>

<script>
import { storage, itemsCollection, usersCollection } from '../../firebase'
export default {
    name: 'LatestArt',
    data(){
        return{
            items: [],
        }
    },
    methods: {
        async getItems(){
            try {
                const querySnapShot = await itemsCollection.get()
                querySnapShot.forEach( async (doc) => {
                    let img = ''
                    if (doc.data().image){
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    const authorQuery = await usersCollection.doc(doc.data().userId).get()
                    this.items.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price,
                        image: img,
                        img: doc.data().image,
                        author: authorQuery.data().username
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted(){
        await this.getItems()
    }
}
</script>

<style>

</style>