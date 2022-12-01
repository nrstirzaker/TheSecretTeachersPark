<template>
  <div class="secure">
    <h3>Only available if logged in</h3>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <authenticator>
      <template v-slot="{user,signOut}">
        <h3>{{user.attributes.email}}</h3>
        <button @click="appSignOut()">Sign out</button>
      </template>
    </authenticator>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import {Authenticator} from "@aws-amplify/ui-vue";
import { Auth } from "aws-amplify";

export default defineComponent({
  name: "Secure",
  components: {Authenticator},
  methods : {
    appSignOut: function(){
      Auth.signOut();
      this.$router.push('home');

    }
  }
});
</script>
