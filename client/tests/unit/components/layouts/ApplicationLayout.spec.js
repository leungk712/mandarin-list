import { createLocalVue, shallowMount } from "@vue/test-utils";
import ApplicationLayout from "@/components/layouts/ApplicationLayout.vue";
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

describe('ApplicationLayout', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(ApplicationLayout, {
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
});