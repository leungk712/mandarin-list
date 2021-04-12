import { createLocalVue, shallowMount } from "@vue/test-utils";
import Memorize from "@/views/memorize/Memorize.vue";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { mockMandarinList } from "../../mocks/mock-mandarin-list";
import { mockCategoriesList } from "../../mocks/mock-categories-list";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

const elem = document.createElement("div");
if (document.body) {
    document.body.appendChild(elem);
};

document.body.setAttribute("data-app", true);

const actions = {};

const mockStore = {
    categories: {
        state: {
            categoriesList: mockCategoriesList
        },
        actions
    },
    posts: {
        state: {
            mandarinList: mockMandarinList
        },
        actions
    }
};

describe('Memorize', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(Memorize, {
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