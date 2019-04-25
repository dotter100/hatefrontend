<template>
    <div>
    <div class="col-md-5" style="float: left;">
        <h2>Portfolio's:<br></h2>
        <b-list-group style="margin: 5%">
            <b-list-group-item class="flex-column align-items-start" v-for="Portfolio in Portfolios" :key="Portfolio.id"  style="margin-bottom: 10px" v-on:click="loadPortfolio(Portfolio)" :class="{active:Portfolio.id == model.id}">
                <div class="d-flex w-100 justify-content-between" >
                    <h5 class="mb-1">{{Portfolio.name}} </h5>
                    <small>{{Portfolio.stocks.size}}</small>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>

            <div class="col-md-5" v-if="model !== null" style="float: left;">
                <h2>Portfolio: {{model.name}}<br></h2>
            <b-list-group style="margin: 5%">
                <b-list-group-item class="flex-column align-items-start" v-for="stocks in model.stocks" :key="stocks.ID" style="margin-bottom: 10px"  >
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{stocks.stock.name}} </h5>
                        <h6 class="mb-1">price: {{stocks.stock.price}} </h6>
                        <small>buy price: {{stocks.buyPrice}}</small>
                        <small>amount: {{stocks.amount}}</small>
                    </div>
                </b-list-group-item>
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

<script>
    import axios from 'axios';

    export default {
        name: 'Portfolio',
        data () {
            return {
                Portfolios: [],
                errors: [],
                label: '',
                model: -1
            }
        },
        mounted () {
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
        methods:{
            loadPortfolio:function(Portfolio){
                this.model = Portfolio;
            }
        }
    }
</script>

<style scoped>

</style>