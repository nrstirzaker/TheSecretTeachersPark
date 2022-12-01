<template>
  <div class="login">
    <Authenticator />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";

export default defineComponent({
  name: 'Login',
  components: {
    Authenticator,
  },
});
</script>
