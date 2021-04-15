<template>
  <div class="landing-background">
    <ApplicationToolbar />
    <v-container class="vocab-container" fill-height>
      <v-row class="mt-4" justify="center">
        <h2 class="landing-page-header">
          Help improve your mandarin skills by building your vocabulary through creating cards and writing stories!
        </h2>
      </v-row>
      <v-row
        justify="center"
        align-content="center"
        class="my-10"
      >
        <v-col
          v-for="item in vocabItems"
          :key="item.id"
          cols="4"
          class="pa-0 ma-0"
        >
          <v-card
            :color="item.backgroundColor"
            class="vocab-card rounded-0"
            flat
          >
            <v-row
              justify="center"
              align-content="center"
              class="vocab-card-row"
            >
            <v-col>
              <p
                :class="$vuetify.breakpoint.lg ? 'display-3' :'display-4'"
                class="text-center"
              >
                {{ item.character }}
              </p>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                v-if="item.character === 'Welcome'"
                data-testid="landing-page-login-btn"
                class="landing-page-login-btn"
                color="purple lighten-1 white--text"
                @click="handleLogin"
                rounded
                depressed
              >
                Login or Register
              </v-btn>
              <p v-else class="title">{{ item.pinyin }} | {{ item.english }}</p>
            </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { UserState } from "@/models";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import { vocabItems } from "@/helpers/home";
import router from "@/router";
import UserModule from "@/store/modules/user";

const user = namespace(UserModule.name);

@Component({
  name: "LandingPage",
  components: { ApplicationToolbar }
})
export default class LandingPage extends Vue {
  // ===== Store ===== //
  @State("user") public user!: UserState;

  // ===== Data ===== //
  public vocabItems = vocabItems;

  // ===== Methods ===== //
    public async handleLogin(): Promise<void> {
    if (!this.user.isLoggedIn) {
      router.push({ name: "AppLogin" });
    }

    router.push({ name: "Dashboard" });
  }

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
}
</script>

<style scoped>
  .landing-background {
    background: #eee;
  }

  .vocab-container {
    min-height: 65vh;
  }

  .vocab-card {
    height: 35vh;
  }

  .vocab-card-row {
    height: 100%;
  }
</style>
