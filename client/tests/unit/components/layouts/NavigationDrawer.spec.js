import { createLocalVue, shallowMount } from "@vue/test-utils";
import NavigationDrawer from "@/components/layouts/NavigationDrawer.vue";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { mockUser } from "../../mocks/mock-user";
import moment from "moment";

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuex);

const elem = document.createElement("div");
if (document.body) {
    document.body.appendChild(elem);
};

document.body.setAttribute("data-app", true);

const actions = {
    logout: jest.fn()
};

const mockStore = {
    user: {
        state: {
            user: mockUser
        },
        actions,
        namespaced: true
    }
};

describe('NavigationDrawer', () => {
    let wrapper;
    const store = new Vuex.Store({
        modules: mockStore
    });
    const mountFunction = (options, store = mockStore) => {
        return shallowMount(NavigationDrawer, {
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
        it("handleLogout method performs the correct actions", async() => {
            wrapper = mountFunction({}, store);
            await wrapper.vm.handleLogout();
            expect(actions.logout).toHaveBeenCalled();
            wrapper.destroy();
        });
        it("handleChinaTime method performs the correct actions", async() => {
            wrapper = mountFunction({
                data() {
                    return {
                        clock: ""
                    }
                }
            }, store);
            const chinaTime = moment.utc().tz("Asia/Shanghai").format("MM/DD, h:mm:ss a");
            await wrapper.vm.handleChinaTime();
            expect(wrapper.vm.clock).toEqual(chinaTime);
            wrapper.destroy();
        });
        it("userInfo() computed prop returns the correct values", () => {
            wrapper = mountFunction({}, store);
            expect(wrapper.vm.userInfo).toEqual(mockUser);
            wrapper.destroy();
        });
        it("userInitials() computed prop returns the correct value", () => {
            wrapper = mountFunction({}, store);
            expect(wrapper.vm.userInitials).toEqual("TU");
            wrapper.destroy();
        })
    });
});