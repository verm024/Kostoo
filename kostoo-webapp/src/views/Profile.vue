<template>
  <div class="profile container">
    <div class="list-form" v-if="userProfile.role == 'desa'">
      <div class="sub-form">
        <p class="judul-input">
          Nama Desa
        </p>
        <input
          type="text"
          placeholder="Masukan nama desa"
          v-model="form_profile.nama_desa"
        />
      </div>
      <div class="list-form">
        <div class="sub-form">
          <p class="judul-input">
            Deskripsi Desa
          </p>
          <textarea
            placeholder="Masukan Deskripsi singkat desa"
            name=""
            id=""
            cols="30"
            v-model="form_profile.deskripsi_desa"
          ></textarea>
        </div>
      </div>
      <div class="sub-form">
        <p class="judul-input">
          Kota/Kabupaten Desa
        </p>
        <input
          type="text"
          placeholder="Kota/Kabupaten Desa"
          v-model="form_profile.kota_desa"
        />
      </div>
      <div class="sub-form">
        <p class="judul-input">
          Provinsi
        </p>
        <input
          type="text"
          placeholder="Provinsi"
          v-model="form_profile.provinsi_desa"
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
      <div style="text-align:center">
        <button
          style="background: #5BC77A;padding:12px 80px;font-size:18px;width:80%"
          class="orange-button"
          @click="updateProfile"
        >
          Update Profile
        </button>
      </div>
    </div>
    <div class="list-form" v-else>
      <div class="sub-form">
        <p class="judul-input">
          Nama Perusahaan
        </p>
        <input
          type="text"
          placeholder="Masukan nama perusahaan"
          v-model="form_profile.nama_perusahaan"
        />
      </div>
      <div style="text-align:center">
        <button
          style="background: #5BC77A;padding:12px 80px;font-size:18px;width:80%"
          class="orange-button"
          @click="updateProfile"
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      form_profile: {
        nama_desa: "",
        deskripsi_desa: "",
        kota_desa: "",
        provinsi_desa: "",
        kategori: [],
        nama_perusahaan: "",
        new_kategori: []
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
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  async created() {
    if (this.userProfile.role == "desa") {
      this.form_profile.nama_desa = this.userProfile.nama_desa;
      this.form_profile.deskripsi_desa = this.userProfile.deskripsi_desa;
      this.form_profile.kota_desa = this.userProfile.kota_desa;
      this.form_profile.provinsi_desa = this.userProfile.provinsi_desa;
      this.form_profile.kategori = this.userProfile.kategori;
      for (let i = 0; i < this.kategori.length; i++) {
        if (this.form_profile.kategori.includes(this.kategori[i].name)) {
          this.kategori[i].selected = true;
        }
      }
    } else {
      this.form_profile.nama_perusahaan = this.userProfile.nama_perusahaan;
    }
  },
  methods: {
    async updateProfile() {
      let profileData;
      this.kategori.forEach(element => {
        if (element.selected) {
          this.form_profile.new_kategori.push(element.name);
        }
      });
      if (this.userProfile.role == "desa") {
        profileData = {
          nama_desa: this.form_profile.nama_desa,
          deskripsi_desa: this.form_profile.deskripsi_desa,
          kota_desa: this.form_profile.kota_desa,
          provinsi_desa: this.form_profile.provinsi_desa,
          kategori: this.form_profile.new_kategori,
          role: "desa"
        };
        console.log(profileData);
      } else {
        profileData = {
          nama_perusahaan: this.form_profile.nama_perusahaan,
          role: "investor"
        };
      }
      if (this.currentUser.uid) {
        try {
          await firebase.db
            .collection("users")
            .doc(this.currentUser.uid)
            .set(profileData);
        } catch (error) {
          console.error(error);
        }
      }
      this.$store.dispatch("fetchUserProfile");
      this.$router.push("/" + this.userProfile.role);
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/form.css");
.sub-form {
  margin-bottom: 30px;
}
</style>
