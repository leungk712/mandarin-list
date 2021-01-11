<template>
  <div class="my-4">
    <CreateCharacter class="my-6" />
    <ListCard class="mt-6" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { Example, PostPayload, PostsState } from "@/models";
import CreateCharacter from "@/components/CreateCharacter.vue";
import ListCard from "@/components/ListCard.vue";
import PostsModule from "@/store/modules/posts";

const posts = namespace(PostsModule.name);

@Component({
  name: "Home",
  components: { CreateCharacter, ListCard }
})
export default class Home extends Vue {
  // ===== Store ===== //
  @State("posts") public posts!: PostsState;
  @posts.Action("getMandarinList") public getMandarinList!: () => void;
  @posts.Action("submitMandarinExample") public submitMandarinExample!: (
    payload: PostPayload
  ) => void;

  // ===== Data ===== //
  public newExample: PostPayload = {
    character: "",
    pinyin: "",
    english: "",
    examples: [],
    starred: false,
    date: new Date()
  };

  public example: Example = {
    id: Math.floor(Math.random() * 1000),
    sentence: ""
  };

  // ===== Methods ===== //
  public handleAddExample() {
    this.newExample.examples?.push(this.example);
    this.example = {
      id: Math.floor(Math.random() * 1000),
      sentence: ""
    };
  }

  public handleSubmit() {
    const payload = this.newExample;

    this.submitMandarinExample(payload);

    this.newExample = {
      character: "",
      pinyin: "",
      english: "",
      examples: [],
      starred: false,
      date: new Date()
    };
  }

  // ===== Computed ===== //

  // ===== Lifecycle Hooks ===== //
  private created(): void {
    this.getMandarinList();
  }
}
</script>
