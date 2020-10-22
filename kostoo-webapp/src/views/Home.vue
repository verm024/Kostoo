<template>
  <div class="home">
    <topNav />
    <div class="view">
      <router-view></router-view>
    </div>
    <bottomNav />
  </div>
</template>

<script>
import topNav from "@/components/TopNav";
import bottomNav from "@/components/BottomNav";

export default {
  components: {
    topNav,
    bottomNav
  }
};
</script>
