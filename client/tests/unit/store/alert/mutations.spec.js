import { alertMutations } from "@/store/modules/alert";

const {
    displayAlert,
    setMessage,
    setType,
    resetAlert
} = alertMutations;

describe("alert.ts", () => {
    it("displayAlert", () => {
        const state = { display: false };
        displayAlert(state);
        expect(state.display).toEqual(true);
    });
    it("setMessage", () => {
        const state = { message: "" };
        setMessage(state, "this is an alert message!");
        expect(state.message).toEqual("this is an alert message!");
    });
    it("setType", () => {
        const state = { type: "" };
        setType(state, "error");
        expect(state.type).toEqual("error");
    });
    it("resetAlert", () => {
        const state = {
            display: true,
            message: "showing alert message",
            type: "error"
        };
        resetAlert(state);
        expect(state.display).toEqual(false);
        expect(state.message).toEqual("");
        expect(state.type).toEqual("");
    });
});
