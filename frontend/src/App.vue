<template>
  <div id="app">
    <div id="nav" class="jumbotron d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <img src="./assets/addressbook2.png" alt="myAddressBook" height="50" width="50" />
        &nbsp;&nbsp;
        <h1>My Contact Book</h1>
      </div>
      <div class="d-flex">
        <button v-if="!isLoggedIn" class="btn btn-success">
          <router-link class="link" to="/signin">
            <b>Login</b>
          </router-link>
        </button>
        <button v-if="!isLoggedIn" class="btn btn-success">
          <router-link class="link" to="/signup">
            <b>Register</b>
          </router-link>
        </button>
        <button v-if="isLoggedIn" class="btn btn-success" @click="getInfo" data-toggle="modal" data-target="#userDetailModal" >
          <i class="pi pi-user"></i>
        </button>
        <button v-if="isLoggedIn" class="btn btn-danger" @click="logout">
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
    <router-view />

    <!-- Modal -->
    <div
      class="modal fade"
      id="userDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="userDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="userDetailModalLabel">User Details</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Username : {{this.userInfo.username}}</h5>
            <h5>Firstname : {{this.userInfo.firstname}}</h5>
            <h5>Lastname : {{this.userInfo.lastname}}</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  .link {
    text-decoration: none;
    color: white;
  }
}
</style>

<script>
import UserService from "./service/user.service.js";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,
      userInfo:[]
    };
  },
  computed: {},
  userService: null,
  created() {
    this.isLoggedIn = localStorage.getItem("user") == "true";
    this.userService = new UserService();
  },
  methods: {
    async logout() {
      try {
        this.users = await this.userService.logout();
        this.$router.push("/signin");
      } catch (error) {
        console.log(error);
      }
    },

    getInfo(){
      this.userInfo= {
        firstname: localStorage.getItem('userFirstname'),
        lastname: localStorage.getItem('userLastname'),
        username:localStorage.getItem('userUsername')
      }   
    }
  },
  watch: {
    $route() {
      this.isLoggedIn = localStorage.getItem("user") == "true";
    }
  }
};
</script>
