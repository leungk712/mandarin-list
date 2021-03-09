<template>
  <div class="ma-4 pa-4">
    <v-card>
      <v-navigation-drawer
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
        </v-list>

        <v-divider />

        <v-list nav dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>person</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'TravelChina' }">
            <v-list-item-icon>
              <v-icon>map</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Travel China</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'Resources' }">
            <v-list-item-icon>
              <v-icon>folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Resources</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="handleLogout">
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
import { UserState } from "@/models";
import router from "@/router";
import UserModule from "@/store/modules/user";

const user = namespace(UserModule.name);

@Component({
  name: "NavigationDrawer"
})
export default class NavigationDrawer extends Vue {
    // ===== Store ===== //
    @State("user") public user!: UserState;
    @user.Action("logout") public logout!: () => void;

    // ===== Data ===== //

    // ===== Methods ===== //
    public handleLogout(): void {
        this.logout()
        router.push({ name: "Home" }).catch(() => {
          return true;
        });
    }

    // ===== Computed ===== //
    get userInfo() {
        return this.user.user;
    }
    get userInitials() {
        return this.userInfo ? `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(0)}` : "";
    }
}
</script>
