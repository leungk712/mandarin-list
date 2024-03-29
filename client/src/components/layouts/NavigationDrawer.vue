<template>
  <div class="ma-4 pa-4">
    <v-card>
      <v-navigation-drawer
        data-testid="navigation-drawer"
        class="navigation-drawer"
        app
        expand-on-hover
        mini-variant-width="60"
        clipped
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar
              v-if="user && userInfo"
              class="mr-2 white--text"
              :color="user.avatarColor"
              size="48"
              tile
            >
              {{ userInitials }}
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content v-if="user && userInfo">
              <v-list-item-title class="title">
                {{ userInfo.firstName }} {{ userInfo.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ userInfo.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >China <v-icon small>schedule</v-icon>:
                {{ clock }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list nav dense>
          <v-list-item
            data-testid="nav-drawer-dashboard-link"
            class="nav-drawer-dashboard-link"
            link
            :to="{ name: 'Dashboard' }"
          >
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item
            data-testid="nav-drawer-profile-link"
            class="nav-drawer-profile-link"
            link
            :to="{ name: 'Profile' }"
          >
            <v-list-item-icon>
              <v-icon>person</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item
            data-testid="nav-drawer-travel-link"
            class="nav-drawer-travel-link"
            link
            :to="{ name: 'TravelChina' }"
          >
            <v-list-item-icon>
              <v-icon>map</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Travel China</v-list-item-title>
          </v-list-item>
          <v-list-item
            data-testid="nav-drawer-resources-link"
            class="nav-drawer-resources-link"
            link
            :to="{ name: 'Resources' }"
          >
            <v-list-item-icon>
              <v-icon>folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Resources</v-list-item-title>
          </v-list-item>
          <v-list-item
            data-testid="nav-drawer-code-link"
            class="nav-drawer-code-link"
            link
            :to="{ name: 'Code' }"
          >
            <v-list-item-icon>
              <v-icon>code</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item
            data-testid="nav-drawer-logout-link"
            class="nav-drawer-logout-link"
            link
            @click="handleLogout"
          >
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { UserData, UserState } from "@/models";
import router from "@/router";
import UserModule from "@/store/modules/user";
import moment from "moment-timezone";

const user = namespace(UserModule.name);

@Component({
  name: "NavigationDrawer"
})
export default class NavigationDrawer extends Vue {
  // ===== Store ===== //
  @State("user") public user!: UserState;
  @user.Action("logout") public logout!: () => void;

  // ===== Data ===== //
  public clock = "";

  // ===== Methods ===== //
  public async handleLogout(): Promise<void> {
    await this.logout();
    router.push({ name: "Home" }).catch(() => {
      return true;
    });
  }

  public handleChinaTime(): void {
    this.clock = moment
      .utc()
      .tz("Asia/Shanghai")
      .format("MM/DD, h:mm:ss a");
  }

  // ===== Computed ===== //
  get userInfo(): UserData {
    return this.user.user!;
  }
  get userInitials(): string {
    return this.userInfo
      ? `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(
          0
        )}`
      : "";
  }

  // ===== Lifecycle Hooks ===== //
  private mounted() {
    setInterval(() => {
      this.handleChinaTime();
    }, 1000);
  }
}
</script>
