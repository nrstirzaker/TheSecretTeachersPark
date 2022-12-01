import { createApp } from "vue";
import App from "./App.vue";
import { Auth,Hub  } from "aws-amplify";
import { createRouter,createWebHashHistory  } from "vue-router";
import awsConfig from "./aws-exports";
import "@aws-amplify/ui-vue/styles.css";
import About from "./components/About.vue";
import Home from "./components/Home.vue";
import Secure from "./components/Secure.vue";
import Login from "./components/Login.vue";


Auth.configure(awsConfig);

import "./assets/main.css";
const routes = [
  { path: "/", name: "Home", component: App },
  { path: "/about", name: "About", component: About },
  { path: "/home", name: "Home", component: Home },
  {
    path: "/secure",
    name: "Secure",
    component: Secure,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: Login },
];

const router = new createRouter({history:createWebHashHistory(),
  routes: routes,
});

// const listener = async (data) => {
//   switch (data.payload.event) {
//     case "signIn":
//       console.log("user signed in");
//       break;
//     case "signUp":
//       console.log("user signed up");
//       break;
//     case "signOut":
//       console.log("user signed out");
//       break;
//     case "signIn_failure":
//       console.log.error("user sign in failed");
//       break;
//     case "tokenRefresh":
//       console.log("token refresh succeeded");
//       break;
//     case "tokenRefresh_failure":
//       console.log.error("token refresh failed");
//       break;
//     case "autoSignIn":
//       console.log("Auto Sign In after Sign Up succeeded");
//       break;
//     case "autoSignIn_failure":
//       console.log("Auto Sign In after Sign Up failed");
//       break;
//     case "configured":
//       console.log("the Auth module is configured");
//   }
// }


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next();
      })
      .catch(() => {
        let redirect = {};
        if (!to.query.redirect) {
          redirect = {redirect: to.path};
        }
        // redirect to login
        next({path: '/login', query: redirect});

      });
  } else {
    next();
  }
});

Hub.listen("auth", async (data) => {
 if (data.payload.event === 'signIn') {
    let redirect = router.currentRoute.value.query.redirect;
    router.push({path: redirect});
  }
});
const app = createApp(App);
app.use(router);
app.mount("#app");
