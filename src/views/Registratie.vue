<template>
    <div>


        <div class="wrapper fadeInDown">
            <h1>Registratie</h1>
            <div id="formContent">
                <!-- Tabs Titles -->

                <!-- Icon -->
                <div class="fadeIn first">
                    <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
                </div>

                <!-- Login Form -->

                <form class="" method="post" @submit.prevent="dopost">

                    <p>Two factor code</p>
                    <img v-bind:src="qrimage" />
                    <p>  {{secret.base32}}</p>
                    <!--<input type="text" v-model="" id="twofactor" class="fadeIn second" name="twofactor" placeholder="twofactor">-->
                    <input type="text" v-model="username" id="email" class="fadeIn second" name="login" placeholder="username">
                    <input type="password" v-model="password" id="password" class="fadeIn third" name="login" placeholder="password">
                    <input type="submit" class="fadeIn fourth" value="Sign up">
                </form>


                <!-- Remind Password -->

                <div id="formFooter">
                    <a class="underlineHover" ><router-link v-bind:to="'login'"> Login </router-link></a><br>
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
    var speakeasy = require('speakeasy');


    var secret = speakeasy.generateSecret({length: 20});
    var QRCode = require('qrcode');
    var qrimage;

    QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
        //console.log(image_data); // A data URI for the QR code image
        qrimage = image_data
    });








    export default {
        name: 'app',
        data () {
            return {
                username: '',
                password: '',
                errors: [],
                secret,
                qrimage
            }
        },
        methods: {
            dopost: function () {
                axios.post(`http://desktop-354os6s:8080/JEAORM/API/authentication/register`, qs.stringify({
                    'username': this.username,
                    'password': this.password,
                    'twofactor' : secret.base32
                }))
                    .then(response => {
                        localStorage.setItem('token', response.data);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>
