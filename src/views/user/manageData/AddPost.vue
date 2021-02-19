<template>
    <v-dialog
    v-model="dialog"
    persistent 
    width="600px">
    <template v-slot:activator="{on}">
        <v-btn
            class="mr-0"
            color="orange"
            min-width="100"
            
            v-on="on"
            dark
        >
            Add New Post
        </v-btn>
    </template>
        <v-card>
            <v-card-title>
                Add New Post
            </v-card-title>
            <v-card-text>
                <v-form
                v-model="valid" 
                lazy-validation 
                ref="form">
                    <v-text-field
                    outlined
                    v-model="name"
                    label="Name"
                    ></v-text-field>
                    <v-textarea
                    outlined
                    v-model="description"
                    name="input-7-1"
                    label="Description"
                    ></v-textarea>
                    <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    label="Select Image"
                    v-model="file"
                    show-size
                    ></v-file-input>
                    <v-card-actions class="justify-center">
                        <v-btn
                        dark
                        elevation="2"
                        color="orange"
                        @click="storeItem"
                        :loading="isLoading">
                        Submit
                        </v-btn>
                        <v-btn
                        dark
                        color="red"
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
import { itemsCollection, auth, storage} from '../../../firebase'
export default {
    name: 'ItemsForm',
    data() {
        return {
            name: '',
            description: '',
            file: null,
            isLoading: false,
            valid: false,
            dialog: false
        }
    },
    computed: {
        ...mapActions(['getItemsByUser'])
    },
    methods: {

        async storeItem(){
            try {
                this.isLoading = true
                const fileRef = 'uploads/items/' + this.file.name
                await storage.ref(fileRef).put(this.file)
                let data = {
                    userId: auth.currentUser.uid,
                    name: this.name,
                    description: this.description,
                    createdOn: new Date(),
                    likes: 0,
                    image: fileRef
                }
                await itemsCollection.add(data)
                this.isLoading = false
                this.$refs.form.reset()
                this.dialog = false
                await this.getItemsByUser
                alert('Item added')
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