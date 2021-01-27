<template>
    <v-dialog
    v-model="dialog"
    max-width="400">
        <template v-slot:activator="{on}">
            <v-btn
            text
            v-on="on"
            color="error">
            Delete
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">
                Delete item?
            </v-card-title>
            <v-card-text>
                Are you sure you want to delete <b> {{item.name}}</b> ?
            </v-card-text>
            <v-card-actions>
                <v-btn text color="red" @click="deleteItem">
                    Delete
                </v-btn>
                <v-btn @click="dialog = false" text color="secondary"> 
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { storage, itemsCollection } from '../../firebase'
import { mapActions } from 'vuex'
export default {
    name: 'DeleteItem',
    components: {

    },
    props: ['item', 'index'],
    data(){
        return {
            dialog: false,
        }
    },
    computed: {
        ...mapActions(['getItemsByUser']),
    },
    methods: {
        
        async deleteItem(){
            try {
                //delete from cloud firestore 
                let pId = this.item.id
                await itemsCollection.doc(pId).delete()
                //delete from storage
                let pImg = this.item.img
                await storage.ref(pImg).delete()
                this.dialog = false
                alert('Item is deleted')
                await this.getItemsByUser
            } catch (error) {
                console.log(error);
            }
        }
    },
    created(){
        
    }
}
</script>