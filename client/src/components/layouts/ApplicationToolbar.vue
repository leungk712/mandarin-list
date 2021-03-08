<template>
    <v-app-bar color="#8bbf9f" max-height="10vh" app clipped-left>
        <v-icon
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
        <!-- <v-btn
            data-testid="app-login-btn"
            class="app-login-btn"
            @click="handleLogin"
            color="black lighten-1 white--text"
            outlined
        >
            {{ user.isLoggedIn ? "Logout" : "Login" }}
            <v-icon class="mr-2">login</v-icon>
        </v-btn> -->
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    }

    // ===== Computed ===== //
    get userInfo() {
        return this.user.user;
    }
    get userInitials() {
        return this.userInfo ? `${this.userInfo.firstName.charAt(0)}${this.userInfo.lastName.charAt(0)}` : '';
    }
}
</script>
