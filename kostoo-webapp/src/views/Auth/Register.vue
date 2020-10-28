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
    <div v-if="register_form.role == 'desa'">
      <input
        type="text"
        v-model="register_form.nama_desa"
        placeholder="Nama Desa"
      />
      <input
        type="text"
        v-model="register_form.deskripsi_desa"
        placeholder="Deksripsi Desa"
      />
      <div v-for="(item, index) in kategori" :key="index">
        <input type="checkbox" v-model="item.selected" />
        <label>{{ item.name }}</label>
      </div>
    </div>
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
        role: "desa",
        nama_desa: "",
        deskripsi_desa: "",
        kategori: []
      },
      kategori: [
        {
          name: "Singkong",
          value: "singkong",
          selected: false
        },
        {
          name: "Cabai",
          value: "cabai",
          selected: false
        },
        {
          name: "Pepaya",
          value: "pepaya",
          selected: false
        }
      ]
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
      let registerData;
      this.kategori.forEach(element => {
        if (element.selected) {
          this.register_form.kategori.push(element.value);
        }
      });
      if (this.register_form.role == "desa") {
        registerData = {
          email: this.register_form.email,
          role: this.register_form.role,
          nama_desa: this.register_form.nama_desa,
          deskripsi_desa: this.register_form.deskripsi_desa,
          kategori: this.register_form.kategori
        };
      } else {
        registerData = {
          email: this.register_form.email,
          role: this.register_form.role
        };
      }
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
      this.$router.push("/");
    }
  }
};
</script>
