<template>
  <div class="detail-pesan">
    <div class="judul-dan-back" v-if="informasi_pesan.desa">
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

      <p v-if="userProfile.role == 'investor'">
        {{ informasi_pesan.desa.nama_desa }}
      </p>
      <p v-else>{{ informasi_pesan.investor.nama_perusahaan }}</p>
    </div>
    <div class="container list-pesan">
      <div
        :class="
          index == daftar_pesan.length - 1
            ? 'scroll-to card-detail'
            : 'card-detail'
        "
        v-for="(item, index) in daftar_pesan"
        :key="index"
      >
        <div class="wrapper left" v-if="item.sender != userProfile.role">
          <div
            class="sender"
            v-if="informasi_pesan.desa && item.sender == 'desa'"
          >
            Desa {{ informasi_pesan.desa.nama_desa }}
          </div>
          <div
            class="sender"
            v-if="informasi_pesan.desa && item.sender == 'investor'"
          >
            {{ informasi_pesan.investor.nama_perusahaan }}
          </div>
          <div class="content deskripsi">
            {{ item.content }}
          </div>
          <div class="time" v-if="item.tanggal_pesan">
            {{ formatDate(item.tanggal_pesan.seconds) }}
          </div>
        </div>
        <div class="wrapper right" v-if="item.sender == userProfile.role">
          <div class="content deskripsi">
            {{ item.content }}
          </div>
          <div class="time" v-if="item.tanggal_pesan">
            {{ formatDate(item.tanggal_pesan.seconds) }}
          </div>
        </div>
      </div>
      <div v-if="daftar_pesan.length == 0" class="empty">
        Belum ada pesan
      </div>
    </div>
    <div class="pesan-baru">
      <div class="input">
        <input type="text" v-model="pesan_baru" />
      </div>
      <div class="kirim">
        <button @click="kirimPesan">
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      daftar_pesan: [],
      informasi_pesan: [],
      pesan_baru: "",
      update_counter: 0
    };
  },
  watch: {
    get_daftar_pesan: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_pesan",
          firebase.db
            .collection("pesan")
            .doc(this.$route.params.id)
            .collection("pesan")
            .orderBy("tanggal_pesan", "asc")
        );
        this.$bind(
          "informasi_pesan",
          firebase.db.collection("pesan").doc(this.$route.params.id)
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  updated() {
    this.update_counter += 1;
    if (this.update_counter == 4) {
      this.scrollToElement();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    scrollToElement() {
      let el = this.$el.getElementsByClassName("scroll-to")[0];
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10) {
        hours = 0 + hours.toString();
      }
      if (minutes < 10) {
        minutes = 0 + minutes.toString();
      }
      date = date.getDate();
      return date + "-" + month + "-" + year + " " + hours + ":" + minutes;
    },
    async kirimPesan() {
      if (this.pesan_baru != "") {
        try {
          await firebase.db
            .collection("pesan")
            .doc(this.$route.params.id)
            .update({ tanggal_pesan: new Date() });
          await firebase.db
            .collection("pesan")
            .doc(this.$route.params.id)
            .collection("pesan")
            .add({
              content: this.pesan_baru,
              tanggal_pesan: new Date(),
              sender: this.userProfile.role
            });
        } catch (error) {
          console.error(error);
        }
        this.pesan_baru = "";
        this.scrollToElement();
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    let userProfile = store.state.userProfile;
    let currentUser = store.state.currentUser;
    if (userProfile.role == "investor") {
      let doc = await firebase.db
        .collection("pesan")
        .doc(to.params.id)
        .get();
      let data = doc.data();
      let investorRef = await data.investor.get();
      if (currentUser.uid == investorRef.id) {
        next();
      } else {
        next("/pesan");
      }
    } else {
      let doc = await firebase.db
        .collection("pesan")
        .doc(to.params.id)
        .get();
      let data = doc.data();
      let desaRef = await data.desa.get();
      if (currentUser.uid == desaRef.id) {
        next();
      } else {
        next("/pesan");
      }
    }
  }
};
</script>

<style scoped>
.judul-dan-back {
  margin-bottom: 20px;
  position: fixed;
  background: white;
  width: 100%;
  padding-left: 24px;
  margin-top: -20px;
}

.list-pesan {
  padding-top: 80px;
}

.card-detail {
  width: 100%;
}

.wrapper {
  width: 75%;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.04);
  align-items: center;
  margin-bottom: 20px;
}

.left {
  margin-right: auto;
}

.right {
  margin-left: auto;
}

.sender {
  font-size: 18px;
  color: #ec6b2a !important;
}

.content {
  margin-top: 0;
  font-size: 16px;
}

.time {
  width: fit-content;
  margin-left: auto;
  font-size: 12px;
  color: #89969f;
  font-weight: 300;
  margin-top: 20px;
}

.pesan-baru {
  z-index: 3;
  bottom: 0;
  padding: 12px;
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.04);
  border-top: 1px solid #f1f4f2;
}

.input {
  width: 100%;
}

.input input {
  border: 1px solid #dee7ee;
  font-size: 18px;
  padding: 12px 24px;
  width: 100%;
  color: #333333;
  outline: none;
  border-radius: 8px;
}

.kirim {
  width: 100px;
  height: 100%;
}

.empty {
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
  color: #89969f;
}
</style>
