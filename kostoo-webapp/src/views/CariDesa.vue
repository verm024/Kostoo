<template>
  <div class="cari-desa">
    <div class="list-card-desa">
      <!-- card desa -->
      <div class="card-desa">
        <div class="text-card">
          <p class="nama-desa">Desa Jendi</p>
          <p class="lokasi">Salatiga, Jawa Tengah</p>

          <div class="list-potensi-desa">
            <span>Cabai</span>
            <span>Jagung</span>
            <span>Padi</span>
          </div>
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
      <!-- end of card desa -->

      <!-- card desa -->
      <div class="card-desa">
        <div class="text-card">
          <p class="nama-desa">Desa Jendi</p>
          <p class="lokasi">Salatiga, Jawa Tengah</p>

          <div class="list-potensi-desa">
            <span>Cabai</span>
            <span>Jagung</span>
            <span>Padi</span>
          </div>
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
      <!-- end of card desa -->

      <!-- card desa -->
      <div class="card-desa">
        <div class="text-card">
          <p class="nama-desa">Desa Jendi</p>
          <p class="lokasi">Salatiga, Jawa Tengah</p>

          <div class="list-potensi-desa">
            <span>Cabai</span>
            <span>Jagung</span>
            <span>Padi</span>
          </div>
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
      <!-- end of card desa -->

      <!-- card desa -->
      <div class="card-desa">
        <div class="text-card">
          <p class="nama-desa">Desa Jendi</p>
          <p class="lokasi">Salatiga, Jawa Tengah</p>

          <div class="list-potensi-desa">
            <span>Cabai</span>
            <span>Jagung</span>
            <span>Padi</span>
          </div>
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
      <!-- end of card desa -->

      <!-- card desa -->
      <div class="card-desa" v-for="(item, index) in list_desa" :key="index">
        <div class="text-card">
          <p class="nama-desa" @click="$router.push('/desa/' + item.id)">
            {{ item.nama_desa }}
          </p>
          <p class="lokasi" style="text-transform: capitalize">
            {{ item.kota_desa }}, {{ item.provinsi_desa }}
          </p>

          <div class="list-potensi-desa">
            <span v-for="(kategori, i) in item.kategori" :key="i">
              {{ kategori }}
            </span>
          </div>
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
      <!-- end of card desa -->
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  data() {
    return {
      list_desa: []
    };
  },
  firestore: {
    list_desa: firebase.db.collection("users").where("role", "==", "desa")
  }
};
</script>

<style scoped>
@import url("../assets/css/cariDesa.css");
</style>
