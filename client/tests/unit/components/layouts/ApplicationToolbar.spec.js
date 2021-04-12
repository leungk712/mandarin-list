import { createLocalVue, shallowMount } from "@vue/test-utils";
import ApplicationToolbar from "@/components/layouts/ApplicationToolbar.vue";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import router from "@/router";
import { mockUser } from "../../mocks/mock-user";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(router);

const elem = document.createElement("div");
if (document.body) {
    document.body.appendChild(elem);
};

document.body.setAttribute("data-app", true);

const route = [
    {
        path: "/",
        name: "Home",
        beforeEnter: jest.fn()
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        beforeEnter: jest.fn()
    },
    {
        path: "/login",
        name: "AppLogin",
        beforeEnter: jest.fn()
    }
];

const actions = {};

const mockStore = {
    user: {
        state: {
            isLoggedIn: true,
            user: mockUser
        },
        actions,
        namespaced: true
    }
};

describe('ApplicationToolbar', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(ApplicationToolbar, {
           attachTo: elem,
           localVue,
           store,
           route: router,
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
        it("handleReturnHome method performs the correct action", async () => {
            wrapper = mountFunction({}, store);
            await wrapper.vm.handleReturnHome();
            wrapper.destroy();
        });
        it("handleLogin method performs the correct action", async () => {
            wrapper = mountFunction({}, store);
            await wrapper.vm.handleLogin();
            wrapper.destroy();
        });
    });
});