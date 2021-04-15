import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { RootState } from "@/models";
import UserModule from "@/store/modules/user";

declare module '@vue/runtime-core' {
    interface State<RootState> {
      user: UserModule
    }
  
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  }