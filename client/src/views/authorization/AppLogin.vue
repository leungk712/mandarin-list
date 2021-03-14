<template>
  <div>
    <v-row justify="center" class="mt-4">
      <v-col cols="4">
        <v-card class="pa-4" color="grey lighten-5">
          <v-card-title class="pl-0">
            <h3>{{ loginView ? "Login" : "Register" }}</h3>
          </v-card-title>
          <application-alert />
          <v-divider />
          <v-form
            v-if="!loginView"
            ref="form"
            @submit.prevent="handleLoginRegister"
          >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  data-testid="register-first-name-input"
                  class="register-first-name-input"
                  v-model="registerUser.firstName"
                  label="First Name"
                  type="text"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  data-testid="register-last-name-input"
                  class="register-last-name-input"
                  v-model="registerUser.lastName"
                  label="Last Name"
                  type="text"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-0 pt-0">
                <v-text-field
                  data-testid="register-email-input"
                  class="register-email-input"
                  v-model="registerUser.email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="email"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-0 pt-0">
                <v-text-field
                  data-testid="register-password-input"
                  class="register-last-name-input"
                  v-model="registerUser.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  prepend-inner-icon="lock"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-0 pt-0">
                <v-text-field
                  data-testid="register-confirm-password-input"
                  class="register-confirm-password-input"
                  v-model="registerUser.confirmPassword"
                  label="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-icon="
                    showConfirmPassword ? 'visibility' : 'visibility_off'
                  "
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  prepend-inner-icon="lock"
                  required
                />
              </v-col>
            </v-row>
          </v-form>
          <v-form @submit.prevent="handleLoginRegister" v-if="loginView">
            <v-text-field
              data-testid="login-email-input"
              class="login-email-input"
              v-model="loginUser.email"
              label="Email"
              type="email"
              prepend-inner-icon="email"
            />
            <v-text-field
              data-testid="login-password-input"
              class="login-password-input"
              v-model="loginUser.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
              prepend-inner-icon="lock"
            />
          </v-form>
          <v-row class="ml-1">
            <p class="font-weight-bold subtitle-2 mr-4" v-if="!loginView">
              Already have an account?
              <a
                data-testid="login-link"
                class="login-link"
                @click="handleLoginView"
              >
                Login
              </a>
            </p>
            <p class="font-weight-bold subtitle-2 mr-4" v-else-if="loginView">
              Create an account (
              <a
                data-testid="register-link"
                class="register-link"
                @click="handleLoginView"
              >
                Register
              </a>
              )
            </p>
          </v-row>

          <v-row class="mr-1 my-1">
            <v-spacer />
            <v-btn
              data-testid="submit-login-register-btn"
              class="submit-login-register-btn"
              color="blue lighten-grey darken-2 white--text"
              @click="handleLoginRegister"
              :disabled="!validForm"
            >
              {{ loginView ? "Login" : "Register" }}
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import UserModule from "@/store/modules/user";
import { LoginPayload, RegisterPayload } from "@/models";
import router from "@/router";
import ApplicationAlert from "@/components/ApplicationAlert.vue";

const user = namespace(UserModule.name);

@Component({
  name: "AppLogin",
  components: { ApplicationAlert }
})
export default class AppLogin extends Vue {
  // ===== Store ===== //
  @user.Action("login") public login!: (payload: LoginPayload) => void;
  @user.Action("register") public register!: (payload: RegisterPayload) => void;

  // ===== Data ===== //
  public loginUser: LoginPayload = {
    email: "",
    password: ""
  };
  public registerUser: RegisterPayload = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  public loginView = false;
  public showPassword = false;
  public showConfirmPassword = false;

  // ===== Methods ===== //
  public async handleLoginRegister(): Promise<void> {
    if (this.loginView) {
      await this.login(this.loginUser)
      router.push({ name: "Dashboard" }).catch(() => {
        return true;
      });
    } else {
      this.register(this.registerUser);
    }
    this.clearInfo();
  }

  public handleLoginView(): void {
    this.loginView = !this.loginView;
  }

  public clearInfo(): void {
    this.loginUser.email = "";
    this.loginUser.password = "";

    this.registerUser.firstName = "";
    this.registerUser.lastName = "";
    this.registerUser.email = "";
    this.registerUser.password = "";
    this.registerUser.confirmPassword = "";
  }

  // ===== Computed ===== //
  get passwordsValid(): boolean {
    return this.registerUser.password === this.registerUser.confirmPassword;
  }
  get validForm(): boolean {
    if (this.loginView) {
      return !!(this.loginUser.email && this.loginUser.password);
    }

    return !!(
      this.registerUser.firstName &&
      this.registerUser.lastName &&
      this.registerUser.email &&
      this.registerUser.password &&
      this.registerUser.confirmPassword &&
      this.passwordsValid
    );
  }
}
</script>
