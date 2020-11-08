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

      <div
        class="card-mou"
        v-if="data_proyek.status_proyek != 'waiting'"
        @click="handleClickMou"
      >
        <div class="text-card">
          <p class="judul">MoU Kerjasama</p>
          <p class="tanggal-mou">
            {{ formatDate(data_proyek.tanggal_mou.seconds) }}
          </p>
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
        <a class="download-button" :href="file_proyek.detail_proyek">
          <svg
            id="bold"
            enable-background="new 0 0 24 24"
            height="22"
            viewBox="0 0 24 24"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="m12 16c-.205 0-.401-.084-.542-.232l-5.25-5.5c-.455-.476-.117-1.268.542-1.268h2.75v-5.75c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25v5.75h2.75c.659 0 .997.792.542 1.268l-5.25 5.5c-.141.148-.337.232-.542.232z"
            />
            <path
              fill="#ffffff"
              d="m22.25 22h-20.5c-.965 0-1.75-.785-1.75-1.75v-.5c0-.965.785-1.75 1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"
            />
          </svg>

          Download</a
        >
      </p>
    </div>
    <!-- end of detail proyek -->

    <!-- detail proyek -->
    <div class="deskripsi-proyek">
      <p class="judul-text">Status Proyek</p>
      <p class="deskripsi">
        {{ menentukanStatus(data_proyek.status_proyek) }}
      </p>
    </div>
    <!-- end of detail proyek -->

    <!-- progress proyek -->
    <div
      class="progress-proyek"
      v-if="
        !(
          data_proyek.status_proyek == 'waiting' ||
          data_proyek.status_proyek == 'waiting2'
        )
      "
    >
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
        userProfile.role == 'desa' && data_proyek.status_proyek == 'ongoing'
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

    <!-- Temporary tambah MOU dan setujui proyek (desa) -->

    <div
      v-if="
        userProfile.role == 'desa' && data_proyek.status_proyek == 'waiting'
      "
      class="deskripsi-proyek"
    >
      <p class="judul-text">Upload MoU dan Konfirmasi</p>
      <div>
        <!-- input file -->
        <input @change="handleFileChange" type="file" id="actual-btn" hidden />

        <!-- Button upload -->
        <label for="actual-btn">Upload MoU</label>

        <!-- nama file -->
        <span class="deskripsi" id="file-chosen">Belum upload file</span>

        <div style="text-align:center;margin-top:24px">
          <button class="orange-button" @click="setujuiProyek">
            Konfirmasi Proyek
          </button>
        </div>
      </div>
    </div>

    <!-- end of Temporary tambah MOU dan setujui proyek (desa) -->

    <!-- Temporary konfirmasi proyek (investor) -->
    <div
      id="button-konfirmasi-mou"
      v-if="
        userProfile.role == 'investor' &&
          data_proyek.status_proyek == 'waiting2'
      "
    >
      <button class="setuju" @click="setujuiMou">Setujui</button>
      <button class="tolak" @click="tolakMou">Tolak</button>
    </div>
    <!-- end of Temporary konfirmasi proyek (investor) -->
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
      },
      file_proyek: {
        detail_proyek: "",
        mou_proyek: ""
      },
      form_konfirmasi: {
        mou_proyek: ""
      },
      namaFileMou: null
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    menentukanStatus(status) {
      if (status === `waiting`) return "Sedang Menunggu Konfirmasi..";
      if (status === "waiting2")
        return "MoU telah diupload, sedang menunggu konfirmasi..";
      if (status === "ongoing") return "Sedang dalam pengerjaan..";
      else return "Telah selesai dilaksanakan..";
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
    },
    async setujuiProyek() {
      if (this.form_konfirmasi.mou_proyek != "") {
        let ref = firebase.storage
          .ref()
          .child("/mou/" + this.$route.params.id + ".pdf");
        try {
          let task = await ref.put(this.form_konfirmasi.mou_proyek);
          await firebase.db
            .collection("proyek")
            .doc(this.$route.params.id)
            .update({ status_proyek: "waiting2", tanggal_mou: new Date() });
        } catch (error) {
          console.error(error);
        }
      }
    },
    async tolakProyek() {
      try {
        await firebase.db
          .collection("proyek")
          .doc(this.$route.params.id)
          .update({ status_proyek: "canceled" });
      } catch (error) {
        console.error(error);
      }
    },
    async setujuiMou() {
      try {
        await firebase.db
          .collection("proyek")
          .doc(this.$route.params.id)
          .update({ status_proyek: "ongoing" });
      } catch (error) {
        console.error(error);
      }
    },
    async tolakMou() {
      try {
        await firebase.db
          .collection("proyek")
          .doc(this.$route.params.id)
          .update({ status_proyek: "waiting" });
      } catch (error) {
        console.error(error);
      }
    },
    handleFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!files[0].type.includes("pdf")) {
        this.form_konfirmasi.mou_proyek = "";
      } else {
        this.form_konfirmasi.mou_proyek = files[0];
        document.getElementById("file-chosen").innerHTML = files[0].name;
      }
    },
    handleClickMou() {
      window.location.href = this.file_proyek.mou_proyek;
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
  },
  async created() {
    let ref = firebase.storage
      .ref()
      .child("/proyek/" + this.$route.params.id + ".pdf");
    try {
      let url = await ref.getDownloadURL();
      this.file_proyek.detail_proyek = url;
    } catch (error) {
      console.error(error);
    }
    if (this.data_proyek.status_proyek != "waiting") {
      ref = firebase.storage
        .ref()
        .child("/mou/" + this.$route.params.id + ".pdf");
      try {
        let url = await ref.getDownloadURL();
        this.file_proyek.mou_proyek = url;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/proyek.css");
label {
  background-color: #5bc77a;
  color: white;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}

#file-chosen {
  margin-left: 0.3rem;
  font-family: sans-serif;
}
</style>
