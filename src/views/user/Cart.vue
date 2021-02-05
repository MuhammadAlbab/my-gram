<template>
    <div>
        <div v-for="cartItem in cartItems" :key="cartItem.id">
            <p>{{cartItem.name}}</p>
            <p>Rp.{{cartItem.price}}</p>
            <img :src="cartItem.image" alt="image" height="200" width="200">
        </div>
        <p>Total Harga: Rp.{{totalPrice}}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Cart',
    computed: {
        ...mapState(['cartItems']),
        totalPrice(){
            return this.cartItems.reduce((prev, cur) => parseInt(prev) + parseInt(cur.price), 0);
        }
    },
    methods: {
        ...mapActions(['getCartItems'])
    },
    data(){
        return{

        }
    },
    async created(){
        await this.getCartItems()
    }
}
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>