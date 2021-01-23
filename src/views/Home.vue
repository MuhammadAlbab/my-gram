<template>
  <div class="home">
    <!--  -->
    <!--  -->
    <section>
      <v-parallax :src="imageLink.main" height="550">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center" style="font-weight: 900; text-shadow: 3px 2px orange">It's time to monetize your creativity</h1>
          <div class="white--text subheading mb-3 text-center" style="font-weight: 900; text-shadow: 2px 2px orange">Unleash your creativity without limitations</div>
          <v-dialog
          v-model="$store.state.registerDialog"
          transition="dialog-bottom-transition"
          max-width="400"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              class="orange lighten-1 mt-5" dark large
              v-bind="attrs"
              v-on="on"
              >Get Started</v-btn>
            </template>
            <RegisterDialog />
          </v-dialog>
          
        </v-layout>
      </v-parallax>
    </section>
    <!--  -->
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <v-container> 
            <div class="text-center">
              <h2 class="headline">Sell-Art is the best way to share your amazing works</h2>
              <span class="subheading">
                No restrictions, no limits
              </span>
            </div>
          </v-container>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex 
              v-for="item in arrSellArt" :key="item.id"
              xs12 md3>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="orange--text text--lighten-2">{{item.logo}}</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">{{item.title}}</div>
                  </v-card-title>
                  <v-card-text>
                    {{item.content}}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <!--  -->
    <section>
      <v-parallax :src="imageLink.main" height="300">
        <v-layout column align-center justify-center>
          <h1 class="white--text mb-3 text-center" style="font-weight: 900; text-shadow: 2px 2px orange">Sell-Art is a platform that allows everyone to show off their creativity</h1>
          <div class="white--text subheading mb-3 text-center" style="font-weight: 500; text-shadow: 2px 2px orange">With the power of SellArt you don't have to be famous to be able to sell your art</div>
        </v-layout>
      </v-parallax>
    </section>
    <!--  -->
    <section>
      <v-container>
        <v-layout>
          <v-flex xs12 class="text-center">
              <img height="200px" :src="imageLink.logo">
              <h1>Sell-Art</h1>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex 
          v-for="item in arrSocmed" :key="item.id"
          xs12 sm2 md1 
          class="text-center">
            <v-card class="elevation-0 transparent">
              <v-icon x-large class="orange--text text--lighten-2">{{item.logo}}</v-icon>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex 
          v-for="item in arrLast" :key="item.id"
          xs12 sm5>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">{{item.title}}</div>
              </v-card-title>
              <v-card-text>
                {{item.content}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
      imageLink: {
        main: require('@/assets/first.jpg'),
        logo: require('@/assets/logo-bar.png'),
      },
      arrSellArt: [
        {id:1, logo: 'mdi-creation', title: 'Create your original work', content: 'Create your original work, Lorem ipsum dolor sit amet consectetur adipisicing elit. At libero dicta ab consequatur dolore ex unde natus voluptatibus eveniet nam animi, obcaecati amet quod eligendi. Doloremque perferendis cum odio dicta laudantium, hic autem ullam sint.'},
        {id:2, logo: 'mdi-earth', title: 'Share to the world', content: 'Show your stuff to the whole community of SellArt not only to your mum or your friends. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio laboriosam optio temporibus consectetur quibusdam? Beatae deserunt ipsa inventore voluptates laudantium.'},
        {id:3, logo: 'mdi-account-search', title: 'Find another artist works', content: 'You can find another artists works, Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum, dolorum, porro minus aperiam ipsam ullam, corporis repellat sapiente sequi incidunt exercitationem veniam et accusantium.'},
        {id:4, logo: 'mdi-currency-usd', title: 'Get paid', content: 'Get paid from your hobby is the best thing, Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum, dolorum, porro minus aperiam ipsam ullam, corporis repellat sapiente sequi incidunt exercitationem veniam et accusantium.'},
      ],
      arrSocmed: [
        {id:1, name: 'Youtube', logo: 'mdi-youtube'},
        {id:2, name: 'Instagram', logo: 'mdi-instagram'},
        {id:3, name: 'Twitter', logo: 'mdi-twitter'},
        {id:4, name: 'Linkedin', logo: 'mdi-linkedin'},
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
