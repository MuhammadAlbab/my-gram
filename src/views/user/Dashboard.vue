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
            <ItemsForm @item:added="addItem"/>
        </v-row>
        <!--  -->
        <v-row>
            <v-dialog
            v-model="deleteDialog"
            max-width="400">
                <v-card>
                    <v-card-title class="headline">
                        Delete item?
                    </v-card-title>
                    <v-card-text>
                        Are you sure you want to delete <b> {{pName}}</b> ?
                    </v-card-text>
                        <v-card-actions>
                            <v-btn text color="red" @click="deleteItem">
                                Delete
                            </v-btn>
                            <v-btn @click="deleteDialog = false" text color="secondary"> 
                                Close
                            </v-btn>
                        </v-card-actions>
                </v-card>
            </v-dialog>
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
                    <p class="subtittle-1">{{item.description}}</p>
                    <p class="subtittle-1">{{item.price}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <ItemsForm :item="item" :index="index" @item:updated="updateItem"/>
                    <v-btn color="red" @click="deleteConfirm(item.id, item.name)" text>Delete</v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import {auth, storage, itemsCollection} from '../../firebase'
import ItemsForm from '../user/ItemsForm'

export default {
    name: 'Dashboard',
    components: {
        ItemsForm,
    },
    data(){
        return{
            items: [],
            index: '',
            pId: null,
            pName: null,
            deleteDialog: false,
        }
    },
    computed: {
    ...mapState(['userProfile'])
    },
    methods: {
        async addItem(doc){
            let img = ''
            if (doc.image){
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.items.push({
                id: doc.id,
                name: doc.name,
                description: doc.description,
                price: doc.price,
                image: img,
                img: doc.image
            })
        },
        async updateItem(doc){
            let img = ''
            if (doc.image){
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.items.splice(doc.index, 1,{
                id: doc.id,
                name: doc.name,
                description: doc.description,
                price: doc.price,
                image: img,
                img: doc.image
            })
        },
        async getItems(){
            try {
                const querySnapShot = await itemsCollection.where('userId', '==', auth.currentUser.uid).get()
                querySnapShot.forEach( async (doc) => {
                    let img = ''
                    if (doc.data().image){
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    this.items.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price,
                        image: img,
                        img: doc.data().image
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
        async deleteConfirm(id, name){
            this.deleteDialog = true
            this.pId = id
            this.pName = name
        },
        async deleteItem(){
            try {
                await itemsCollection.doc(this.pId).delete()
                alert('Item is deleted')
                this.items.splice(this.items.findIndex(element => element.id == this.pId), 1)
                this.deleteDialog = false
                this.pId = null
                this.pName = null
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted(){
        await this.getItems()
    }
}
</script>