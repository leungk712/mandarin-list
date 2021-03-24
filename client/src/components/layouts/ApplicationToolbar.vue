<template>
  <v-app-bar color="#8bbf9f" max-height="10vh" app clipped-left>
    <v-icon
      v-if="!nonDashboard"
      data-testid="navbar-home-btn"
      class="navbar-home-btn"
      color="white"
      @click="handleReturnHome"
    >
      home
    </v-icon>
    <v-spacer />
    <h3 class="white--text font-weight-bold ml-4">Mandarin List</h3>
    <v-spacer />
    <v-icon
      v-if="nonDashboard"
      data-testid="navbar-login-btn"
      class="navbar-login-btn"
      color="white"
      @click="handleLogin"
    >
      login
    </v-icon>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { UserState } from "@/models";
import router from "@/router";
import UserModule from "@/store/modules/user";

const user = namespace(UserModule.name);

@Component({
  name: "ApplicationToolbar",
  components: {}
})
export default class ApplicationToolbar extends Vue {
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
    }

    router.push({ name: "Dashboard" });
  }

  // ===== Computed ===== //

  get nonDashboard(): boolean {
    return this.$route.name === "Home";
  }
  get userInfo() {
    return this.user.user;
  }
  get userInitials() {
    return this.userInfo
      ? `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(
          0
        )}`
      : "";
  }
}
</script>
