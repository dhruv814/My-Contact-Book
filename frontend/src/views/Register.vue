<template>
  <div class="border">
    <h3>User Registration</h3>
    <hr />
    <form @submit.prevent="handleSubmit">
      <div v-if="error.length" class="row error justify-content-center">
        <p v-for="err in error" :key="err">{{err}}</p>
      </div>
      <div v-if="success.length" class="row success justify-content-center">
        <p v-for="msg in success" :key="msg">{{msg}}</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-xs-7">
          <label for="firstname">First Name</label>
          <input
            type="text"
            v-model="user.firstname"
            class="form-control"
            name="firstname"
            :class="{ 'is-invalid': submitted && !user.firstname}"
          />
          <div v-show="submitted && !user.firstname" class="invalid-feedback">firstname is required</div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xs-7">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            v-model="user.lastname"
            name="lastname"
            class="form-control"
            :class="{ 'is-invalid': submitted && !user.lastname }"
          />
          <div v-show="submitted && !user.lastname" class="invalid-feedback">lastname is required</div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xs-7">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="user.username"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !user.username }"
          />
          <div v-show="submitted && !user.username" class="invalid-feedback">Username is required</div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xs-7">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="user.password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !user.password }"
          />
          <div v-show="submitted && !user.password" class="invalid-feedback">Password is required</div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xs-7">
          <button class="btn btn-primary" type="submit">Register</button>
          <router-link to="/login" class="btn btn-link">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import UserService from "../service/user.service.js";

export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        username: "",
        password: ""
      },
      submitted: false,
      success: [],
      error: []
    };
  },
  computed: {},
  userService: null,
  created() {
    this.userService = new UserService();
  },
  methods: {
    handleSubmit: async function(e) {
      this.submitted = true;

      if (
        this.user.firstname &&
        this.user.lastname &&
        this.user.username &&
        this.user.password
      ) {
        let result = await this.userService.addUser({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          password: this.user.password
        });

        if (result) {
          this.success = [];
          this.error = [];
          this.success.push("User is successfully added!");
        } else {
          this.error = [];
          this.success = [];
          this.error.push(
            "User name is already exists or something went wrong"
          );
        }
      }
      this.user.firstname = this.user.lastname = this.user.username = this.user.password =
        "";
      this.submitted = false;
      e.target.reset();
    }
  }
};
</script>

<style>
.row {
  margin-left: 28%;
  margin-bottom: 1.5%;
}
.border {
  min-height: 100px;
  width: 50%;
  margin-left: 25%;
  border-bottom: 2px solid black;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
