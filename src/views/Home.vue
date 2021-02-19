<template>
  <div class="home">
    <!--  -->
    <section>
      <v-parallax :src="imageLink.main" height="550">
        <v-container class="white--text">
          <v-row
            align="center"
            justify="center"
          >
            <v-col 
              cols="12"
              class="ma-0 pa-0"
            >
              <div 
                class="display-2 text-center" 
                style="font-weight: 900; text-shadow: 3px 2px orange"
              >
                MyGram
              </div>
            </v-col>
            <v-col 
              cols="12"
              class="mt-0 pt-0 mb-5 pb-0"
            >
              <div 
                class="display-1 text-center" 
                style="font-weight: 900; text-shadow: 3px 2px orange"
              >
                Share your best moment to the world
              </div>
            </v-col>
            <v-btn
              dark
              @click="registerDialog = !registerDialog" 
              color="orange lighten-2"
            >
              Get Started
            </v-btn>
          </v-row>
          <v-dialog
          v-model="registerDialog"
          transition="dialog-bottom-transition"
          max-width="400"
          >
            <RegisterDialog />
          </v-dialog>
        </v-container>
      </v-parallax>
    </section>
    <!--  -->
    <section>
      <v-container class="my-5"> 
        <v-row
          align="center"
          justify="center"  
        >
          <v-col
            cols="12"
          >
            <div class="text-center">
                <h2 class="headline">
                  MyGram is the best place to share your best moments. Share with us!
                </h2>
                <span class="subheading">
                  No restrictions, no limits
                </span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="4"
            v-for="item in arrSellArt" :key="item.id"
          >
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-center pb-0">
                <v-icon x-large class="orange--text text--lighten-2">{{item.logo}}</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">{{item.title}}</div>
              </v-card-title>
              <v-card-text class="text-justify">
                {{item.content}}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!--  -->
    <section>
      <v-parallax :src="imageLink.main" height="300">
        <v-container>
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              class="ma-0 pa-0"
            >
              <h1 
                class="white--text text-center" 
                style="font-weight: 900; text-shadow: 2px 2px orange"
              >
                MyGram is a platform that allows everyone to share their best moments!
              </h1>
            </v-col>
            <v-col
              cols="12"
              class="ma-0 pa-0"
            >
              <div 
                class="white--text subheading text-center" 
                style="font-weight: 500; text-shadow: 2px 2px orange"
              >
                With the power of MyGram you don't have to be famous to be able to get likes on your pics, lol :D
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>
    <!--  -->
    <section>
      <v-container>
        <v-row>
          <v-col
            cols="12" 
            class="text-center"
          >
            <img height="200px" :src="imageLink.logo">
            <h1>MyGram</h1>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row 
          justify="center"
        >
          <v-col 
            v-for="item in arrSocmed" :key="item.id"
            cols="12"
            sm="1"
            md="1"
            class="text-center"
          >
            <v-card 
              class="elevation-0 transparent" 
              link :href="item.link"
              target="_blank"
            >
              <v-icon x-large class="orange--text text--lighten-2">{{item.logo}}</v-icon>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row 
          justify="center"
        >
          <v-col 
            v-for="item in arrLast" :key="item.id"
            cols="12"
            sm="5"
          >
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">{{item.title}}</div>
              </v-card-title>
              <v-card-text>
                {{item.content}}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!--  -->
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterDialog from '@/views/RegisterDialog.vue'

export default {
  name: 'Home',
  components: {
    RegisterDialog
  },
  data(){
    return {
      registerDialog: false,
      imageLink: {
        main: require('@/assets/first.jpg'),
        logo: require('@/assets/logo-bar.png'),
      },
      arrSellArt: [
        {id:1, logo: 'mdi-camera', title: 'Capture your moment', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis expedita dignissimos deleniti ullam quam consectetur beatae facilis? Eaque aliquid quae deleniti pariatur atque at soluta cupiditate nulla fugiat nesciunt dicta vero, numquam voluptatibus nemo eveniet aspernatur a maiores harum veniam!'},
        {id:2, logo: 'mdi-earth', title: 'Share to the world', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis expedita dignissimos deleniti ullam quam consectetur beatae facilis? Eaque aliquid quae deleniti pariatur atque at soluta cupiditate nulla fugiat nesciunt dicta vero, numquam voluptatibus nemo eveniet aspernatur a maiores harum veniam!'},
        {id:3, logo: 'mdi-account-search', title: 'Explore what other shares', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis expedita dignissimos deleniti ullam quam consectetur beatae facilis? Eaque aliquid quae deleniti pariatur atque at soluta cupiditate nulla fugiat nesciunt dicta vero, numquam voluptatibus nemo eveniet aspernatur a maiores harum veniam!'},
      ],
      arrSocmed: [
        {id:1, name: 'Youtube', logo: 'mdi-youtube', link: 'https://www.youtube.com/'},
        {id:2, name: 'Instagram', logo: 'mdi-instagram', link: 'https://www.instagram.com/'},
        {id:3, name: 'Twitter', logo: 'mdi-twitter', link: 'https://www.instagram.com/'},
        {id:4, name: 'Facebook', logo: 'mdi-facebook', link: 'https://www.instagram.com/'},
      ],
      arrLast: [
        {id:1, title: 'About Us', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum assumenda, repudiandae porro incidunt omnis maiores iure facere dolores quaerat nesciunt ipsum officiis aut ab error reiciendis eligendi voluptas deserunt id.'},
        {id:2, title: 'Be Our Partner', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi nostrum fugiat temporibus, assumenda esse numquam nihil provident tempore, excepturi sit dolore totam maiores beatae rerum in quisquam libero. Voluptate ipsum architecto earum minima placeat, perferendis tempora accusamus quo cupiditate blanditiis.'},
      ]
    }
  },
  computed: {
    
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
