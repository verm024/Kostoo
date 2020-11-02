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

      <p>Kacang Kedelai 300 Kg/Bulan</p>
    </div>
    <!-- end of judul and back button -->

    <!-- card informasi proyek-->
    <div class="list-card-proyek">
      <div class="card-deadline">
        <div class="hari-tersisa">
          <h3>20</h3>
          <p>
            Hari <br />
            Tersisa
          </p>
        </div>
        <p class="tanggal-deadline">
          Deadline : 10/8/2020
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud
      </p>
    </div>

    <!-- end of deskripsi proyek -->
    <div class="progress-proyek">
      <p class="judul-text">Progress Proyek</p>

      <div class="content-progress">
        <div class="counter-progress">
          <span>2</span>
        </div>

        <div class="yang-dilakukan">
          <p class="judul">Membeli Bibit</p>
          <p class="deskripsi">Lorem Ipsum dolor amet sit veniam.</p>
        </div>
        <button class="orange-button">Hubungi Desa</button>
      </div>
    </div>
    <!-- progress proyek -->
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/proyek.css");
</style>
