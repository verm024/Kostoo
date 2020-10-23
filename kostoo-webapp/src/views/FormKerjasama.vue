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

      <p>Tawaran Kerjasama dengan Desa Mangunan</p>
    </div>
    <!-- end of judul and back button -->

    <!-- form -->
    <div class="list-form">
      <div class="sub-form">
        <p class="judul-input">
          Nama Proyek
        </p>
        <input type="text" />
      </div>

      <div class="sub-form">
        <p class="judul-input">
          Deskripsi Proyek
        </p>
        <textarea name="" id="" cols="30"></textarea>
      </div>

      <div class="sub-form">
        <p class="judul-input">
          Jangka Waktu Pengerjaan
        </p>
        <input type="text" />
      </div>
    </div>
    <!-- end of form -->

    <div style="text-align:center">
      <button class="orange-button">Selanjutnya</button>
    </div>
  </div>
</template>
<style scoped>
@import url("../assets/css/form.css");
</style>
