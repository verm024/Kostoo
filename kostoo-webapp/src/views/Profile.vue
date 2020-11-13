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

    <div class="logout-button">
      <p @click="logout">
        <svg
          v-if="currentUser"
          width="26"
          height="30"
          viewBox="0 0 21 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M10.4651 22.8821H2.61626C2.13486 22.8821 1.74419 22.4169 1.74419 21.8439V3.15615C1.74419 2.58306 2.1349 2.11797 2.61626 2.11797H10.4651C10.9474 2.11797 11.3372 1.65391 11.3372 1.07979C11.3372 0.505664 10.9474 0.0415039 10.4651 0.0415039H2.61626C1.17383 0.0415039 0 1.43897 0 3.15615V21.8438C0 23.561 1.17383 24.9584 2.61626 24.9584H10.4651C10.9474 24.9584 11.3372 24.4944 11.3372 23.9203C11.3372 23.3461 10.9474 22.8821 10.4651 22.8821Z"
              fill="#5BC77A"
            />
            <path
              d="M20.7401 11.7608L15.4378 5.53156C15.0959 5.12873 14.5431 5.13395 14.2047 5.54196C13.8663 5.94997 13.8698 6.60714 14.2134 7.00998L18.0026 11.4618H7.84885C7.36659 11.4618 6.97678 11.9258 6.97678 12.5C6.97678 13.0741 7.36659 13.5382 7.84885 13.5382H18.0026L14.2134 17.99C13.8698 18.3928 13.8672 19.05 14.2047 19.458C14.3756 19.6636 14.6006 19.7674 14.8256 19.7674C15.0471 19.7674 15.2686 19.6677 15.4378 19.4684L20.7401 13.2391C20.9058 13.044 21 12.7781 21 12.4999C21 12.2218 20.9067 11.957 20.7401 11.7608Z"
              fill="#5BC77A"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="21" height="25" fill="white" />
            </clipPath>
          </defs></svg
        >Logout
      </p>
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
        if (
          this.form_profile.nama_desa == "" ||
          this.form_profile.deskripsi_desa == "" ||
          this.form_profile.kota_desa == "" ||
          this.form_profile.provinsi_desa == "" ||
          this.form_profile.new_kategori.length == 0
        ) {
          alert("Harap isi semua form yang wajib diisi");
          return;
        }
        profileData = {
          nama_desa: this.form_profile.nama_desa,
          deskripsi_desa: this.form_profile.deskripsi_desa,
          kota_desa: this.form_profile.kota_desa,
          provinsi_desa: this.form_profile.provinsi_desa,
          kategori: this.form_profile.new_kategori,
          role: "desa"
        };
      } else {
        if (this.form_profile.nama_perusahaan == "") {
          alert("Harap isi semua form yang wajib diisi");
          return;
        }
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
    },

    async logout() {
      try {
        await firebase.auth.signOut();
        this.$store.commit("setCurrentUser", null);
        this.$store.commit("setUserProfile", null);
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
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
