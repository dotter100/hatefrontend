<template>
    <div>


        <div class="wrapper fadeInDown">
            <h1>Create Portfolio</h1>
            <div id="formContent">
                <!-- Tabs Titles -->

                <!-- Icon -->
                <div class="fadeIn first">
                    <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
                </div>



                <form class="" method="post" @submit.prevent="dopost">
                    <input type="text" v-model="portfolio.name" id="name" class="fadeIn second" name="Portfolioname" placeholder="Portfolio name">
                    <input type="submit" class="fadeIn fourth" value="Create portfolio">
                </form>


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
                portfolio:{
                stocks: [],
                name: ""
            }
            }
        },
        methods: {
            dopost: function () {
                axios.post(`http://localhost:8080/JEAORM/API/Portfolio/add`, this.portfolio,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        if(response.status.valueOf() === 200) {
                            alert("succesfull")
                            this.$router.push('/Portfolio')
                        }
                        else {
                            alert("Something when wrong!")
                        }
                    })
                    .catch(function (error) {
                        alert("No rights");
                    })
            }
        }
    }
</script>
