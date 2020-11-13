<template>
  <div class="register container">
    <h1 style="margin-top:-68px" class="judul-halaman">
      Registerasi di <br />
      Koosto
    </h1>
    <p class="sub-judul-halaman">Silahkan isi form untuk mendapatkan akun</p>

    <div class="list-form">
      <div class="sub-form">
        <p class="judul-input">
          Email
        </p>
        <input
          type="text"
          placeholder="Masukan Email anda"
          v-model="register_form.email"
        />
      </div>

      <div class="sub-form">
        <p class="judul-input">
          Password
        </p>
        <input
          type="password"
          placeholder="Masukan Password anda"
          v-model="register_form.password"
        />
      </div>

      <div class="sub-form">
        <p class="judul-input">
          Sebagai Pihak ?
        </p>
        <select
          style="margin-top:-10px"
          name=""
          id=""
          v-model="register_form.role"
        >
          <option value="desa">Desa</option>
          <option value="investor">Investor</option>
        </select>
      </div>

      <div v-if="register_form.role == 'desa'">
        <div class="sub-form">
          <p class="judul-input">
            Nama Desa
          </p>

          <input
            type="text"
            v-model="register_form.nama_desa"
            placeholder="Masukan nama desa"
          />
        </div>

        <div class="sub-form">
          <p class="judul-input">
            Deskripsi Desa
          </p>

          <textarea
            placeholder="Masukan Deskripsi singkat desa"
            name=""
            id=""
            cols="30"
            v-model="register_form.deskripsi_desa"
          ></textarea>
        </div>

        <div class="sub-form">
          <p class="judul-input">
            Kota/Kabupaten Desa
          </p>
          <input
            type="text"
            v-model="register_form.kota_desa"
            placeholder="Kota/Kabupaten Desa"
          />
        </div>

        <div class="sub-form">
          <p class="judul-input">
            Provinsi
          </p>
          <input
            type="text"
            v-model="register_form.provinsi_desa"
            placeholder="Provinsi"
          />
        </div>

        <div class="sub-form">
          <p class="judul-input">
            Potensi Desa
          </p>

          <div class="box-potensi">
            <div v-for="(item, index) in kategori" :key="index">
              <input
                style="width:unset"
                type="checkbox"
                v-model="item.selected"
              />
              <label>{{ item.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="sub-form">
          <p class="judul-input">
            Nama Perusahaan
          </p>

          <input
            type="text"
            v-model="register_form.nama_perusahaan"
            placeholder="Masukan nama desa"
          />
        </div>
      </div>

      <div style="text-align:center">
        <button
          style="background: #5BC77A;padding:12px 80px;font-size:18px;width:80%"
          class="orange-button"
          @click="register"
        >
          Register
        </button>
      </div>

      <p style="margin-top:20px;text-align:center" class="sub-judul-halaman">
        Sudah memiliki akun ? silahkan <br />
        masuk
        <router-link
          style="color:#5BC77A;font-weight:600"
          tag="span"
          to="/login"
          >di sini</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "../../firebase";
import validator from "validator";

export default {
  data() {
    return {
      register_form: {
        email: "",
        password: "",
        role: "desa",
        nama_desa: "",
        deskripsi_desa: "",
        kota_desa: "",
        provinsi_desa: "",
        kategori: [],
        nama_perusahaan: ""
      },
      kategori: [
        {
          name: "Singkong",
          selected: false
        },
        {
          name: "Cabai",
          selected: false
        },
        {
          name: "Jagung",
          selected: false
        },
        {
          name: "Padi",
          selected: false
        }
      ]
    };
  },
  methods: {
    async register() {
      let user;
      if (
        validator.isEmail(this.register_form.email) &&
        this.register_form.password.length >= 6 &&
        this.register_form.password.length <= 20
      ) {
        let registerData;
        this.kategori.forEach(element => {
          if (element.selected) {
            this.register_form.kategori.push(element.name);
          }
        });
        if (this.register_form.role == "desa") {
          if (
            this.register_form.nama_desa == "" ||
            this.register_form.deskripsi_desa == "" ||
            this.register_form.kota_desa == "" ||
            this.register_form.provinsi_desa == "" ||
            this.register_form.kategori.length == 0
          ) {
            alert("Harap isi semua form yang wajib diisi");
            return;
          }
          registerData = {
            role: this.register_form.role,
            nama_desa: this.register_form.nama_desa,
            deskripsi_desa: this.register_form.deskripsi_desa,
            kota_desa: this.register_form.kota_desa,
            provinsi_desa: this.register_form.provinsi_desa,
            kategori: this.register_form.kategori
          };
        } else {
          if (this.register_form.nama_perusahaan == "") {
            alert("Harap isi semua form yang wajib diisi");
            return;
          }
          registerData = {
            role: this.register_form.role,
            nama_perusahaan: this.register_form.nama_perusahaan
          };
        }
        try {
          user = await firebase.auth.createUserWithEmailAndPassword(
            this.register_form.email,
            this.register_form.password
          );
        } catch (error) {
          console.error(error);
        }
        user = user.user;
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
        this.$router.push("/" + this.register_form.role);
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
.sub-form {
  margin-bottom: 30px;
}
</style>
