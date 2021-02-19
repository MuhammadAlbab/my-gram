<template>
  <v-app>
    <Navbar />
    <v-main>
        <v-navigation-drawer
            v-model="$store.state.cartDrawer"
            absolute
            right
            temporary
        >
        </v-navigation-drawer>
        <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',

  components: {
    Navbar,

  },

  computed: {
  },
  data: () => ({
    //
  }),
};
</script>

<style>

</style>
