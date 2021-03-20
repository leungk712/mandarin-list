<template>
  <v-container fluid fill-height>
    <ApplicationToolbar />
    <v-row justify="center" align="center">
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
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    data-testid="register-first-name-input"
                    class="register-first-name-input"
                    v-model="registerUser.firstName"
                    label="First Name"
                    type="text"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    data-testid="register-last-name-input"
                    class="register-last-name-input"
                    v-model="registerUser.lastName"
                    label="Last Name"
                    type="text"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-0 pt-0">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    data-testid="register-email-input"
                    class="register-email-input"
                    v-model="registerUser.email"
                    label="Email"
                    type="email"
                    prepend-inner-icon="email"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <ValidationObserver>
              <v-row>
                <v-col class="mt-0 pt-0">
                  <ValidationProvider
                    :rules="passwordRules"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      data-testid="register-password-input"
                      class="register-last-name-input"
                      v-model="registerUser.password"
                      label="Password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="
                        showPassword ? 'visibility' : 'visibility_off'
                      "
                      @click:append="showPassword = !showPassword"
                      prepend-inner-icon="lock"
                      required
                      :error-messages="errors"
                      :hint="!passwordValid ? passwordRequirementsText : ''"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-0 pt-0">
                  <ValidationProvider
                    :rules="confirmedPasswordRules"
                    vid="password_confirmation"
                    v-slot="{ errors }"
                  >
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
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-form>
          <v-form @submit.prevent="handleLoginRegister" v-if="loginView">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <v-text-field
                data-testid="login-email-input"
                class="login-email-input"
                v-model="loginUser.email"
                label="Email"
                type="email"
                prepend-inner-icon="email"
                :error-messages="errors"
              />
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                data-testid="login-password-input"
                class="login-password-input"
                v-model="loginUser.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                @click:append="showPassword = !showPassword"
                prepend-inner-icon="lock"
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-form>
          <v-row class="ml-1 mt-2">
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import UserModule from "@/store/modules/user";
import { LoginPayload, RegisterPayload } from "@/models";
import router from "@/router";
import ApplicationAlert from "@/components/ApplicationAlert.vue";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { passwordRequirementsText } from "@/helpers/login";

const user = namespace(UserModule.name);

@Component({
  name: "AppLogin",
  components: {
    ApplicationAlert,
    ApplicationToolbar,
    ValidationObserver,
    ValidationProvider
  }
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
  public passwordRequirementsText = passwordRequirementsText;

  // ===== Methods ===== //
  public async handleLoginRegister(): Promise<void> {
    if (this.loginView) {
      await this.login(this.loginUser);
      router.push({ name: "Dashboard" }).catch(() => {
        return true;
      });
    } else {
      await this.register(this.registerUser);
      this.loginView = true;
      this.clearInfo();
    }
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
  get confirmedPasswordRules() {
    return { required: true };
  }
  get passwordsMatch(): boolean {
    return this.registerUser.password === this.registerUser.confirmPassword;
  }
  get passwordRegex() {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  }
  get passwordRules() {
    return {
      passwordValidation: this.passwordRegex,
      confirmed: `password_confirmation`,
      required: true
    };
  }
  get passwordValid(): boolean {
    return !!this.passwordRegex.test(this.registerUser.password);
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
      this.passwordValid &&
      this.passwordsMatch
    );
  }

  // ===== Lifecycle Hooks ===== //
  private beforeDestroy() {
    this.clearInfo();
  }
}
</script>
