<template>
  <div class="home">
    <topNav />
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/TopNav";

export default {
  components: {
    topNav
  }
};
</script>
