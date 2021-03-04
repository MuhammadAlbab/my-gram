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
                    ref="form"
                >
                    <v-text-field
                        outlined
                        v-model="name"
                        label="Name"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-textarea
                        outlined
                        v-model="description"
                        label="Description"
                        :rules="descRules"
                        @keyup.enter="storeItem"
                    ></v-textarea>
                    <v-file-input
                        prepend-icon="mdi-camera"
                        accept="image/*"
                        label="Select Image"
                        v-model="file"
                        show-size
                        :rules="imageRules"
                        @keyup.enter="storeItem"
                    ></v-file-input>
                    <v-card-actions class="justify-center">
                        <v-btn
                            dark
                            elevation="2"
                            color="orange"
                            @click="storeItem"
                            :loading="isLoading"
                        >
                            Submit
                        </v-btn>
                        <v-btn
                            dark
                            color="red"
                            @click="dialog = false"
                        >
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
            valid: false,
            name: '',
            description: '',
            file: null,
            isLoading: false,
            dialog: false,
            nameRules: [
                v => !!v || 'Item name is required',
                v => v.length >= 5 || 'Item name must be atleast 5 or more characters'
            ],
            descRules: [
                v => !!v || 'Item description is required',
                v => v.length >= 20 || 'Item description must be atleast 20 or more characters'
            ],
            imageRules: [
                v => !!v || 'Image is required',
            ],
        }
    },
    computed: {
        ...mapActions(['getItemsByUser'])
    },
    methods: {

        async storeItem(){
            if (this.$refs.form.validate()){
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
            }
        },
    },
    
    mounted(){
        
    },
}
</script>

<style>

</style>