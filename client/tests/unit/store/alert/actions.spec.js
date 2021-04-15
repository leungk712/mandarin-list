import { alertActions, alertState } from "@/store/modules/alert";
import Vue from "vue";
import Vuex from "vuex";

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
    it("clearAlert commits the correct mutation", done => {
        mockError = false;
        testNonApiAction(alertActions.clearAlert, undefined, alertState, [{
            type: "resetAlert"
        }], done);
    });
    it("errorStatus commits the correct mutations", async() => {
        mockError = "error message!";
        const commit = jest.fn();
        await alertActions.errorStatus({ commit }, mockError);
        expect(commit).toHaveBeenCalledWith("setMessage", mockError);
        expect(commit).toHaveBeenCalledWith("setType", "error");
        expect(commit).toHaveBeenCalledWith("displayAlert");
    });
    it("successStatus commits the correct mutations", async() => {
        mockError = false;
        let mockSuccess = "success message!";
        const commit = jest.fn();
        await alertActions.successStatus({ commit }, mockSuccess);
        expect(commit).toHaveBeenCalledWith("setMessage", mockSuccess);
        expect(commit).toHaveBeenCalledWith("setType", "success");
        expect(commit).toHaveBeenCalledWith("displayAlert");
    });
});

