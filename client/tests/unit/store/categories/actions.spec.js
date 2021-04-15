import { categoriesActions, categoriesState } from "@/store/modules/categories";
import Vue from "vue";
import Vuex from "vuex";
import { mockCategoriesList } from "../../mocks/mock-categories-list";
import { mockUser } from "../../mocks/mock-user";

Vue.use(Vuex);

let mockResp;
let mockError = false;

jest.mock("axios", () => ({
    get: () => {
        return new Promise((resolve) => {
            if (mockError) {
                throw Error();
            }
            resolve(mockResp);
        });
    },
    post: () => {
        return new Promise((resolve) => {
            if (mockError) {
                throw Error();
            }
            resolve(mockResp);
        });
    },
    patch: () => {
        return new Promise((resolve) => {
            if (mockError) {
                throw Error();
            }
            resolve(true);
        });
    },
    put: () => {
        return new Promise((resolve) => {
            if (mockError) {
                throw Error();
            }
            resolve(mockResp);
        });
    },
    delete: () => {
        return new Promise((resolve) => {
            if (mockError) {
                throw Error();
            }
            resolve(true);
        });
    }
}));

const testNonApiAction = (action, payload, state, expectedMutations, done) => {
    let count = 0;
    const commit = (type, payload) => {
        const mutation = expectedMutations[count];
        try {
            expect(type).toEqual(mutation.type);
            expect(payload).toEqual(mutation.payload);
        } catch (error) {
            done(error);
        }
        count++;
        if (count >= expectedMutations.length) {
            done();
        }
    };
    action({ commit, state }, payload);

    if (expectedMutations.length === 0) {
        expect(count).toEqual(0);
        done();
    }
};

describe("actions", () => {
    it("dispatches getCategories correctly", async() => {
        mockResp = { data: { categories: mockCategoriesList } };
        mockError = false;
        const commit = jest.fn();
        const dispatch = jest.fn();
        const rootState = mockUser;
        await categoriesActions.getCategories({ commit, dispatch, rootState });
        expect(commit).toHaveBeenCalledWith("addToLoadingState", "getting user categories...");
        expect(commit).toHaveBeenCalledWith("setCategoriesList", mockResp.data.categories);
        expect(commit).toHaveBeenCalledWith("removeFromLoadingState", "getting user categories...");
    });
});

