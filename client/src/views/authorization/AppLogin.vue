<template>
    <div>
        <v-container>
            <ValidationObserver 
                ref="observer"
            >
                <v-form @submit.prevent="handleSubmit">
                    <ValidationProvider
                        name="firstName"
                        rules="required|min:3"
                        v-slot="{ errors }"
                    >   
                        <v-text-field 
                            data-testid="app-login-fName-input"
                            class="app-login-fName-input"
                            v-model="register.firstName"
                            label="First Name"
                            type="text"
                        />
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                        name="lastName"
                        rules="required"
                        v-slot="{ errors }"
                    >   
                        <v-text-field 
                            data-testid="app-login-lName-input"
                            class="app-login-lName-input"
                            v-model="register.lastName"
                            label="Last Name"
                            type="text"
                        />
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                        name="email"
                        rules="required"
                        v-slot="{ errors }"
                    >   
                        <v-text-field 
                            data-testid="app-login-email-input"
                            class="app-login-email-input"
                            v-model="register.email"
                            label="Email"
                            type="email"
                        />
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                        name="password"
                        :rules="{ required: true, passwordValidation: true }"
                        v-slot="{ errors }"
                    >   
                        <v-text-field 
                            data-testid="app-login-password-input"
                            class="app-login-password-input"
                            v-model="register.password"
                            label="Password"
                            type="password"
                            hint="Password must contain minimum 8 characters, 1 number, and 1 special character"
                        />
                        <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                </v-form>
            </ValidationObserver>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: "AppLogin"
})
export default class AppLogin extends Vue {
    // ===== Store ===== //

    // ===== Data ===== //
    public confirmPassword: "";
    public register = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    // ===== Methods ===== //

    // ===== Computed ===== //
    
}
</script>