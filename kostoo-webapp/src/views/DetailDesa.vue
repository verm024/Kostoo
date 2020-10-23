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

      <p>Desa Mangunan</p>
    </div>
    <!-- end of judul and back button -->

    <!-- deskripsi desa -->
    <div class="deskripsi-desa">
      <p class="judul-text">Deskripsi Desa</p>
      <p class="deskripsi">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud
      </p>
    </div>
    <!-- end of deskripsi desa -->

    <!-- potensi desa -->
    <p class="judul-text">Potensi Desa</p>
    <div class="list-potensi-desa">
      <div class="card-potensi-desa">
        <img src="../assets/images/cabai.svg" alt="" srcset="" />
        <p>Cabai</p>
      </div>

      <div class="card-potensi-desa">
        <img src="../assets/images/padi.svg" alt="" srcset="" />
        <p>Padi</p>
      </div>

      <div class="card-potensi-desa">
        <img src="../assets/images/jagung.svg" alt="" srcset="" />
        <p>Jagung</p>
      </div>

      <div class="card-potensi-desa">
        <img src="../assets/images/singkong.svg" alt="" srcset="" />
        <p>Singkong</p>
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
<style scoped>
@import url("../assets/css/detailDesa.css");
</style>
