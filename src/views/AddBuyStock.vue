<template>
    <div>


        <div class="wrapper fadeInDown">
            <h1>ADD stock to Portfolio</h1>
            <div id="formContent">
                <!-- Tabs Titles -->

                <!-- Icon -->
                <div class="fadeIn first">
                    <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
                </div>



                <form class="" method="post" @submit.prevent="dopost">
                    <div class="form-group">
                        <label>Stocks</label>
                        <select class="form-control" v-model="buystock.stock"  style="margin-left: 8%; width:84%" placeholder="Portfolio">
                            <option v-for="option in Stocks" v-bind:value="option">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Portfolio</label>
                    <select class="form-control" v-model="Portfolio" style="margin-left: 8%; width:84%" placeholder="Portfolio">
                        <option v-for="option in Portfolios" v-bind:value="option">
                            {{ option.name }}
                        </option>
                    </select>
                    </div>
                    <div class="form-group">
                        <label style="padding-right: 10%">Buy price</label>
                    <input style="width: 10%" type="number" v-model="buystock.buyPrice" id="Price"  name="price" placeholder="Buyprice">
                    </div>
                    <div class="form-group">
                        <label style="padding-right: 10%">Amount</label>
                    <input style="width: 10%" type="number" v-model="buystock.amount" id="amount" class="in" name="price" placeholder="Amount">
                    </div>

                        <input type="submit" class="fadeIn fourth" value="Add Stock">
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
                Portfolios:[],
                Stocks:[],
                errors: [],
                buystock: {
                    stock: null,
                    buyPrice: 0,
                    amount: 0
                },
                Portfolio: null
            }
        },
        mounted () {
            axios.get(`http://desktop-354os6s:8080/JEAORM/API/Stocks`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.Stocks = response.data;
                })
                .catch(function (error) {
                    alert("No rights");
                })

            axios.get(`http://desktop-354os6s:8080/JEAORM/API/Portfolio`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.Portfolios = response.data;

                })
                .catch(function (error) {
                    alert("No rights");
                })
        },
        methods: {
            dopost: function () {

                this.Portfolio.stocks.push(this.buystock);

                axios.post(`http://desktop-354os6s:8080/JEAORM/API/Portfolio/Update`, this.Portfolio,
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
