<template>
  <div class="pesan container">
    <div
      class="card-pesan"
      v-for="(item, index) in daftar_pesan"
      :key="index"
      @click="$router.push('/pesan/' + item.id)"
    >
      <div class="icon">
        <svg
          width="50"
          height="50"
          viewBox="-42 0 512 512.002"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="userProfile.role == 'investor'"
        >
          <path
            d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"
            fill="#ffffff"
          />
          <path
            d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"
            fill="#ffffff"
          />
        </svg>
        <svg
          v-else
          id="bold"
          enable-background="new 0 0 24 24"
          height="70"
          viewBox="0 0 24 24"
          width="70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="m13.03 1.87-10.99-1.67c-.51-.08-1.03.06-1.42.39-.39.34-.62.83-.62 1.34v21.07c0 .55.45 1 1 1h3.25v-5.25c0-.97.78-1.75 1.75-1.75h2.5c.97 0 1.75.78 1.75 1.75v5.25h4.25v-20.4c0-.86-.62-1.59-1.47-1.73zm-7.53 12.88h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm5 9h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
          />
          <path
            fill="#ffffff"
            d="m22.62 10.842-7.12-1.491v14.649h6.75c.965 0 1.75-.785 1.75-1.75v-9.698c0-.826-.563-1.529-1.38-1.71zm-2.37 10.158h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
          />
        </svg>
      </div>
      <div class="content" v-if="userProfile.role == 'investor'">
        <div class="judul">Desa {{ item.desa.nama_desa }}</div>
        <div class="deskripsi" v-if="last_pesan[index]">
          {{ last_pesan[index].content.slice(0, 15) }}
        </div>
      </div>
      <div class="content" v-else-if="userProfile.role == 'desa'">
        <div class="judul">
          {{ item.investor.nama_perusahaan }}
        </div>
        <div class="deskripsi" v-if="last_pesan[index]">
          {{ last_pesan[index].content.slice(0, 15) }}
        </div>
      </div>
    </div>
    <div v-if="daftar_pesan.length == 0" class="empty">
      Belum ada pesan
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_pesan: [],
      last_pesan: []
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_daftar_pesan: {
      immediate: true,
      async handler() {
        if (this.userProfile.role == "desa") {
          await this.$bind(
            "daftar_pesan",
            firebase.db
              .collection("pesan")
              .where(
                "desa",
                "==",
                firebase.db.collection("users").doc(this.currentUser.uid)
              )
              .orderBy("tanggal_pesan", "desc")
          );
        } else {
          let self = this;
          await this.$bind(
            "daftar_pesan",
            firebase.db
              .collection("pesan")
              .where(
                "investor",
                "==",
                firebase.db.collection("users").doc(this.currentUser.uid)
              )
              .orderBy("tanggal_pesan", "desc")
          );
        }
        this.daftar_pesan.forEach(element => {
          firebase.db
            .collection("pesan")
            .doc(element.id)
            .collection("pesan")
            .limit(1)
            .orderBy("tanggal_dikirim", "desc")
            .get()
            .then(doc => {
              if (doc.docs.length > 0) {
                let data = doc.docs[0].data();
                this.last_pesan.push(data);
              } else {
                this.last_pesan.push({ content: "" });
              }
            });
        });
      }
    }
  }
};
</script>

<style scoped>
.card-pesan {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.04);
  align-items: center;
  margin-bottom: 20px;
}

.content {
  margin-left: 20px;
}

.icon {
  display: flex;
  width: 50px;
  height: 50px;
  background: #5bc77a;
  border-radius: 100px;
}

.judul {
  color: #333333;
  font-weight: 600;
  font-size: 18px;
}

.pesan .deskripsi {
  font-size: 16px;
  margin-top: 5px;
}

.empty {
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
  color: #89969f;
}
</style>
