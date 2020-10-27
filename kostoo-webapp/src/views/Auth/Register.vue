<template>
  <div class="register">
    Register
    <input type="text" placeholder="Email" v-model="register_form.email" />
    <input
      type="password"
      placeholder="Password"
      v-model="register_form.password"
    />
    <select name="" id="" v-model="register_form.role">
      <option value="desa">Desa</option>
      <option value="investor">Investor</option>
    </select>
    <input
      type="text"
      v-if="register_form.role == 'desa'"
      placeholder="Nama Desa"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import firebase from "../../firebase";

export default {
  data() {
    return {
      register_form: {
        email: "",
        password: "",
        role: "desa"
      }
    };
  },
  methods: {
    async register() {
      let user;
      try {
        user = await firebase.auth.createUserWithEmailAndPassword(
          this.register_form.email,
          this.register_form.password
        );
      } catch (error) {
        console.error(error);
      }
      user = user.user;
      let registerData = {
        email: this.register_form.email,
        role: this.register_form.role
      };
      if (user.uid) {
        try {
          await firebase.db
            .collection("users")
            .doc(user.uid)
            .set(registerData);
        } catch (error) {
          console.error(error);
        }
      }
      this.$store.commit("setCurrentUser", user);
      this.$store.dispatch("fetchUserProfile");
    }
  }
};
</script>
