<template>
  <div class="dashboard">
    <!-- list card menunggu konfirmasi -->
    <div class="card-section">
      <h3 class="judul-card">Menunggu Konfirmasi Desa</h3>
      <div class="list-card-proyek">
        <!-- card -->
        <div
          class="card-proyek"
          v-for="(item, index) in menunggu_konfirmasi"
          :key="index"
          @click="$router.push('/proyek/' + item.id)"
          style="cursor: pointer"
        >
          <div class="text-card">
            <p class="waktu">
              {{
                Math.floor(
                  (Math.floor(Date.now() / 1000) -
                    item.tanggal_diajukan.seconds) /
                    86400
                )
              }}
              Hari yang lalu
            </p>
            <p class="judul-proyek">{{ item.nama_proyek }}</p>
            <p class="pihak-terkait">{{ item.desa.nama_desa }}</p>
            <p class="nilai-proyek">Rp. 100.000.000</p>
          </div>
          <svg
            width="16"
            height="20"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0Z"
              fill="#EC6B2A"
            />
          </svg>
        </div>
        <!-- end of card -->
      </div>
    </div>

    <!-- end of list card menunggu konfirmasi -->

    <!-- list card Dalam Pengerjaan -->
    <div class="card-section">
      <h3 class="judul-card">Dalam Pengerjaan</h3>
      <div class="list-card-proyek">
        <!-- card -->
        <div
          class="card-proyek"
          v-for="(item, index) in dalam_pengerjaan"
          :key="index"
          @click="$router.push('/proyek/' + item.id)"
          style="cursor: pointer"
        >
          <div class="text-card">
            <p class="judul-proyek">{{ item.nama_proyek }}</p>
            <p class="pihak-terkait">{{ item.desa.nama_desa }}</p>
            <p class="nilai-proyek">Rp. 100.000.000</p>
          </div>
          <svg
            width="16"
            height="20"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0Z"
              fill="#EC6B2A"
            />
          </svg>
        </div>
        <!-- end of card -->
      </div>
    </div>

    <!-- end of list card Dalam Pengerjaan -->

    <!-- list card Dalam Pengerjaan -->
    <div class="card-section">
      <h3 class="judul-card">Selesai</h3>
      <div class="list-card-proyek">
        <!-- card -->
        <div
          class="card-proyek"
          v-for="(item, index) in selesai"
          :key="index"
          @click="$router.push('/proyek/' + item.id)"
          style="cursor: pointer"
        >
          <div class="text-card">
            <p class="waktu">
              {{
                Math.floor(
                  (Math.floor(Date.now() / 1000) -
                    item.tanggal_selesai.seconds) /
                    86400
                )
              }}
              Hari yang lalu
            </p>
            <p class="judul-proyek">{{ item.nama_proyek }}</p>
            <p class="pihak-terkait">{{ item.desa.nama_desa }}</p>
            <p class="nilai-proyek">Rp. 100.000.000</p>
          </div>

          <svg
            width="16"
            height="20"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0Z"
              fill="#EC6B2A"
            />
          </svg>
        </div>
        <!-- end of card -->
      </div>
    </div>

    <!-- end of list card Dalam Pengerjaan -->
  </div>
</template>

<script>
import firebase from "../../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      menunggu_konfirmasi: [],
      dalam_pengerjaan: [],
      selesai: []
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    get_daftar_proyek: {
      immediate: true,
      handler() {
        this.$bind(
          "menunggu_konfirmasi",
          firebase.db
            .collection("proyek")
            .where(
              "investor",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .where("status_proyek", "==", "waiting")
            .orderBy("tanggal_diajukan", "desc")
        );
        this.$bind(
          "dalam_pengerjaan",
          firebase.db
            .collection("proyek")
            .where(
              "investor",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .where("status_proyek", "==", "ongoing")
            .orderBy("tanggal_diterima", "desc")
        );
        this.$bind(
          "selesai",
          firebase.db
            .collection("proyek")
            .where(
              "investor",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
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
@import url("../../assets/css/dashboard.css");
</style>
