<template>
    <div>
    <div class="col-md-5" style="float: left;">
        <h2>Portfolio's:<br></h2>
        <b-list-group style="margin: 5%">
            <b-list-group-item class="flex-column align-items-start" v-for="Portfolio in Portfolios" :key="Portfolio.id"  style="margin-bottom: 10px" v-on:click="loadPortfolio(Portfolio)" :class="{active:Portfolio.id == model.id}">
                <div class="d-flex w-100 justify-content-between" >
                    <h5 class="mb-1">{{Portfolio.name}} </h5>
                    <h6 name="Profit" Style="color: green" class="mb-1" v-if="Math.sign(CalcProfit(Portfolio)) == 1" > {{CalcProfit(Portfolio)}}% </h6>
                    <h6 name="Profit" Style="color: gray()" class="mb-1" v-else-if="Math.sign(CalcProfit(Portfolio)) == 0" > {{CalcProfit(Portfolio)}}% </h6>
                    <h6 name="Profit" Style="color: red" class="mb-1" v-else-if="Math.sign(CalcProfit(Portfolio)) == -1" > {{CalcProfit(Portfolio)}}% </h6>
                    </div>
            </b-list-group-item>
            <div>
            <router-link to="/AddPortfolio" style="float: left;">
                <button class="btn btn-primary" id="Portfolio">Add Portfolio</button>
            </router-link>
            <router-link to="/AddBuyStock" style="float: right;">
                <button class="btn btn-primary" id="addstocks">Add Stocks</button>
            </router-link>
            </div>
            <button v-on:click="RemoveProfile" class="btn btn-danger" id="RemovePortfolio">RemovePortfolio</button>
        </b-list-group>


    </div>

            <div class="col-md-5" v-if="model !== null" style="float: left;">
                <h2>Portfolio: {{model.name}}<br></h2>
            <b-list-group style="margin: 5%">
                <b-list-group-item class="flex-column align-items-start" v-for="stocks in model.stocks" :key="stocks.id" :class="{active:stocks.id == stock.id}" v-on:click="loadStock(stocks)" style="margin-bottom: 10px"  >
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{stocks.stock.name}} </h5>
                        <h6 class="mb-1">price: {{stocks.stock.price}} </h6>

                        <small>buy price: {{stocks.buyPrice}}</small>
                        <small>amount: {{stocks.amount}}</small>
                        <h7 name="Profit" Style="color: green" class="mb-1" v-if="Math.sign(CalcProfitstock(stocks)) == 1" > {{CalcProfitstock(stocks)}}% </h7>
                        <h7 name="Profit" Style="color: gray()" class="mb-1" v-else-if="Math.sign(CalcProfitstock(stocks)) == 0" > {{CalcProfitstock(stocks)}}% </h7>
                        <h7 name="Profit" Style="color: red" class="mb-1" v-else-if="Math.sign(CalcProfitstock(stocks)) == -1" > {{CalcProfitstock(stocks)}}% </h7>
                    </div>

                </b-list-group-item>
                <button v-if="stock != -1" v-on:click="RemoveStock" class="btn btn-danger" id="RemoveStock">RemoveStock</button>
            </b-list-group>
            </div>
            <!---->
            <!--<b-list-group-item href="#" active class="flex-column align-items-start">-->
            <!--<div class="d-flex w-100 justify-content-between">-->
            <!--<h5 class="mb-1">List group item heading</h5>-->
            <!--<small>small tag first</small>-->
            <!--</div>-->

            <!--<p class="mb-1">-->
            <!--p tag middle-->
            <!--</p>-->

            <!--<small>small tag 2</small>-->
            <!--</b-list-group-item>-->




    </div>
</template>
<style>
    @import 'Login.css';
</style>

<script>
    import axios from 'axios';

    export default {
        name: 'Portfolio',
        data () {
            return {
                Portfolios: [],
                errors: [],
                label: '',
                model: -1,
                stock:  -1
            }
        },
        mounted () {
            axios.get(`http://localhost:8080/JEAORM/API/Portfolio`, {
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
            loadPortfolio: function (Portfolio) {
                this.model = Portfolio;
            },
            loadStock: function (stock) {
                this.stock = stock;
            },
            RemoveProfile: function () {

                if (!this.model <= 0) {
                    axios.delete(`http://localhost:8080/JEAORM/API/Portfolio/remove/` + this.model.id, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            if (response.status == 200) {
                                alert("Portfolio removed")
                                axios.get(`http://localhost:8080/JEAORM/API/Portfolio`, {
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
                            } else {
                                alert("Portfolio couldn't been removed")
                            }
                        })
                        .catch(function (error) {
                            alert("No rights");
                        })
                }else {
                    alert("select portfolio")
                }
            },
            CalcProfitstock: function (stocks) {
                let price = stocks.stock.price * stocks.amount;
                let buyprice = stocks.buyPrice * stocks.amount;

                return ((price - buyprice) / buyprice * 100).toLocaleString(undefined,{maximumFractionDigits:2})


            },

            CalcProfit: function (model) {

                 let buyprice = 0;
                 let price = 0;

                for(let stock of model.stocks){
                    price = price + stock.stock.price * stock.amount;
                    buyprice = buyprice + stock.buyPrice * stock.amount;
                }

                return ((price - buyprice) / buyprice * 100).toLocaleString(undefined,{maximumFractionDigits:2})

            },

            RemoveStock: function () {

                if (!this.model <= 0) {
                    axios.delete(`http://localhost:8080/JEAORM/API/Portfolio/RemoveStock/` + this.stock.id, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            if (response.status == 200) {
                                alert("Stock removed")
                                axios.get(`http://localhost:8080/JEAORM/API/Portfolio`, {
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
                            } else {
                                alert("Stock couldn't been removed")
                            }
                        })
                        .catch(function (error) {
                            alert("No rights");
                        })
                }else {
                    alert("select portfolio")
                }
            },
        }
    }
</script>

<style scoped>

</style>