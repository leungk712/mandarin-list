<template>
    <div>
    <ApplicationToolbar />
    <v-container style="height: 90vh" fill-height>
        <v-row justify="center" align="center" class="text-center">
            <v-col cols="12">
                <v-icon class="error-icon" color="red">pan_tool</v-icon>
            </v-col>
            <v-col cols="12">
                <h1>Gee willikers! An error occured. Please login again.</h1>
            </v-col>
            <v-col cols="12">
                <v-btn
                    data-testid="error-login-btn"
                    class="error-login-btn"
                    depressed
                    outlined
                    :to="{ name: 'Home' }"
                    large
                >
                Return Home
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue"

@Component({
    name: "ErrorPage",
    components: { ApplicationToolbar }
})
export default class ErrorPage extends Vue {
    
}
</script>

<style scoped>
    .error-icon {
        font-size: 8rem;
    }
</style>