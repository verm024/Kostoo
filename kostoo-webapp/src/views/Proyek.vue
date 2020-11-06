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

    <!-- Detail proyek -->
    <div class="deskripsi-proyek">
      <p class="judul-text">Detail Proyek</p>
      <p class="deskripsi">
        {{ data_proyek.deskripsi_proyek }}
      </p>
    </div>

    <!-- end of deskripsi proyek -->
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
    <!-- progress proyek -->
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data_proyek: ""
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
