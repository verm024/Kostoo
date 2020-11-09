<template>
  <div class="container">
    <!-- judul and back button -->
    <div class="judul-dan-back">
      <svg
        @click="back"
        width="20"
        height="28"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.7166 20L12 17.65L4.583 10L12 2.35L9.7166 0L0 10L9.7166 20Z"
          fill="#EC6B2A"
        />
      </svg>

      <p>Desa {{ data_desa.nama_desa }}</p>
    </div>
    <!-- end of judul and back button -->

    <!-- deskripsi desa -->
    <div class="deskripsi-desa">
      <p class="judul-text">Deskripsi Desa</p>
      <p class="deskripsi">
        {{ data_desa.deskripsi_desa }}
      </p>
    </div>
    <!-- end of deskripsi desa -->

    <!-- potensi desa -->
    <p class="judul-text">Potensi Desa</p>
    <div class="list-potensi-desa">
      <div
        class="card-potensi-desa"
        v-for="(item, index) in data_desa.kategori"
        :key="index"
      >
        <img :src="require(`@/assets/images/${item}.svg`)" alt="" srcset="" />
        <p>{{ item }}</p>
      </div>
    </div>
    <!-- end of potensi desa -->

    <!--pengalaman kerjasama  -->
    <p class="judul-text">Pengalaman Kerjasama</p>
    <div v-if="pengalaman_kerjasama.length !== 0" class="pengalaman-kerjasama">
      <div
        class="card-pengalaman"
        v-for="(item, index) in pengalaman_kerjasama"
        :key="index"
        @click="$router.push('/proyek/' + item.id)"
      >
        <p class="judul-proyek">{{ item.nama_proyek }}</p>
        <p class="pihak-terkait">{{ item.investor.nama_perusahaan }}</p>
        <p class="jangka-waktu">
          {{ formatDate(item.tanggal_diterima.seconds) }} -
          {{ formatDate(item.tanggal_selesai.seconds) }}
        </p>
      </div>
    </div>

    <!-- empty state -->
    <div v-else class="empty-state">
      <p>Belum memiliki pengalaman kerjasama..</p>
    </div>
    <!-- end of empty state -->

    <div style="text-align:center" v-if="userProfile.role == 'investor'">
      <button
        class="orange-button"
        @click="$router.push('/form-kerjasama/' + $route.params.id)"
      >
        Ajak Kerjasama
      </button>
      <button @click="handleClickHubungi" class="orange-button">
        Hubungi Desa
      </button>
    </div>
    <!-- end of pengalaman kerjasama -->
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data_desa: "",
      pengalaman_kerjasama: []
    };
  },
  async created() {
    let doc;
    try {
      doc = await firebase.db
        .collection("users")
        .doc(this.$route.params.id)
        .get();
    } catch (error) {
      console.error(error);
    }
    this.data_desa = doc.data();
  },
  async beforeRouteEnter(to, from, next) {
    let doc;
    try {
      doc = await firebase.db
        .collection("users")
        .doc(to.params.id)
        .get();
    } catch (error) {
      console.error(error);
    }
    let data = doc.data();
    if (!doc.exists) {
      next("/investor");
    } else if (data.role == "investor") {
      next("/investor");
    } else {
      next();
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      let month = months[date.getMonth()];
      let year = date.getFullYear();
      date = date.getDate();
      return date + " " + month + " " + year;
    },
    async handleClickHubungi() {
      let data;
      try {
        if (this.userProfile.role == "investor") {
          data = await firebase.db
            .collection("pesan")
            .where(
              "desa",
              "==",
              firebase.db.collection("users").doc(this.$route.params.id)
            )
            .where(
              "investor",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .get();
        } else {
          data = await firebase.db
            .collection("pesan")
            .where(
              "investor",
              "==",
              firebase.db.collection("users").doc(this.$route.params.id)
            )
            .where(
              "desa",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .get();
        }
      } catch (error) {
        console.error(error);
      }
      if (data.docs.length > 0) {
        this.$router.push("/pesan/" + data.docs[0].id);
      } else {
        let room;
        try {
          if (this.userProfile.role == "investor") {
            room = await firebase.db.collection("pesan").add({
              desa: firebase.db.collection("users").doc(this.$route.params.id),
              investor: firebase.db
                .collection("users")
                .doc(this.currentUser.uid), tanggal_pesan: new Date()
            });
          } else {
            room = await firebase.db.collection("pesan").add({
              investor: firebase.db
                .collection("users")
                .doc(this.$route.params.id),
              desa: firebase.db.collection("users").doc(this.currentUser.uid), tanggal_pesan: new Date()
            });
          }
        } catch (error) {
          console.error(error);
        }
        if (room) {
          this.$router.push("/pesan/" + room.id);
        } else {
          alert("Terjadi error, coba lagi nanti");
        }
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_pengalaman_kerjasama: {
      immediate: true,
      handler() {
        this.$bind(
          "pengalaman_kerjasama",
          firebase.db
            .collection("proyek")
            .where(
              "desa",
              "==",
              firebase.db.collection("users").doc(this.$route.params.id)
            )
            .where("status_proyek", "==", "finished")
            .orderBy("tanggal_selesai", "desc")
        );
      }
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/detailDesa.css");
</style>
