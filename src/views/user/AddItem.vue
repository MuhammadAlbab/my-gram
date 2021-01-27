<template>
    <v-dialog
    v-model="dialog"
    persistent 
    width="600px">
    <template v-slot:activator="{on}">
        <v-btn
        v-on="on"
        color="orange">
        Add New Item
        </v-btn>
    </template>
        <v-card>
            <v-card-title>
                Add New Item
            </v-card-title>
            <v-card-text>
                <v-form
                v-model="valid" 
                lazy-validation 
                ref="form">
                    <v-text-field
                    v-model="name"
                    label="Name"
                    ></v-text-field>
                    <v-text-field
                    v-model="description"
                    label="Description"
                    ></v-text-field>
                    <v-text-field
                    v-model="price"
                    label="Price"
                    ></v-text-field>
                    <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    label="Select Image"
                    v-model="file"
                    show-size
                    ></v-file-input>
                    <v-card-actions class="justify-center">
                        <v-btn
                            elevation="2"
                            color="primary"
                            @click="storeItem"
                            :loading="isLoading">
                            Submit
                        </v-btn>
                        <v-btn
                            @click="dialog = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { itemsCollection, auth, storage} from '../../firebase'
export default {
    name: 'ItemsForm',
    data() {
        return {
            name: '',
            description: '',
            price: '',
            file: null,
            oldImage: '',
            isLoading: false,
            valid: false,
            dialog: false
        }
    },
    computed: {
        ...mapActions(['getItemsByUser'])
    },
    methods: {
        resetForm(){
            this.$refs.form.reset()
        },

        async storeItem(){
            try {
                this.isLoading = false
                const fileRef = 'uploads/items/' + this.file.name
                await storage.ref(fileRef).put(this.file)
                let data = {
                    userId: auth.currentUser.uid,
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    image: fileRef
                }
                await itemsCollection.add(data)
                this.resetForm()
                this.isLoading = false
                this.dialog = false
                await this.getItemsByUser
            }catch(error){
                console.log(error);
            }
        },
    },
    
    mounted(){
        
    },
}
</script>

<style>

</style>