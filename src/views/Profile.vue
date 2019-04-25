<template>
  <div class="container">
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills float-right">
        </ul>
      </nav>
      <h3 class="text-muted" style="float: none; text-align: center;">Profile informatie</h3>
    </div>


    <div class="form-group" style="text-align: left;">
      <label>Voornaam:</label> <label style="float: right;">{{user.name}}</label>
      <div>
        <label>Achternaam:</label> <label style="float: right;">{{user.lastname}}</label>
      </div>
      <div>
        <label>BSN:</label> <label style="float: right;">{{user.bsn}}</label>
      </div>
      <div>
        <label>Email:</label> <label style="float: right;">{{user.email}}</label>
      </div>
    </div>




  </div> <!-- /container -->
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',
    data () {
      return {
        user: null,
        errors: []
      }
    },
    mounted () {
      axios.get(`http://:8080/Registreren/User`, {

      })
        .then(response => {
          this.user = response.data;
        })
        .catch(function (error) {
          alert("No rights");
        })
    }
  }
</script>

<style scoped>

</style>
