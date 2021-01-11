<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { namespace } from "vuex-class";
import PostsModule from "@/store/modules/posts";

const posts = namespace(PostsModule.name);

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // ===== Store ===== //
  @posts.Action("getMandarinList") public getMandarinList!: () => void;

  // ===== Lifecycle Hooks ===== //
  private created(): void {
    console.log("hello this has been created...now calling mandarin list");
    this.getMandarinList();
  }
}
</script>
