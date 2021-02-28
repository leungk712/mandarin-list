<template>
  <v-app>
    <v-toolbar color="#8bbf9f" max-height="7vh">
      <v-toolbar-title class="white--text font-weight-bold">
        Mandarin List
      </v-toolbar-title>
      <v-icon
        data-testid="navbar-home-btn"
        class="navbar-home-btn ml-4"
        color="white"
        @click="handleReturnHome"
      >
        home
      </v-icon>
      <v-spacer />
      <v-avatar
        v-if="user && userInfo"
        class="mr-2 white--text"
        color="teal"
        size="48"
        tile
      >
        {{ userInitials }}
      </v-avatar>
      <v-spacer />
      <v-btn
        data-testid="app-login-btn"
        class="app-login-btn"
        @click="handleLogin"
        color="black lighten-1 white--text"
        outlined
      >
        {{ user.isLoggedIn ? "Logout" : "Login" }}
        <v-icon class="mr-2">login</v-icon>
      </v-btn>
    </v-toolbar>
    <transition appear name="slide-x-transition" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { UserState } from "@/models";
import router from "@/router";
import UserModule from "@/store/modules/user";
import NavigationDrawer from "@/components/NavigationDrawer";

const user = namespace(UserModule.name);

@Component({
  name: "App",
  components: { NavigationDrawer }
})
export default class App extends Vue {
  // ===== Store ===== //
  @State("user") public user!: UserState;
  @user.Action("logout") public logout!: () => void;

  // ===== Data ===== //

  // ===== Methods ===== //
  public handleReturnHome(): void {
    if (this.user.isLoggedIn) {
      router.push({ name: "Dashboard" });
    } else {
      router.push({ name: "Home" });
    }
  }

  public async handleLogin(): Promise<void> {
    if (!this.user.isLoggedIn) {
      router.push({ name: "AppLogin" });
    } else {
      await this.logout().then(() => {
        router.push({ name: "Home" }).catch(() => {
          return true;
        });
      });
    }
  }

  // ===== Computed ===== //
  get userInfo() {
    return this.user.user;
  }
  get userInitials() {
    return `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(
      0
    )}`;
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
