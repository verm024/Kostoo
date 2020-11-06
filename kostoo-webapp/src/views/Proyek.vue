<template>
  <div class="container" v-if="data_proyek">
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

      <p>{{ data_proyek.nama_proyek }}</p>
    </div>
    <!-- end of judul and back button -->

    <!-- card informasi proyek-->
    <div class="list-card-proyek">
      <div class="card-deadline">
        <div class="hari-tersisa">
          <h3>
            {{
              Math.floor(
                Math.floor(
                  data_proyek.deadline_proyek.seconds - Date.now() / 1000
                ) / 86400
              )
            }}
          </h3>
          <p>
            Hari <br />
            Tersisa
          </p>
        </div>
        <p class="tanggal-deadline">
          Deadline : {{ formatDate(data_proyek.deadline_proyek.seconds) }}
        </p>
      </div>

      <div class="card-mou">
        <div class="text-card">
          <p class="judul">MoU Kerjasama</p>
          <p class="tanggal-mou">10/8/2020</p>
        </div>
        <span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0Z"
              fill="#EC6B2A"
            /></svg
        ></span>
      </div>
    </div>
    <!-- end of card informasi proyek-->

    <!-- deskripsi proyek -->
    <div class="deskripsi-proyek">
      <p class="judul-text">Deskripsi Proyek</p>
      <p class="deskripsi">
        {{ data_proyek.deskripsi_proyek }}
      </p>
    </div>
    <!-- end of deskripsi proyek -->

    <!-- detail proyek -->
    <div class="deskripsi-proyek">
      <p class="judul-text">Detail Proyek</p>
      <p class="deskripsi">
        {{ data_proyek.deskripsi_proyek }}
      </p>
    </div>
    <!-- end of detail proyek -->

    <!-- progress proyek -->
    <div class="progress-proyek" v-if="data_proyek.status_proyek != 'waiting'">
      <p class="judul-text">Progress Proyek</p>

      <div class="content-progress">
        <div class="counter-progress">
          <span>2</span>
        </div>

        <div class="yang-dilakukan">
          <p class="judul">Membeli Bibit</p>
          <p class="deskripsi">Lorem Ipsum dolor amet sit veniam.</p>
        </div>
        <button class="orange-button" v-if="userProfile.role == 'investor'">
          Hubungi Desa
        </button>
      </div>
    </div>
    <!-- end of progress proyek -->

    <!-- Temporary tambah progress -->
    <div
      v-if="
        userProfile.role == 'investor' && data_proyek.status_proyek == 'waiting'
      "
    >
      <input
        type="text"
        v-model="form_progress.nama_progress"
        placeholder="Nama progress"
      />
      <input
        type="text"
        v-model="form_progress.deskripsi_progress"
        placeholder="Deskripsi progress"
      />
      <input
        type="date"
        v-model="form_progress.tanggal_progress"
        placeholder="Tanggal progress"
      />
      <input
        type="number"
        v-model="form_progress.harga_progress"
        placeholder="Harga progress"
      />
      <button @click="tambahProgress">Tambah progress</button>
    </div>
    <!-- end of Temporary tambah progress -->
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data_proyek: "",
      form_progress: {
        nama_progress: "",
        deskripsi_progress: "",
        tanggal_progress: "",
        harga_progress: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      date = date.getDate();
      return date + "/" + month + "/" + year;
    },
    async tambahProgress() {
      if (
        !(
          this.form_progress.nama_progress == "" ||
          this.form_progress.deskripsi_progress == "" ||
          this.form_progress.tanggal_progress == "" ||
          this.form_progress.harga_progress == ""
        )
      ) {
        let currentProgress = this.data_proyek.progress;
        for (let i = 0; i < currentProgress.length; i++) {
          currentProgress[i].tanggal_progress = new Date(
            currentProgress[i].tanggal_progress.seconds * 1000
          );
        }
        let dataProgress = {
          nama_progress: this.form_progress.nama_progress,
          deskripsi_progress: this.form_progress.deskripsi_progress,
          tanggal_progress: new Date(this.form_progress.tanggal_progress),
          harga_progress: this.form_progress.harga_progress
        };
        currentProgress.push(dataProgress);
        currentProgress.sort((a, b) => {
          return b.tanggal_progress - a.tanggal_progress;
        });
        try {
          await firebase.db
            .collection("proyek")
            .doc(this.$route.params.id)
            .update({ progress: currentProgress });
          this.form_progress.nama_progress = "";
          this.form_progress.deskripsi_progress = "";
          this.form_progress.tanggal_progress = "";
          this.form_progress.harga_progress = "";
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  watch: {
    get_data_proyek: {
      immediate: true,
      handler() {
        this.$bind(
          "data_proyek",
          firebase.db.collection("proyek").doc(this.$route.params.id)
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style scoped>
@import url("../assets/css/proyek.css");
</style>
