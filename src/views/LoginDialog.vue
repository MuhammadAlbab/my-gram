<template>
    <v-card>
        <v-container class="text-center orange lighten-2">
            <div class="headline">Demo Account:</div>
            <div class="body-1">E-mail: demo@demo.com</div>
            <div class="body-1">Password: demo12345</div>
        </v-container>
        <v-form
        ref="form"
        >
            <v-alert 
                color="error" 
                type="error" 
                :value="loginAlert"
                transition="slide-y-transition">
                Maaf anda belum terdaftar, lakukan register terlebih dahulu! atau pastikan data yang anda masukan benar!
            </v-alert>
            <v-card-text class="pb-0">
            <v-text-field
            v-model="email"
            label="E-mail"
            outlined
            :rules="emailRules"
            ></v-text-field>
            <v-text-field
            v-model="password"
            label="Password"
            outlined
            :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            @click:append="clickPassword"
            ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center pt-0">
                <v-btn
                text dark class="orange lighten-2"
                @click="clickLogin"
                :loading="isLoading"
                >
                Login
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            showPassword: false,
            loginAlert: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            isLoading: false
            
        }
    },
    methods: {
        async clickLogin(){
            try {
                if (this.$refs.form.validate()){
                    this.isLoading = true
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password,
                    })
                }
            } catch (error) {
                this.loginAlert = true
                this.isLoading = false
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