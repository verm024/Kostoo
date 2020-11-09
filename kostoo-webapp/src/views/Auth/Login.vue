<template>
  <div class="login container">
    <h1 class="judul-halaman">
      Selamat datang di <br />
      Koosto
    </h1>
    <p class="sub-judul-halaman">Silahkan login untuk melanjutkan</p>

    <div style="margin-top:50px" class="list-form">
      <div class="sub-form">
        <p class="judul-input">
          Email
        </p>
        <input
          type="text"
          placeholder="Masukan Email anda"
          v-model="login_form.email"
        />
      </div>

      <div class="sub-form">
        <p class="judul-input">
          Password
        </p>
        <input
          type="password"
          placeholder="Masukan Password anda"
          v-model="login_form.password"
        />
      </div>
    </div>

    <div style="text-align:center">
      <button
        style="background: #5BC77A;padding:12px 80px;font-size:18px;width:80%"
        class="orange-button"
        @click="login"
      >
        Login
      </button>
    </div>

    <p style="margin-top:20px;text-align:center" class="sub-judul-halaman">
      Belum memiliki akun ? silahkan <br />
      daftar
      <router-link
        style="color:#5BC77A;font-weight:600"
        tag="span"
        to="/register"
        >di sini</router-link
      >
    </p>
  </div>
</template>

<script>
import firebase from "../../firebase";
import validator from "validator";

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
      if (
        validator.isEmail(this.login_form.email) &&
        this.login_form.password.length >= 6 &&
        this.login_form.password.length <= 20
      ) {
        try {
          user = await firebase.auth.signInWithEmailAndPassword(
            this.login_form.email,
            this.login_form.password
          );
        } catch (error) {
          console.error(error);
          if (error.code.includes("wrong-password")) {
            alert("Password salah!");
          } else if (error.code.includes("user-not-found")) {
            alert("Pastikan email yang anda masukkan sudah benar");
          }
        }
        if (user) {
          user = user.user;
          this.$store.commit("setCurrentUser", user);
          await this.$store.dispatch("fetchUserProfile");
          let role = this.$store.state.userProfile.role;
          if (role === "desa") this.$router.push("/desa");
          else this.$router.push("/investor");
        }
      } else {
        alert(
          "Format email harus sesuai dengan yang telah ditentukan dan panjang password harus antara 6 hingga 20 karakter"
        );
      }
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/form.css");
</style>
