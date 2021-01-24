<template>
    <v-card>
        <v-form
        ref="form"
        >
            <v-card-text>
            <v-alert 
                color="error" 
                type="error" 
                :value="registerAlert"
                transition="slide-y-transition">
                Gagal Daftar, Coba lagi!
            </v-alert>
            <v-text-field
            v-model="username"
            label="Name"
            outlined
            ></v-text-field>
            <v-text-field
            v-model="email"
            label="E-mail"
            :rules="emailRules"
            outlined
            ></v-text-field>
            <v-text-field
            v-model="password"
            label="Password"
            :rules="passwordRules"
            outlined
            :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            @click:append="clickPassword"
            ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn
                text dark class="orange lighten-2"
                @click="clickRegister"
                :loading="isLoading"
                >
                Register
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            email: '',
            password: '',
            showPassword: false,
            registerAlert: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => (v && v.length >= 8) || 'Password must be more than 7 characters'
            ],
            isLoading: false
            
        }
    },
    methods: {
        async clickRegister(){
            if (this.$refs.form.validate()){
                this.isLoading = true
                await this.$store.dispatch('register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                this.$store.state.welcomeNotif = true
            }
        },
        clickPassword(){
            this.showPassword = !this.showPassword
        },
    },
}
</script>

<style>

</style>