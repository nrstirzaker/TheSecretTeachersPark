<template>
  <div class="home">
    <p>
      <router-link :to="{ name: 'About' }">
        About
      </router-link>
    </p>
    <p>
      <router-link :to="{ name: 'Home' }">
        Home
      </router-link>
    </p>
    <p>
      <router-link :to="{ name: 'Secure' }">
        Secure
      </router-link>
    </p>

    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
});
</script>
