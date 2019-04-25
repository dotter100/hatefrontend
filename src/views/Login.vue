<template>
    <div>


        <div class="wrapper fadeInDown">
            <h1>Login</h1>
            <div id="formContent">
                <!-- Tabs Titles -->

                <!-- Icon -->
                <div class="fadeIn first">
                    <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
                </div>

                <!-- Login Form -->
                <form class="" method="post" @submit.prevent="dopost">
                    <input type="text" v-model="username" id="email" class="fadeIn second" name="login" placeholder="username">
                    <input type="password" v-model="password" id="password" class="fadeIn third" name="login" placeholder="password">
                        <input type="text" v-model="verificationCode" id="verificationCode" class="fadeIn third" name="verificationCode" placeholder="verificationCode">
                    <input  type="submit" class="fadeIn fourth" value="Log In">
                </form>

                <!-- Remind Password -->

                <div id="formFooter">
                    <a class="underlineHover" ><router-link v-bind:to="'Registratie'">Maak nieuw account </router-link></a><br>
                    <a class="underlineHover" href="www.google.com">Wachtwoord vergeten</a>
                </div>

            </div>
        </div>
    </div>

</template>

<style>
    @import 'Login.css';
</style>
<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from 'axios';

    const qs = require('qs');
    export default {
        name: 'app',
        data () {
            return {
                username: '',
                password: '',
                errors: [],
                verificationCode: ''
            }
        },
        methods: {
            dopost: function () {
                axios.post(`http://localhost:8080/JEAORM/API/authentication`, qs.stringify({
                    'username': this.username,
                    'password': this.password,
                    'verificationCode' : this.verificationCode
                }))
                    .then(response => {
                        if(response) {
                            localStorage.setItem('token', response.data)
                            this.$router.push('/Stocks');
                        }
                    })
                    .catch(e => {
                        this.errors.push(e);
                        if (e.response) {
                            console.log(e.response.data);
                            console.log(e.response.status);
                            console.log(e.response.headers);
                            alert("Creditenails are incorrect")
                        }
                    })
            }
        }
    }
</script>
