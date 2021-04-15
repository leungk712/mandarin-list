import { createLocalVue, shallowMount } from "@vue/test-utils";
import Translate from "@/views/translate/Translate.vue";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

const elem = document.createElement("div");
if (document.body) {
    document.body.appendChild(elem);
};

document.body.setAttribute("data-app", true);

const actions = {};

const mockStore = {};

describe('Translate', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(Translate, {
           attachTo: elem,
           localVue,
           store,
           vuetify: new Vuetify(),
           ...options
        });
    };
    describe("template", () => {
        it("should match snapshot", () => {
            wrapper = mountFunction({}, store);
            expect(wrapper.vm.$el).toMatchSnapshot();
            wrapper.destroy();
        });
    });
    describe("script", () => {
        it("converted computed property returns the correct value", async() => {
            wrapper = mountFunction({
                data() {
                    return {
                        characters: "北京"
                    }
                }
            }, store);
            expect(wrapper.vm.converted).toBe("běi jīng");
            wrapper.destroy();
        });
    });
});