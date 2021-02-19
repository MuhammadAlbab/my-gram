<template>
    <v-container>
        <v-row>
            <v-col
            cols="12"
            md="3">
                <v-card class="mt-4 text-center">
                    
                    <v-img
                        class="rounded-circle elevation-6 mt-n5 d-inline-block"
                        :src="(userProfile.avatar === '' ? defaultAvi : userProfile.avatar )" 
                        width="128"
                        height="128"
                    />
                    <v-card-text class="text-center">
                        <h4 class="text-h4 mb-3 text--primary">
                            {{userProfile.username}}
                        </h4>
                        <p class="text--secondary">
                            {{userProfile.bio}}
                        </p>
                        <EditProfile />
                        <div class="py-1"></div>
                        <AddPost />
                    </v-card-text>
                </v-card>
                <v-btn 
                    block dark 
                    class="mt-5" color="orange"
                    link to="/dashboard/"
                >
                    Explore
                </v-btn>
                <v-btn 
                    block dark 
                    class="mt-2" color="orange"
                    link to="/dashboard/mypost"
                >
                    My Post
                </v-btn>
                <v-btn 
                    block dark 
                    class="mt-2" color="orange"
                    link to="/dashboard/favorites"
                >
                    My Favorites
                </v-btn>
            </v-col>
            <v-col
                cols="12"
                md="9"
            >
                <router-view> </router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState} from 'vuex'
import AddPost from '@/views/user/manageData/AddPost'
import EditProfile from '@/views/user/manageData/EditProfile'

export default {
    name: 'Dashboard',
    components: {
        AddPost,
        EditProfile
    },
    data(){
        return{
            defaultAvi: require('@/assets/dummy-avatar.jpg'),
            
        }
    },
    computed: {
        ...mapState(['userProfile']),
    },
    methods: {
        
    },
    mounted(){

    }

}
</script>