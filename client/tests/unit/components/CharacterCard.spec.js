import CharacterCard from "@/components/CharacterCard.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { mockCategories } from "../mocks/mock-categories-list";
import { mockMandarinList } from "../mocks/mock-mandarin-list";
import { mockUser } from "../mocks/mock-user";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";

Vue.use(Vuetify);

const localVue = createLocalVue();
const elem = document.createElement("div");
if (document.body) {
  document.body.appendChild(elem);
}
document.body.setAttribute("data-app", true);
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe("CharacterCard", () => {
  let wrapper;
  const actions = {
    clearSelectedMandarin: jest.fn(),
    getIndividualCharacter: jest.fn(),
    handleAddMandarinExample: jest.fn(),
    handleDeleteMandarinExample: jest.fn(),
    updateMandarinCharacter: jest.fn()
  };
  const store = new Vuex.Store({
    modules: {
      categories: {
        state: {
          categoriesList: mockCategories
        },
        actions
      },
      posts: {
        state: {
          loadingState: [],
          mandarinList: mockMandarinList,
          selectedMandarin: null,
          selectedMandarinExamples: []
        },
        actions,
        namespaced: true
      },
      user: {
        state: {
          user: mockUser
        },
        actions
      }
    }
  });
  const mountFunction = options => {
    return shallowMount(CharacterCard, {
      attachTo: elem,
      localVue,
      router,
      store,
      vuetify: new Vuetify(),
      ...options
    });
  };
  it("should match snapshot", () => {
    wrapper = mountFunction();
    expect(wrapper.vm.$el).toMatchSnapshot();
    wrapper.destroy();
  });
});
