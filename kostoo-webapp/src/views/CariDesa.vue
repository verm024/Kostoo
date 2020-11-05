<template>
  <div class="cari-desa">
    <div class="list-card-desa">
      <!-- card desa -->
      <div
        class="card-desa"
        v-for="(item, index) in list_desa"
        :key="index"
        @click="$router.push('/desa/' + item.id)"
        style="cursor: pointer"
      >
        <div class="text-card">
          <p class="nama-desa">Desa {{ item.nama_desa }}</p>
          <p class="lokasi" style="text-transform: capitalize">
            {{ item.kota_desa }}, {{ item.provinsi_desa }}
          </p>

          <div class="list-potensi-desa">
            <span v-for="(kategori, i) in item.kategori" :key="i">
              {{ kategori }}
            </span>
          </div>
        </div>
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
