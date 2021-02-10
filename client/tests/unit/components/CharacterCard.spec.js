import CharacterCard from "@/components/CharacterCard.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
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
        updateMandarinCharacter: jest.fn()
    };
    const store = new Vuex.Store({
        modules: {
            posts: {
                state: {
                    loadingState: [],
                    mandarinList: [],
                    selectedMandarin: {}
                },
                actions,
                namespaced: true
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
    })
});