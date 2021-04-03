import { createLocalVue, shallowMount } from "@vue/test-utils";
import { mockUser } from "../../mocks/mock-user";
import Profile from "@/views/navigation/Profile.vue";
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

const mockStore = {
    user: {
        state: {
            accessToken: "Bearer et2085ofgu",
            avatarColor: "#eeeeee",
            isLoggedIn: true,
            loadingState: [],
            user: mockUser
        },
        actions
    },
    posts: {
        state: {},
        actions
    }
};

describe('Profile', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(Profile, {
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
        it('userInfo returns the correct info', () => {
            wrapper = mountFunction({}, store);
            expect(wrapper.vm.userInfo).toEqual(mockUser);
            wrapper.destroy();
        })
    })
});