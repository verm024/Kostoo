<template>
  <div class="container">
    <!-- judul and back button -->
    <div class="judul-dan-back">
      <svg
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

      <p>{{ data_desa.nama_desa }}</p>
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
        <img src="../assets/images/cabai.svg" alt="" srcset="" />
        <p>{{ item }}</p>
      </div>
    </div>
    <!-- end of potensi desa -->

    <!--pengalaman kerjasama  -->
    <p class="judul-text">Pengalaman Kerjasama</p>
    <div class="pengalaman-kerjasama">
      <div class="card-pengalaman">
        <p class="judul-proyek">Cabai Merah 300 Kg/Tahun</p>
        <p class="pihak-terkait">PT. Nusa Indah</p>
        <p class="jangka-waktu">Agustus 2018- September 2020</p>
      </div>
      <div class="card-pengalaman">
        <p class="judul-proyek">Cabai Merah 300 Kg/Tahun</p>
        <p class="pihak-terkait">PT. Nusa Indah</p>
        <p class="jangka-waktu">Agustus 2018- September 2020</p>
      </div>
      <div class="card-pengalaman">
        <p class="judul-proyek">Cabai Merah 300 Kg/Tahun</p>
        <p class="pihak-terkait">PT. Nusa Indah</p>
        <p class="jangka-waktu">Agustus 2018- September 2020</p>
      </div>
    </div>

    <div style="text-align:center">
      <button class="orange-button">Ajak Kerjasama</button>
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
      data_desa: ""
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
      next("/desa");
    } else if (data.role == "investor") {
      next("/desa");
    } else {
      next();
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/detailDesa.css");
</style>
