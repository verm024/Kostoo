<template>
  <div class="login">
    Login form
    <input type="text" placeholder="Email" v-model="login_form.email" />
    <input
      type="password"
      placeholder="Password"
      v-model="login_form.password"
    />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import firebase from "../../firebase";

export default {
  data() {
    return {
      login_form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      let user;
      try {
        user = await firebase.auth.signInWithEmailAndPassword(
          this.login_form.email,
          this.login_form.password
        );
      } catch (error) {
        console.error(error);
      }
      user = user.user;
      this.$store.commit("setCurrentUser", user);
      this.$store.dispatch("fetchUserProfile");
      this.$router.push("/desa");
    }
  }
};
</script>
