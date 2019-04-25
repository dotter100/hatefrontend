<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            fixed
            app
    >
      <v-list dense v-if="checklogin()">
        <v-list-tile v-bind:to="'home'" @click="">
            <v-list-tile-action>
                <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
          <v-list-tile  v-bind:to="'Portfolio'" @click="">
              <v-list-tile-action>
                  <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Portfolio</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        <v-list-tile  v-bind:to="'Stocks'" @click="">
            <v-list-tile-action>
                <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Stocks</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

    </v-list>

        <v-list dense v-else>
            <v-list-tile  v-bind:to="'Stocks'" @click="">
                <v-list-tile-action>
                    <v-icon>list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Stocks</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-bind:to="'login'" @click="">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Login</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>



    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Stock Portfolio</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-responsive :aspect-ratio="16/9">
        <router-view/>
        </v-responsive>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    data: () => ({
      drawer: null
    }),

    props: {
      source: String
    },
      methods: {
        checklogin: function (){
            const loggedIn = localStorage.getItem('token');
            if(loggedIn) {
                return true;
            }else{
                return false;
            }
        }

      }


  }
</script>
