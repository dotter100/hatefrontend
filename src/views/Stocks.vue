<template>

    <div class="col-md-4">
        <button @click="disconnect" v-if="status === 'connected'">Disconnect</button>
        <button @click="connect" v-if="status === 'disconnected'">Connect</button> {{ status }}
        <input type="text" v-model="message" id=""  placeholder="filter" @keyup.enter="sendMessage()">
        <h2>Stock list:<br></h2>
        <b-list-group style="margin: 5%">
            <b-list-group-item class="flex-column align-items-start" v-for="Stock in Stocks" :key="Stock.ID" style="margin-bottom: 10px" v-on:click="loadauto(auto)">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{Stock.name}} - {{Stock.company.name}}</h5>
                    <p>{{Stock.price}}</p>
                </div>
            </b-list-group-item>
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


        </b-list-group>




    </div>
    
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Stocks',
        data () {
            return {
                Stocks: [],
                errors: [],
                label: '',
                model: null,
                message: "",
                logs: [],
                status: "disconnected"
            }
        },
        mounted () {

            // axios.get(`http://desktop-354os6s:8080/JEAORM/API/Stocks`, {
            //     headers: {
            //         Authorization: 'Bearer ' + localStorage.getItem('token')
            //     }
            // })
            //     .then(response => {
            //         this.Stocks = response.data;
            //     })
            //     .catch(function (error) {
            //         alert("No rights");
            //     })
            this.connect()
        },
        methods:{

            loadauto:function(Stock){
                this.model = Stocks;
            },
            connect() {
                this.socket = new WebSocket("ws://localhost:8080/JEAORM/Socket");
                this.socket.onopen = () => {
                    this.status = "connected";
                    this.logs.push({ event: "Connected to", data: 'ws://localhost:8080/JEAORM/Socket'})

                    this.socket.onmessage = ({data}) => {

                            const o = JSON.parse(data)
                            console.log(o);
                            this.Stocks = o;
                    };
                };
            },
            disconnect() {
                this.socket.close();
                this.status = "disconnected";
                this.logs = [];
            },
            sendMessage(e) {
                this.socket.send(this.message);
                this.logs.push({ event: "Sent message", data: this.message });
            }

        }
    }
</script>

<style scoped>

</style>