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

@Component({
  name: "AppRegister"
})
export default class AppRegister extends Vue {}
</script>
