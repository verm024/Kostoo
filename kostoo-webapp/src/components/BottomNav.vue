<template>
  <div class="bottom-nav">
    <a
      class="nav-object"
      @click="
        () => {
          handleNav('/investor');
        }
      "
    >
      <svg
        width="23"
        height="22"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 4H14V2C14 0.89 13.11 0 12 0H8C6.89 0 6 0.89 6 2V4H2C0.89 4 0.00999999 4.89 0.00999999 6L0 17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V6C20 4.89 19.11 4 18 4ZM12 4H8V2H12V4Z"
          :fill="
            $route.meta.navCategory.includes('proyek') ? '#5BC77A' : '#B8C5D0'
          "
        />
      </svg>
      <span :class="$route.meta.navCategory.includes('proyek') ? 'active' : ''"
        >Proyek</span
      >
    </a>

    <!-- cari desa untuk investor -->
    <a
      v-if="userProfile.role === 'investor'"
      class="nav-object"
      @click="
        () => {
          handleNav('/cari-desa');
        }
      "
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.438 14.4654H15.3991L15.0309 14.1103C16.3196 12.6112 17.0955 10.665 17.0955 8.54774C17.0955 3.82676 13.2687 0 8.54774 0C3.82676 0 0 3.82676 0 8.54774C0 13.2687 3.82676 17.0955 8.54774 17.0955C10.665 17.0955 12.6112 16.3196 14.1103 15.0309L14.4654 15.3991V16.438L21.0406 23L23 21.0406L16.438 14.4654V14.4654ZM8.54774 14.4654C5.2733 14.4654 2.63007 11.8222 2.63007 8.54774C2.63007 5.2733 5.2733 2.63007 8.54774 2.63007C11.8222 2.63007 14.4654 5.2733 14.4654 8.54774C14.4654 11.8222 11.8222 14.4654 8.54774 14.4654Z"
          :fill="
            $route.meta.navCategory.includes('cari') ? '#5BC77A' : '#B8C5D0'
          "
        />
      </svg>

      <span :class="$route.meta.navCategory.includes('cari') ? 'active' : ''"
        >Cari Desa</span
      >
    </a>

    <!-- portofolio untuk desa -->
    <a
      v-else
      class="nav-object"
      @click="
        () => {
          handleNav(`/desa/${currentUser.uid}`);
        }
      "
    >
      <svg
        width="23"
        height="27"
        viewBox="0 0 23 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.42105 11.1821V19.8793H6.05263V11.1821H2.42105ZM9.68421 11.1821V19.8793H13.3158V11.1821H9.68421ZM0 26.0916H23V22.3642H0V26.0916ZM16.9474 11.1821V19.8793H20.5789V11.1821H16.9474ZM11.5 0L0 6.21229V8.6972H23V6.21229L11.5 0Z"
          :fill="
            $route.meta.navCategory.includes('portofolio')
              ? '#5BC77A'
              : '#B8C5D0'
          "
        />
      </svg>

      <span
        :class="$route.meta.navCategory.includes('portofolio') ? 'active' : ''"
        >Portofolio</span
      >
    </a>

    <a
      class="nav-object"
      @click="
        () => {
          handleNav('/pesan');
        }
      "
    >
      <svg
        width="29"
        height="27"
        viewBox="0 0 29 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.49549 10.8896C3.82438 11.1067 4.8158 11.7514 6.46979 12.8234C8.12382 13.8954 9.39093 14.7209 10.2712 15.2997C10.3679 15.3632 10.5733 15.5011 10.8876 15.7137C11.202 15.9265 11.4632 16.0984 11.671 16.2296C11.879 16.3607 12.1305 16.5077 12.4256 16.6705C12.7207 16.8332 12.9988 16.9555 13.26 17.0365C13.5212 17.1182 13.763 17.1586 13.9854 17.1586H14H14.0146C14.2371 17.1586 14.479 17.1181 14.7402 17.0365C15.0012 16.9555 15.2796 16.833 15.5744 16.6705C15.8694 16.5075 16.1208 16.3606 16.3288 16.2296C16.5368 16.0984 16.7978 15.9265 17.1123 15.7137C17.4265 15.5009 17.6322 15.3632 17.729 15.2997C18.6187 14.7209 20.8823 13.2507 24.5191 10.8893C25.2251 10.4281 25.815 9.8716 26.2889 9.22018C26.7631 8.56905 27 7.88597 27 7.17134C27 6.57415 26.7702 6.06295 26.3107 5.63778C25.8512 5.21251 25.307 5 24.6785 5H3.32133C2.57659 5 2.00346 5.23519 1.60205 5.70556C1.20068 6.17603 1 6.76409 1 7.46969C1 8.03964 1.26609 8.65727 1.798 9.32219C2.32987 9.98715 2.89588 10.5097 3.49549 10.8896Z"
          :fill="
            $route.meta.navCategory.includes('pesan') ? '#5BC77A' : '#B8C5D0'
          "
        />
        <path
          d="M25.5489 12.3415C22.3766 14.3497 19.9679 15.9105 18.3237 17.0234C17.7724 17.4032 17.3251 17.6997 16.9817 17.9122C16.6382 18.1248 16.1814 18.3419 15.6106 18.5634C15.04 18.7853 14.5082 18.8959 14.0148 18.8959H14.0001H13.9855C13.4922 18.8959 12.9601 18.7853 12.3895 18.5634C11.8189 18.3419 11.3618 18.1248 11.0184 17.9122C10.6752 17.6997 10.2278 17.4032 9.67648 17.0234C8.3706 16.1278 5.96699 14.5669 2.46555 12.3415C1.91407 11.9979 1.4256 11.6041 1 11.1609V21.9356C1 22.533 1.22721 23.044 1.68188 23.4692C2.13645 23.8945 2.68305 24.1071 3.32149 24.1071H24.6787C25.317 24.1071 25.8636 23.8945 26.3182 23.4692C26.7729 23.0438 27.0001 22.5331 27.0001 21.9356V11.1609C26.5841 11.5949 26.1006 11.9887 25.5489 12.3415Z"
          :fill="
            $route.meta.navCategory.includes('pesan') ? '#5BC77A' : '#B8C5D0'
          "
        />
      </svg>

      <span :class="$route.meta.navCategory.includes('pesan') ? 'active' : ''"
        >Pesan</span
      >
    </a>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile", "currentUser"])
  },
  methods: {
    handleNav(toRoute) {
      if (this.userProfile.role == "desa" && toRoute == "/investor") {
        toRoute = "/desa";
      }
      if (this.$route.fullPath != toRoute) {
        this.$router.push(toRoute);
      }
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/navbar.css");
</style>
