<template>
    <v-col>
        <v-btn
        v-if="!item"
        @click="dialog = !dialog" 
        color="orange">
            Add new item
        </v-btn>
        <v-btn
        v-else
        @click="dialog = !dialog; setData()"
        color="orange">
            Edit item
        </v-btn>
        <v-dialog 
        v-model="dialog" 
        persistent 
        width="600px">
            <v-card>
                <v-card-title v-if="!item">
                    Add new item
                </v-card-title>
                <v-card-title v-else>
                    Edit item
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
                        <p>current image: <a v-if="oldImage" :href="oldImage">link</a></p>
                        <v-card-actions class="justify-center">
                            <v-btn
                                v-if="!item"
                                elevation="2"
                                color="primary"
                                @click="storeItem"
                                :loading="isLoading">
                                Submit
                            </v-btn>
                            <v-btn
                                v-else
                                elevation="2"
                                color="primary"
                                @click="updateItem"
                                :loading="isLoading">
                                Update
                            </v-btn>
                            <v-btn
                                @click="closeBtn">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>
import { itemsCollection, auth, storage} from '../../firebase'
export default {
    name: 'ItemsForm',
    props: ['item', 'index'],
    data() {
        return {
            isLoading: false,
            valid: false,
            dialog: false,
            name: '',
            description: '',
            price: '',
            file: null,
            oldImage: ''
        }
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
            }catch(error){
                console.log(error);
            }
        },

        async updateItem(){
            try {
                this.isLoading = false

                let data = {
                    userId: auth.currentUser.uid,
                    name: this.name,
                    description: this.description,
                    price: this.price,
                }

                if (this.file) {
                    // delete oldImage
                    const fileRefOld = this.item.img
                    await storage.ref(fileRefOld).delete()

                    //upload file
                    const fileRef = 'uploads/items/' + this.file.name
                    await storage.ref(fileRef).put(this.file)
                    data.image = fileRef
                } else {
                    data.image = this.item.img
                }
                
                await itemsCollection.doc(this.item.id).update(data)
                this.resetForm()
                this.isLoading = false
                this.dialog = false
                data.index = this.index
                this.$emit('item:updated', data)
                alert('item updated')
            }catch(error){
                console.log(error);
            }  
        },

        closeBtn(){
            // this.resetForm()
            this.dialog = !this.dialog
        },

        setData(){
            if(this.item){
                this.name = this.item.name
                this.description = this.item.description
                this.price = this.item.price
                this.oldImage = this.item.image
            }
        }
    },
    
    mounted(){
        this.setData()
    }
}
</script>

<style>

</style>