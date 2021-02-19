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
            Edit Profile
        </v-btn>
        </template>
        <v-card>
            <v-card-title>
                Edit Your Profile
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                >
                    <v-text-field
                    outlined
                    v-model="username"
                    :rules="usernameRules"
                    label="Name"
                    ></v-text-field>
                    <v-textarea
                    outlined
                    v-model="bio"
                    :rules="bioRules"
                    name="input-7-1"
                    label="Bio"
                    ></v-textarea>
                    <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    label="Change Profile Picture"
                    v-model="file"
                    show-size
                    ></v-file-input>
                    <p>Current Image: <a v-if="oldImage" :href="oldImage" target="_blank">Here</a></p>
                    <v-card-actions class="justify-center">
                        <v-btn
                        dark
                        elevation="2"
                        color="orange"
                        @click="updateProfile"
                        :loading="isLoading">
                        Update
                        </v-btn>
                        <v-btn
                        dark
                        color="red"
                        @click="dialog = !dialog">
                        Close
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import {auth, storage, usersCollection} from '@/firebase'
export default {
    name: 'EditProfile',
    components: {

    },
    data() {
        return {
            username: localStorage.getItem('username'),
            usernameRules: [
                v => (v && v.length >= 5) || 'Username must be more than 5 characters'
            ],
            bio: localStorage.getItem('bio'),
            bioRules: [
                v => (v && v.length >= 20) || 'Bio must be more than 20 characters'
            ],
            oldImage: localStorage.getItem('oldImage'),
            file: null,
            dialog: false,
            valid: false,
            isLoading: false,
        }
    },
    computed: {
        ...mapState(['userProfile']),
    },
    methods: {
        async updateProfile(){
            if (this.$refs.form.validate()){
                try {
                    this.isLoading = true
                    let data = {
                        username: this.username,
                        bio: this.bio,
                    }
                    if (this.file) {
                        const userId = auth.currentUser.uid
                        const getUser = await usersCollection.doc(userId).get()
                        const fileRefOld = getUser.data().avatar
                        if (fileRefOld === ''){
                            //upload new image
                            const fileRef = 'uploads/avatars/' + this.file.name
                            await storage.ref(fileRef).put(this.file)
                            data.avatar = fileRef
                        }else{
                            // delete old image
                            const fileRefOld = getUser.data().avatar
                            await storage.ref(fileRefOld).delete()

                            //upload new image
                            const fileRef = 'uploads/avatars/' + this.file.name
                            await storage.ref(fileRef).put(this.file)
                            data.avatar = fileRef
                        }

                    } else {
                        let img = ''
                        img = await usersCollection.doc(auth.currentUser.uid).get()
                        data.avatar = img.data().avatar
                    }
                    store.dispatch('updateProfile', data)
                    await usersCollection.doc(auth.currentUser.uid).update(data)
                    this.isLoading = false
                    this.dialog = false
                    alert('Profile Updated')
                }catch(error){
                    console.log(error);
                } 
            }
        },
    }, 
}
</script>

<style>

</style>