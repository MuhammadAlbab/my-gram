<template>
    <v-card>
        <v-container class="text-center orange lighten-2">
            <div class="body-1">Or use the demo account instead</div>
            <div class="headline">Demo Account:</div>
            <div class="body-1">E-mail: demo@demo.com</div>
            <div class="body-1">Password: demo12345</div>
        </v-container>
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
            :rules="usernameRules"
            outlined
            ></v-text-field>
            <v-textarea
            v-model="bio"
            label="Bio"
            :rules="bioRules"
            placeholder="Tell us a little bit about your self"
            outlined
            ></v-textarea>
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
            <v-card-actions class="justify-center pt-0">
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
            bio: '',
            email: '',
            password: '',
            showPassword: false,
            registerAlert: false,
            usernameRules: [
                v => (v && v.length >= 5) || 'Username must be atleast 5 or more characters'
            ],
            bioRules: [
                v => (v && v.length >= 20) || 'Bio must be atleast 20 or more characters'
            ],
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
                    bio: this.bio,
                    email: this.email,
                    password: this.password,
                })
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